import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { CreateCompanyComponent } from '../../../../company/domain/components/create-company/create-company.component';
import { KanbanComponent } from '../kanban/kanban.component';
import { UserModeComponent } from '../user-mode/user-mode.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CompanyMaintenanceComponent } from '../../../../company/domain/components/company-maintenance/company-maintenance.component';
import { ModeService, ViewMode } from '../../../../../shared/services/mode.service';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    KanbanComponent,
    UserModeComponent,
    DashboardComponent,
    CompanyMaintenanceComponent
  ],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss'
})
export class PortalLayoutComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly modeService = inject(ModeService);
  private readonly destroy$ = new Subject<void>();

  // @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  drawerOpened = false;
  sidebarExpanded = false;
  currentMode: ViewMode = 'user';
  currentView: 'kanban' | 'dashboard' | 'company-maintenance' | 'user-mode' = 'kanban';

  ngOnInit(): void {
    this.modeService.mode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mode => {
        this.currentMode = mode;
        if (mode === 'company') {
          this.currentView = 'kanban';
        } else {
          this.currentView = 'user-mode';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  closeSidebar(): void {
    this.sidebarExpanded = false;
  }

  onSidebarItemClick(item: string): void {
    if (item === 'create-company') {
      this.openCreateCompanyDialog();
    } else if (item === 'leads' && this.currentMode === 'company') {
      this.currentView = 'kanban';
    } else if (item === 'dashboard' && this.currentMode === 'company') {
      this.currentView = 'dashboard';
    } else if (item === 'companies' && this.currentMode === 'company') {
      this.currentView = 'company-maintenance';
    }
    this.closeSidebar();
  }

  openCreateCompanyDialog(): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Empresa criada:', result);
        // Recarregar empresas - será feito automaticamente pelo header ao detectar mudanças
        // ou pode ser feito via serviço compartilhado se necessário
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.sidebarExpanded && !target.closest('.sidebar') && !target.closest('.menu-button')) {
      this.closeSidebar();
    }
  }
}

