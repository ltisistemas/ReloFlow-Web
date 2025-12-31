import { Component, Input, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Company, CompanyUser } from '../../interface/company.interface';
import { CompanyUserService } from '../../services/company-user.service';
import { AuthRepository } from '../../../../auth/infra/repositories/auth.repository';
import { UserService } from '../../../../user/domain/services/user.service';
import { SignUpRequest } from '../../../../auth/domain/interface/auth.interface';
import { AddCompanyUserComponent } from '../add-company-user/add-company-user.component';

export interface PendingCompanyUser {
  id: string;
  email: string;
  name: string;
  userId: string | null;
  isNewUser: boolean;
  userData?: SignUpRequest;
}

@Component({
  selector: 'app-company-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './company-users.component.html',
  styleUrl: './company-users.component.scss'
})
export class CompanyUsersComponent implements OnInit {
  @Input() company!: Company;

  private readonly companyUserService = inject(CompanyUserService);
  private readonly authRepository = inject(AuthRepository);
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  users: CompanyUser[] = [];
  pendingUsers: PendingCompanyUser[] = [];
  usersDataSource = new MatTableDataSource<(CompanyUser | PendingCompanyUser)>([]);
  displayedColumns: string[] = ['email', 'name', 'type', 'status', 'actions'];
  isLoading = false;
  isSaving = false;

  ngOnInit(): void {
    if (this.company) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    if (!this.company) return;

    this.isLoading = true;
    this.companyUserService.getUsersByCompany(this.company.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.users = response.data;
          this.updateUsersDataSource();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.showError('Erro ao carregar usuários da empresa');
        this.isLoading = false;
      }
    });
  }

  updateUsersDataSource(): void {
    this.usersDataSource.data = [...this.getAllUsers()];
    this.cdr.detectChanges();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddCompanyUserComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: PendingCompanyUser | undefined) => {
      if (result) {
        result.id = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.pendingUsers.push(result);
        this.updateUsersDataSource();
      }
    });
  }

  onRemovePendingUser(index: number): void {
    this.pendingUsers.splice(index, 1);
    this.updateUsersDataSource();
    this.showSuccess('Usuário pendente removido.');
  }

  onDeleteUser(userId: string): void {
    const companyUser = this.users.find(u => u.userId === userId);
    if (!companyUser) return;

    if (!confirm('Tem certeza que deseja remover este usuário da empresa?')) {
      return;
    }

    this.isSaving = true;
    this.companyUserService.deleteCompanyUser(companyUser.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess('Usuário removido com sucesso!');
          this.loadUsers();
        } else {
          this.showError(response.message || 'Erro ao remover usuário');
        }
        this.isSaving = false;
      },
      error: (error) => {
        let errorMessage = 'Erro ao remover usuário';
        if (error?.error?.message) {
          errorMessage = error.error.message;
        }
        this.showError(errorMessage);
        this.isSaving = false;
      }
    });
  }

  onSaveUsers(): void {
    if (!this.company || this.pendingUsers.length === 0) {
      return;
    }

    this.isSaving = true;

    const usersToRegister = this.pendingUsers.filter(u => u.isNewUser && u.userData);
    const usersToAssociate = this.pendingUsers.filter(u => !u.isNewUser && u.userId);

    const signupObservables = usersToRegister.map(user => {
      const signupData: SignUpRequest = user.userData!;
      return this.authRepository.signUp(signupData).pipe(
        map(response => ({
          email: user.email,
          userId: response.success && response.data ? response.data.id : null,
          success: response.success
        })),
        catchError(error => {
          if (error?.error?.message?.includes('já está em uso') ||
              error?.error?.message?.includes('already') ||
              error?.error?.errors?.some((e: any) => e.message.includes('Email'))) {
            return of({ email: user.email, userId: null, success: false });
          }
          return of({ email: user.email, userId: null, success: false });
        })
      );
    });

    forkJoin(signupObservables).subscribe({
      next: (results) => {
        const userIdMap = new Map<string, string | null>();
        const emailsToSearch: string[] = [];

        results.forEach(result => {
          if (result.userId) {
            userIdMap.set(result.email, result.userId);
          } else if (result.success === false) {
            emailsToSearch.push(result.email);
          }
        });

        if (emailsToSearch.length > 0) {
          const searchObservables = emailsToSearch.map(email =>
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
              this.processAndCreateCompanyUsers(userIdMap, usersToRegister, usersToAssociate);
            },
            error: (error) => {
              console.error('Erro ao buscar usuários existentes:', error);
              this.showError('Erro ao buscar usuários existentes');
              this.isSaving = false;
            }
          });
        } else {
          this.processAndCreateCompanyUsers(userIdMap, usersToRegister, usersToAssociate);
        }
      },
      error: (error) => {
        console.error('Erro ao registrar usuários:', error);
        this.showError('Erro ao registrar novos usuários');
        this.isSaving = false;
      }
    });
  }

  private processAndCreateCompanyUsers(
    userIdMap: Map<string, string | null>,
    usersToRegister: PendingCompanyUser[],
    usersToAssociate: PendingCompanyUser[]
  ): void {
    this.pendingUsers.forEach(user => {
      if (!user.userId && userIdMap.has(user.email)) {
        user.userId = userIdMap.get(user.email) || null;
      }
    });

    const allUserIdsToCreate: { userId: string }[] = [];

    usersToRegister.forEach(user => {
      if (user.userId) {
        allUserIdsToCreate.push({ userId: user.userId });
      }
    });

    usersToAssociate.forEach(user => {
      if (user.userId) {
        allUserIdsToCreate.push({ userId: user.userId });
      }
    });

    this.createCompanyUsers(allUserIdsToCreate);
  }

  private createCompanyUsers(usersToCreate: { userId: string }[]): void {
    if (!this.company || usersToCreate.length === 0) {
      this.isSaving = false;
      return;
    }

    const createObservables = usersToCreate.map(userData =>
      this.companyUserService.createCompanyUser({
        companyId: this.company!.id,
        userId: userData.userId
      }).pipe(
        catchError(error => {
          console.error(`Erro ao associar usuário ${userData.userId}:`, error);
          this.showError(`Erro ao associar usuário`);
          return of(null);
        })
      )
    );

    forkJoin(createObservables).subscribe({
      next: () => {
        this.showSuccess('Usuários associados com sucesso!');
        this.pendingUsers = [];
        this.loadUsers();
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Erro ao salvar usuários:', error);
        this.showError('Erro ao salvar usuários');
        this.isSaving = false;
      }
    });
  }

  getAllUsers(): (CompanyUser | PendingCompanyUser)[] {
    return [...this.users, ...this.pendingUsers];
  }

  getUserEmail(user: CompanyUser | PendingCompanyUser): string {
    return (user as PendingCompanyUser).email || (user as CompanyUser).userId || 'N/A';
  }

  getUserName(user: CompanyUser | PendingCompanyUser): string {
    return (user as PendingCompanyUser).name || 'N/A';
  }

  getUserType(user: CompanyUser | PendingCompanyUser): string {
    return (user as PendingCompanyUser).isNewUser ? 'Novo Usuário' : (user.userId ? 'Usuário Existente' : 'Sem Usuário');
  }

  isPending(user: CompanyUser | PendingCompanyUser): boolean {
    return 'email' in user && 'isNewUser' in user;
  }

  getUserId(user: CompanyUser | PendingCompanyUser): string {
    if ('userId' in user && user.userId) {
      return user.userId;
    }
    return '';
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}

