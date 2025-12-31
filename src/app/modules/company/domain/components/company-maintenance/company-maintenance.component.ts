import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { CompanyService } from '../../services/company.service';
import { Company, UpdateCompanyRequest } from '../../interface/company.interface';
import { DocumentTemplatesComponent } from '../document-templates/document-templates.component';
import { CompanyUsersComponent } from '../company-users/company-users.component';
import { ModeService } from '../../../../../shared/services/mode.service';

@Component({
  selector: 'app-company-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    DocumentTemplatesComponent,
    CompanyUsersComponent
  ],
  templateUrl: './company-maintenance.component.html',
  styleUrl: './company-maintenance.component.scss'
})
export class CompanyMaintenanceComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);
  private readonly modeService = inject(ModeService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroy$ = new Subject<void>();

  companyForm: FormGroup;
  company: Company | null = null;
  isLoading = false;
  isSaving = false;
  companyId: string | null = null;

  constructor() {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.modeService.selectedCompany$
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company | null) => {
        if (company) {
          this.companyId = company.id;
          this.loadCompany();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCompany(): void {
    if (!this.companyId) {
      return;
    }

    this.isLoading = true;
    this.companyService.getCompanyById(this.companyId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.company = response.data;
          this.populateForm();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar empresa:', error);
        this.showError('Erro ao carregar dados da empresa');
        this.isLoading = false;
      }
    });
  }

  populateForm(): void {
    if (this.company) {
      this.companyForm.patchValue({
        name: this.company.name,
        description: this.company.description
      });
    }
  }

  onSaveCompany(): void {
    if (this.companyForm.valid && this.companyId) {
      this.isSaving = true;
      const formValue = this.companyForm.value;

      const updateData: UpdateCompanyRequest = {
        name: formValue.name,
        description: formValue.description
      };

      this.companyService.updateCompany(this.companyId, updateData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Empresa atualizada com sucesso!');
            if (response.data) {
              this.company = response.data;
            }
          } else {
            this.showError(response.message || 'Erro ao atualizar empresa');
          }
          this.isSaving = false;
        },
        error: (error) => {
          let errorMessage = 'Erro ao atualizar empresa';
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
      this.markFormGroupTouched(this.companyForm);
    }
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

  get name() {
    return this.companyForm.get('name');
  }

  get description() {
    return this.companyForm.get('description');
  }
}

