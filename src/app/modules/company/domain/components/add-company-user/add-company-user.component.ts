import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../../user/domain/services/user.service';
import { User } from '../../../../user/domain/interface/user.interface';
import { PendingCompanyUser } from '../company-users/company-users.component';

@Component({
  selector: 'app-add-company-user',
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
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './add-company-user.component.html',
  styleUrl: './add-company-user.component.scss'
})
export class AddCompanyUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(MatDialogRef<AddCompanyUserComponent>);
  private readonly snackBar = inject(MatSnackBar);

  searchForm: FormGroup;
  signupForm: FormGroup;
  foundUser: User | null = null;
  isSearching = false;
  userFound = false;
  showSignupForm = false;

  constructor() {
    this.searchForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSearchUser(): void {
    if (this.searchForm.valid) {
      this.isSearching = true;
      const email = this.searchForm.get('email')?.value;

      this.userService.getUserByEmail(email).subscribe({
        next: (user: User | null) => {
          this.isSearching = false;
          if (user) {
            this.foundUser = user;
            this.userFound = true;
            this.showSignupForm = false;
          } else {
            this.userFound = false;
            this.showSignupForm = true;
            this.signupForm.patchValue({
              email: email,
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: ''
            });
          }
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          this.showError('Erro ao buscar usuário');
          this.isSearching = false;
          this.userFound = false;
          this.showSignupForm = true;
          this.signupForm.patchValue({
            email: this.searchForm.get('email')?.value,
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.searchForm);
    }
  }

  onAddUser(): void {
    if (this.userFound && this.foundUser) {
      const pendingUser: PendingCompanyUser = {
        id: '',
        email: this.foundUser.email,
        userId: this.foundUser.id,
        name: `${this.foundUser.firstName} ${this.foundUser.lastName}`,
        isNewUser: false,
        userData: undefined
      };
      this.dialogRef.close(pendingUser);
    } else if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const pendingUser: PendingCompanyUser = {
        id: '',
        email: formValue.email,
        userId: null,
        name: `${formValue.firstName} ${formValue.lastName}`,
        isNewUser: true,
        userData: {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          password: formValue.password
        }
      };
      this.dialogRef.close(pendingUser);
    } else {
      this.markFormGroupTouched(this.signupForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
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

  get email() {
    return this.searchForm.get('email');
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get signupFormInvalid() {
    return this.signupForm.invalid || this.signupForm.errors?.['passwordMismatch'];
  }
}


