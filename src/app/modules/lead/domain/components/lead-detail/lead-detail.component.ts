import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LeadService } from '../../services/lead.service';
import { LeadMemberService } from '../../services/lead-member.service';
import { AuthRepository } from '../../../../auth/infra/repositories/auth.repository';
import { UserService } from '../../../../user/domain/services/user.service';
import { SignUpRequest } from '../../../../auth/domain/interface/auth.interface';
import {
  Lead,
  UpdateLeadRequest,
  CreateLeadMemberRequest,
  UpdateLeadMemberRequest,
  LeadMember,
  PendingMember
} from '../../interface/lead.interface';
import { AddMemberComponent } from '../add-member/add-member.component';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './lead-detail.component.html',
  styleUrl: './lead-detail.component.scss'
})
export class LeadDetailComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly leadService = inject(LeadService);
  private readonly leadMemberService = inject(LeadMemberService);
  private readonly authRepository = inject(AuthRepository);
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<LeadDetailComponent>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly data = inject(MAT_DIALOG_DATA);

  leadForm: FormGroup;
  lead: Lead | null = null;
  members: LeadMember[] = [];
  pendingMembers: PendingMember[] = [];
  membersDataSource = new MatTableDataSource<(LeadMember | PendingMember)>([]);
  displayedColumns: string[] = ['email', 'name', 'type', 'status', 'actions'];
  isLoading = false;
  isLoadingMembers = false;
  isSaving = false;

  constructor() {
    this.leadForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: [null],
      currency: ['EUR', [Validators.required]],
      zipCode: [''],
      streetAddress: [''],
      streetAddressNumber: [''],
      streetAddressComplement: [''],
      city: [''],
      state: [''],
      country: ['']
    });
  }

  ngOnInit(): void {
    // Sempre carregar dados completos via API, mesmo quando lead é passado
    if (this.data?.leadId) {
      this.loadLead(this.data.leadId);
    } else if (this.data?.lead?.id) {
      // Usar o ID do lead passado para buscar dados completos
      this.loadLead(this.data.lead.id);
    }
  }

  loadLead(leadId: string): void {
    this.isLoading = true;
    this.leadService.getLeadById(leadId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.lead = response.data;
          this.populateForm();
          this.loadMembers();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar lead:', error);
        this.showError('Erro ao carregar dados do lead');
        this.isLoading = false;
      }
    });
  }

  populateForm(): void {
    if (this.lead) {
      this.leadForm.patchValue({
        name: this.lead.name,
        description: this.lead.description,
        amount: this.lead.amount,
        currency: this.lead.currency || 'EUR',
        zipCode: this.lead.zipCode || '',
        streetAddress: this.lead.streetAddress || '',
        streetAddressNumber: this.lead.streetAddressNumber || '',
        streetAddressComplement: this.lead.streetAddressComplement || '',
        city: this.lead.city || '',
        state: this.lead.state || '',
        country: this.lead.country || ''
      });
    }
  }

  loadMembers(): void {
    if (!this.lead) return;

    this.isLoadingMembers = true;
    this.leadMemberService.getMembersByLead(this.lead.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.members = response.data;
          this.updateMembersDataSource();
        }
        this.isLoadingMembers = false;
      },
      error: (error) => {
        console.error('Erro ao carregar membros:', error);
        this.showError('Erro ao carregar membros');
        this.isLoadingMembers = false;
      }
    });
  }

  private updateMembersDataSource(): void {
    // Criar novo array para forçar detecção de mudanças no MatTableDataSource
    this.membersDataSource.data = [...this.getAllMembers()];
    // Forçar detecção de mudanças para garantir que a tabela seja atualizada
    this.cdr.detectChanges();
  }

  onSaveLead(): void {
    if (this.leadForm.valid && this.lead) {
      this.isSaving = true;
      const formValue = this.leadForm.value;

      const updateData: UpdateLeadRequest = {
        name: formValue.name,
        description: formValue.description,
        amount: formValue.amount || null,
        currency: formValue.currency || 'EUR',
        zipCode: formValue.zipCode || null,
        streetAddress: formValue.streetAddress || null,
        streetAddressNumber: formValue.streetAddressNumber || null,
        streetAddressComplement: formValue.streetAddressComplement || null,
        city: formValue.city || null,
        state: formValue.state || null,
        country: formValue.country || null,
        companyId: this.lead.companyId,
        companyPositionId: this.lead.companyPositionId
      };

      this.leadService.updateLead(this.lead.id, updateData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Lead atualizado com sucesso!');
            if (response.data) {
              this.lead = response.data;
            }
          } else {
            this.showError(response.message || 'Erro ao atualizar lead');
          }
          this.isSaving = false;
        },
        error: (error) => {
          let errorMessage = 'Erro ao atualizar lead';
          if (error?.error?.message) {
            errorMessage = error.error.message;
          } else if (error?.error?.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors.map((e: any) => e.message).join(', ');
          }
          this.showError(errorMessage);
          this.isSaving = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.leadForm);
    }
  }

  onAddMember(): void {
    if (!this.lead) return;

    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((pendingMember: PendingMember | undefined) => {
      if (pendingMember) {
        this.pendingMembers.push(pendingMember);
        this.updateMembersDataSource();
      }
    });
  }

  onRemovePendingMember(index: number): void {
    const allMembers = this.getAllMembers();
    const memberToRemove = allMembers[index];
    
    if (this.isPending(memberToRemove)) {
      const pendingIndex = this.pendingMembers.findIndex(m => 
        m.email === (memberToRemove as PendingMember).email
      );
      if (pendingIndex >= 0) {
        this.pendingMembers.splice(pendingIndex, 1);
        this.updateMembersDataSource();
      }
    }
  }

  onSaveMembers(): void {
    if (!this.lead || this.pendingMembers.length === 0) {
      return;
    }

    this.isSaving = true;

    // Separar membros que precisam registro
    const membersToRegister = this.pendingMembers.filter(m => !m.userId && m.userData);
    const membersWithUserId = this.pendingMembers.filter(m => m.userId);

    if (membersToRegister.length === 0) {
      // Todos já têm userId, apenas criar LeadMembers
      this.createLeadMembers(membersWithUserId.map(m => m.userId!));
      return;
    }

    // Registrar novos usuários usando forkJoin
    const signupObservables = membersToRegister.map(member => {
      const signupData: SignUpRequest = member.userData!;
      return this.authRepository.signUp(signupData).pipe(
        map(response => ({
          email: member.email,
          userId: response.success && response.data ? response.data.id : null,
          success: response.success
        })),
        catchError(error => {
          // Se erro for "email já existe", o usuário já está cadastrado
          // Neste caso, vamos buscar o usuário por email
          if (error?.error?.message?.includes('já está em uso') || 
              error?.error?.message?.includes('already') ||
              error?.error?.message?.includes('Email')) {
            // Retornar null para indicar que precisa buscar
            return of({ email: member.email, userId: null, success: false });
          }
          return of({ email: member.email, userId: null, success: false });
        })
      );
    });

    forkJoin(signupObservables).subscribe({
      next: (results) => {
        // Processar resultados e buscar usuários que falharam (provavelmente já existem)
        const userIdMap = new Map<string, string | null>();
        const emailsToSearch: string[] = [];

        results.forEach(result => {
          if (result.userId) {
            userIdMap.set(result.email, result.userId);
          } else if (result.success === false) {
            emailsToSearch.push(result.email);
          }
        });

        // Se houver emails que falharam, buscar usuários existentes
        if (emailsToSearch.length > 0) {
          this.searchExistingUsers(emailsToSearch, userIdMap, membersWithUserId);
        } else {
          // Atualizar pendingMembers com userIds obtidos
          this.pendingMembers.forEach(member => {
            if (!member.userId && userIdMap.has(member.email)) {
              member.userId = userIdMap.get(member.email) || null;
            }
          });

          // Criar todos os LeadMembers
          const allUserIds = this.pendingMembers
            .filter(m => m.userId)
            .map(m => m.userId!);

          this.createLeadMembers(allUserIds);
        }
      },
      error: (error) => {
        console.error('Erro ao registrar usuários:', error);
        this.showError('Erro ao registrar novos usuários');
        this.isSaving = false;
      }
    });
  }

  private searchExistingUsers(emails: string[], userIdMap: Map<string, string | null>, membersWithUserId: PendingMember[]): void {
    const searchObservables = emails.map(email => 
      this.userService.getUserByEmail(email).pipe(
        map(user => ({ email, userId: user?.id || null })),
        catchError(() => of({ email, userId: null }))
      )
    );

    forkJoin(searchObservables).subscribe({
      next: (searchResults) => {
        searchResults.forEach(result => {
          if (result.userId) {
            userIdMap.set(result.email, result.userId);
          }
        });

        // Atualizar pendingMembers com userIds obtidos
        this.pendingMembers.forEach(member => {
          if (!member.userId && userIdMap.has(member.email)) {
            member.userId = userIdMap.get(member.email) || null;
          }
        });

        // Criar todos os LeadMembers
        const allUserIds = this.pendingMembers
          .filter(m => m.userId)
          .map(m => m.userId!);

        this.createLeadMembers(allUserIds);
      },
      error: (error) => {
        console.error('Erro ao buscar usuários existentes:', error);
        this.showError('Erro ao buscar usuários existentes');
        this.isSaving = false;
      }
    });
  }

  private createLeadMembers(userIds: string[]): void {
    if (!this.lead || userIds.length === 0) {
      this.isSaving = false;
      return;
    }

    const createObservables = userIds.map(userId => 
      this.leadMemberService.createMember({
        leadId: this.lead!.id,
        userId: userId,
        name: null
      })
    );

    forkJoin(createObservables).subscribe({
      next: (responses) => {
        const allSuccess = responses.every(r => r.success);
        if (allSuccess) {
          this.showSuccess(`${userIds.length} membro(s) adicionado(s) com sucesso!`);
          this.pendingMembers = [];
          this.loadMembers();
        } else {
          this.showError('Alguns membros não puderam ser adicionados');
          this.loadMembers();
        }
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Erro ao criar membros:', error);
        this.showError('Erro ao criar membros do lead');
        this.isSaving = false;
      }
    });
  }

  onDeleteMember(memberId: string): void {
    if (!confirm('Tem certeza que deseja excluir este membro?')) {
      return;
    }

    this.isSaving = true;
    this.leadMemberService.deleteMember(memberId).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess('Membro excluído com sucesso!');
          this.loadMembers();
        } else {
          this.showError(response.message || 'Erro ao excluir membro');
        }
        this.isSaving = false;
      },
      error: (error) => {
        let errorMessage = 'Erro ao excluir membro';
        if (error?.error?.message) {
          errorMessage = error.error.message;
        }
        this.showError(errorMessage);
        this.isSaving = false;
      }
    });
  }

  getMemberType(member: LeadMember | PendingMember): string {
    // Para PendingMember
    if ('email' in member) {
      return (member as PendingMember).isExistingUser ? 'Usuário Existente' : 'Novo Usuário';
    }
    // Para LeadMember
    if ('leadId' in member) {
      return (member as LeadMember).userId ? 'Usuário Associado' : 'Membro sem Usuário';
    }
    return 'N/A';
  }

  getMemberEmail(member: LeadMember | PendingMember): string {
    // Para PendingMember, retornar o email
    if ('email' in member && member.email) {
      return member.email;
    }
    // Para LeadMember, mostrar userId ou indicador
    if ('leadId' in member) {
      return member.userId ? `Usuário ID: ${member.userId.substring(0, 8)}...` : 'Sem usuário';
    }
    return '-';
  }

  getMemberName(member: LeadMember | PendingMember): string {
    if ('name' in member && member.name) {
      return member.name;
    }
    return '-';
  }

  isPending(member: LeadMember | PendingMember): boolean {
    // PendingMember tem 'email' e 'isExistingUser', LeadMember tem 'leadId'
    return 'email' in member && 'isExistingUser' in member;
  }

  getAllMembers(): (LeadMember | PendingMember)[] {
    return [...this.members, ...this.pendingMembers];
  }

  getMemberId(member: LeadMember | PendingMember): string {
    if ('id' in member) {
      return (member as LeadMember).id;
    }
    return '';
  }

  onClose(): void {
    this.dialogRef.close(this.lead);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  get name() {
    return this.leadForm.get('name');
  }

  get description() {
    return this.leadForm.get('description');
  }
}

