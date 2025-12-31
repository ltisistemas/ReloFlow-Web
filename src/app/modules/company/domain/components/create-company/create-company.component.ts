import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../services/company.service';
import { CreateCompanyRequest } from '../../interface/company.interface';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);
  private readonly dialogRef = inject(MatDialogRef<CreateCompanyComponent>);
  private readonly snackBar = inject(MatSnackBar);

  companyForm: FormGroup;
  isLoading = false;

  constructor() {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isLoading = true;
      const companyData: CreateCompanyRequest = this.companyForm.value;

      this.companyService.createCompany(companyData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Empresa criada com sucesso!');
            this.dialogRef.close(response.data);
          } else {
            this.showError(response.message || 'Erro ao criar empresa');
          }
          this.isLoading = false;
        },
        error: (error) => {
          let errorMessage = 'Erro ao criar empresa';
          
          if (error?.error?.message) {
            errorMessage = error.error.message;
          } else if (error?.error?.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors.map((e: any) => e.message).join(', ');
          }
          
          this.showError(errorMessage);
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.companyForm.controls).forEach(key => {
      const control = this.companyForm.get(key);
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
    return this.companyForm.get('name');
  }

  get description() {
    return this.companyForm.get('description');
  }
}

