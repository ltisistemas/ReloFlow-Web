import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import { Company, CompanyPosition, DocumentTemplate, CreateDocumentTemplateRequest, UpdateDocumentTemplateRequest } from '../../interface/company.interface';
import { DocumentTemplateService } from '../../services/document-template.service';

@Component({
  selector: 'app-document-templates',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './document-templates.component.html',
  styleUrl: './document-templates.component.scss'
})
export class DocumentTemplatesComponent implements OnInit, OnDestroy {
  @Input() company!: Company;

  private readonly fb = inject(FormBuilder);
  private readonly documentTemplateService = inject(DocumentTemplateService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroy$ = new Subject<void>();

  positions: CompanyPosition[] = [];
  selectedPosition: CompanyPosition | null = null;
  templates: DocumentTemplate[] = [];
  templatesDataSource = new MatTableDataSource<DocumentTemplate>([]);
  displayedColumns: string[] = ['name', 'documentType', 'targetType', 'isRequired', 'actions'];
  isLoading = false;
  isSaving = false;
  showAddForm = false;
  editingTemplate: DocumentTemplate | null = null;

  templateForm: FormGroup;
  documentTypes = ['PASSPORT', 'VISA', 'ID', 'CONTRACT', 'OTHER'];
  targetTypes = [
    { value: 0, label: 'Lead' },
    { value: 1, label: 'Membro do Lead' }
  ];

  constructor() {
    this.templateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      documentType: ['PASSPORT', [Validators.required]],
      isRequired: [false],
      targetType: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.company && this.company.positions) {
      this.positions = [...this.company.positions];
      if (this.positions.length > 0) {
        this.selectedPosition = this.positions[0];
        this.loadTemplates();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPositionChange(): void {
    if (this.selectedPosition) {
      this.loadTemplates();
    }
  }

  loadTemplates(): void {
    if (!this.selectedPosition) {
      return;
    }

    this.isLoading = true;
    this.documentTemplateService.getTemplatesByPosition(this.selectedPosition.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.templates = response.data;
          this.templatesDataSource.data = this.templates;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar templates:', error);
        this.showError('Erro ao carregar templates de documentos');
        this.isLoading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingTemplate = null;
    this.templateForm.reset({
      name: '',
      documentType: 'PASSPORT',
      isRequired: false,
      targetType: 0
    });
    this.showAddForm = true;
  }

  openEditForm(template: DocumentTemplate): void {
    this.editingTemplate = template;
    this.templateForm.patchValue({
      name: template.name,
      documentType: template.documentType,
      isRequired: template.isRequired,
      targetType: template.targetType
    });
    this.showAddForm = true;
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.editingTemplate = null;
    this.templateForm.reset();
  }

  onSaveTemplate(): void {
    if (this.templateForm.valid && this.selectedPosition) {
      this.isSaving = true;
      const formValue = this.templateForm.value;

      if (this.editingTemplate) {
        // Update
        const updateData: UpdateDocumentTemplateRequest = {
          name: formValue.name,
          documentType: formValue.documentType,
          isRequired: formValue.isRequired,
          targetType: formValue.targetType
        };

        this.documentTemplateService.updateTemplate(this.editingTemplate.id, updateData).subscribe({
          next: (response) => {
            if (response.success) {
              this.showSuccess('Template atualizado com sucesso!');
              this.loadTemplates();
              this.cancelForm();
            } else {
              this.showError(response.message || 'Erro ao atualizar template');
            }
            this.isSaving = false;
          },
          error: (error) => {
            this.showError('Erro ao atualizar template');
            this.isSaving = false;
          }
        });
      } else {
        // Create
        const createData: CreateDocumentTemplateRequest = {
          companyPositionId: this.selectedPosition.id,
          name: formValue.name,
          documentType: formValue.documentType,
          isRequired: formValue.isRequired,
          targetType: formValue.targetType
        };

        this.documentTemplateService.createTemplate(createData).subscribe({
          next: (response) => {
            if (response.success) {
              this.showSuccess('Template criado com sucesso!');
              this.loadTemplates();
              this.cancelForm();
            } else {
              this.showError(response.message || 'Erro ao criar template');
            }
            this.isSaving = false;
          },
          error: (error) => {
            this.showError('Erro ao criar template');
            this.isSaving = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.templateForm);
    }
  }

  onDeleteTemplate(template: DocumentTemplate): void {
    if (!confirm(`Tem certeza que deseja excluir o template "${template.name}"?`)) {
      return;
    }

    this.isSaving = true;
    this.documentTemplateService.deleteTemplate(template.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess('Template excluído com sucesso!');
          this.loadTemplates();
        } else {
          this.showError(response.message || 'Erro ao excluir template');
        }
        this.isSaving = false;
      },
      error: (error) => {
        this.showError('Erro ao excluir template');
        this.isSaving = false;
      }
    });
  }

  getTargetTypeLabel(targetType: number): string {
    return targetType === 0 ? 'Lead' : 'Membro do Lead';
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
}

