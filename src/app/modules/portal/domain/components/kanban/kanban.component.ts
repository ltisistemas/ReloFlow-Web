import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ModeService } from '../../../../../shared/services/mode.service';
import { CompanyService } from '../../../../company/domain/services/company.service';
import { LeadService } from '../../../../lead/domain/services/lead.service';
import { Company, CompanyPosition } from '../../../../company/domain/interface/company.interface';
import { Lead } from '../../../../lead/domain/interface/lead.interface';
import { CreateLeadComponent } from '../../../../lead/domain/components/create-lead/create-lead.component';
import { LeadDetailComponent } from '../../../../lead/domain/components/lead-detail/lead-detail.component';

interface KanbanColumn {
  position: CompanyPosition;
  leads: Lead[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit, OnDestroy {
  private readonly modeService = inject(ModeService);
  private readonly companyService = inject(CompanyService);
  private readonly leadService = inject(LeadService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();

  columns: KanbanColumn[] = [];
  isLoading = false;
  selectedCompany: Company | null = null;
  isDragging = false;

  ngOnInit(): void {
    this.modeService.selectedCompany$
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company | null) => {
        this.selectedCompany = company;
        if (company) {
          this.loadKanbanData(company);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Ordem definida das posições
  private readonly positionOrder = [
    'Captação de lead',
    'Primeiro Pagamento',
    'Envio de documentos',
    'Validação de documentos',
    'Seleção do imóvel',
    'Pagamento do imóvel',
    'Assinatura do contrato',
    'Preparação do imóvel',
    'Serviços adicionais',
    'Entrega do imóvel',
    'Pendências',
    'Cancelados'
  ];

  loadKanbanData(company: Company): void {
    this.isLoading = true;
    
    // Ordenar posições conforme a sequência definida
    const sortedPositions = [...company.positions].sort((a, b) => {
      const indexA = this.positionOrder.indexOf(a.name);
      const indexB = this.positionOrder.indexOf(b.name);
      
      // Se não encontrar na lista, coloca no final
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });
    
    // Criar colunas baseadas nas posições ordenadas
    this.columns = sortedPositions.map((position: CompanyPosition) => ({
      position,
      leads: []
    }));

    // Carregar leads da empresa
    this.leadService.getLeadsByCompany(company.id).subscribe({
      next: (response: { success: boolean; data?: Lead[] }) => {
        if (response.success && response.data) {
          // Distribuir leads nas colunas correspondentes
          response.data.forEach((lead: Lead) => {
            const column = this.columns.find(col => col.position.id === lead.companyPositionId);
            if (column) {
              column.leads.push(lead);
            }
          });
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar leads:', error);
        this.showError('Erro ao carregar leads');
        this.isLoading = false;
      }
    });
  }

  isCaptacaoLeadColumn(positionName: string): boolean {
    return positionName === 'Captação de lead';
  }

  openCreateLeadDialog(position: CompanyPosition): void {
    if (!this.selectedCompany) {
      return;
    }

    const dialogRef = this.dialog.open(CreateLeadComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true
    });

    const componentInstance = dialogRef.componentInstance;
    componentInstance.setCompanyAndPosition(this.selectedCompany, position);

    dialogRef.afterClosed().subscribe((result: Lead | undefined) => {
      if (result) {
        // Recarregar dados do Kanban
        if (this.selectedCompany) {
          this.loadKanbanData(this.selectedCompany);
        }
      }
    });
  }

  onDrop(event: CdkDragDrop<Lead[]>): void {
    this.isDragging = false;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const previousColumn = this.columns.find(col => col.leads === event.previousContainer.data);
      const targetColumn = this.columns.find(col => col.leads === event.container.data);
      const lead = event.previousContainer.data[event.previousIndex];

      if (!previousColumn || !targetColumn || !lead) {
        return;
      }

      // Validar movimento
      if (!this.canMoveToColumn(previousColumn.position.name, targetColumn.position.name)) {
        this.showError('Movimento não permitido. Apenas colunas adjacentes podem ser acessadas, exceto Pendências e Cancelados.');
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (targetColumn.position.id) {
        this.updateLeadPosition(lead.id, targetColumn.position.id);
      }
    }
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  canMoveToColumn(currentPositionName: string, targetPositionName: string): boolean {
    // Pendências e Cancelados podem receber de qualquer coluna
    if (targetPositionName === 'Pendências' || targetPositionName === 'Cancelados') {
      return true;
    }

    const currentIndex = this.getPositionIndex(currentPositionName);
    const targetIndex = this.getPositionIndex(targetPositionName);

    // Se não encontrar índices, não permite
    if (currentIndex === -1 || targetIndex === -1) {
      return false;
    }

    // Permite apenas movimento para coluna adjacente (anterior ou próxima)
    const difference = Math.abs(targetIndex - currentIndex);
    return difference === 1;
  }

  getPositionIndex(positionName: string): number {
    return this.positionOrder.indexOf(positionName);
  }

  openLeadDetailDialog(lead: Lead): void {
    // Prevenir abertura durante drag
    if (this.isDragging) {
      return;
    }

    const dialogRef = this.dialog.open(LeadDetailComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      disableClose: false,
      panelClass: 'full-screen-dialog',
      data: { lead }
    });

    dialogRef.afterClosed().subscribe((updatedLead: Lead | undefined) => {
      if (updatedLead && this.selectedCompany) {
        // Recarregar dados do Kanban se o lead foi atualizado
        this.loadKanbanData(this.selectedCompany);
      }
    });
  }

  updateLeadPosition(leadId: string, positionId: string): void {
    this.leadService.updateLeadPosition(leadId, { companyPositionId: positionId }).subscribe({
      next: (response: { success: boolean; data: Lead }) => {
        if (response.success) {
          // Atualização bem-sucedida
        }
      },
      error: (error: any) => {
        console.error('Erro ao atualizar posição do lead:', error);
        this.showError('Erro ao mover lead');
        // Recarregar dados em caso de erro
        if (this.selectedCompany) {
          this.loadKanbanData(this.selectedCompany);
        }
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getColumnIds(): string[] {
    return this.columns.map(col => `column-${col.position.id}`);
  }

  getConnectedLists(): string[] {
    return this.getColumnIds();
  }
}

