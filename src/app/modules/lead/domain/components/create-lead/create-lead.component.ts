import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LeadService } from '../../services/lead.service';
import { CreateLeadRequest } from '../../interface/lead.interface';
import { Company, CompanyPosition } from '../../../../company/domain/interface/company.interface';

@Component({
  selector: 'app-create-lead',
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
  templateUrl: './create-lead.component.html',
  styleUrl: './create-lead.component.scss'
})
export class CreateLeadComponent {
  private readonly fb = inject(FormBuilder);
  private readonly leadService = inject(LeadService);
  private readonly dialogRef = inject(MatDialogRef<CreateLeadComponent>);
  private readonly snackBar = inject(MatSnackBar);

  leadForm: FormGroup;
  isLoading = false;
  company: Company | null = null;
  position: CompanyPosition | null = null;

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

  setCompanyAndPosition(company: Company, position: CompanyPosition): void {
    this.company = company;
    this.position = position;
  }

  onSubmit(): void {
    if (this.leadForm.valid && this.company && this.position) {
      this.isLoading = true;
      const formValue = this.leadForm.value;
      
      const leadData: CreateLeadRequest = {
        companyId: this.company.id,
        companyPositionId: this.position.id,
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
        country: formValue.country || null
      };

      this.leadService.createLead(leadData).subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Lead criado com sucesso!');
            this.dialogRef.close(response.data);
          } else {
            this.showError(response.message || 'Erro ao criar lead');
          }
          this.isLoading = false;
        },
        error: (error) => {
          let errorMessage = 'Erro ao criar lead';
          
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
    Object.keys(this.leadForm.controls).forEach(key => {
      const control = this.leadForm.get(key);
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

