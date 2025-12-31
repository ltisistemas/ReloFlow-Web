import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { CreateCompanyComponent } from './create-company.component';
import { CompanyService } from '../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CreateCompanyComponent', () => {
  let component: CreateCompanyComponent;
  let fixture: ComponentFixture<CreateCompanyComponent>;
  let companyService: jasmine.SpyObj<CompanyService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreateCompanyComponent>>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const companyServiceSpy = jasmine.createSpyObj('CompanyService', ['createCompany']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [CreateCompanyComponent, NoopAnimationsModule],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateCompanyComponent>>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form when valid', fakeAsync(() => {
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        userId: '1',
        name: 'Test',
        description: 'Test',
        financialCode: 'TEST',
        users: [],
        created: '2024-01-01',
        updated: '2024-01-01',
        deleted: null,
        positions: []
      }
    };
    companyService.createCompany.and.returnValue(of(mockResponse));

    component.companyForm.patchValue({
      name: 'Test Company',
      description: 'Test Description'
    });

    component.onSubmit();
    tick(1000); // Aguardar timers do snackBar

    expect(companyService.createCompany).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalledWith(mockResponse.data);
    flush(); // Limpar todos os timers pendentes
  }));

  it('should not submit when form is invalid', () => {
    component.onSubmit();
    expect(companyService.createCompany).not.toHaveBeenCalled();
  });
});

