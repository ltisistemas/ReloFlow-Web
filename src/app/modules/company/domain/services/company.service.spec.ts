import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompanyService } from './company.service';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { Company, CreateCompanyRequest, UpdateCompanyRequest } from '../interface/company.interface';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: jasmine.SpyObj<CompanyRepository>;

  const mockCompany: Company = {
    id: '1',
    userId: '1',
    name: 'Test Company',
    description: 'Test Description',
    financialCode: 'TEST001',
    users: [],
    created: '2024-01-01',
    updated: '2024-01-01',
    deleted: null,
    positions: []
  };

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('CompanyRepository', [
      'getAllCompanies',
      'getCompanyById',
      'createCompany',
      'updateCompany'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CompanyService,
        { provide: CompanyRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(CompanyService);
    repository = TestBed.inject(CompanyRepository) as jasmine.SpyObj<CompanyRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all companies', (done) => {
    const mockResponse = { success: true, data: [mockCompany] };
    repository.getAllCompanies.and.returnValue(of(mockResponse));

    service.getAllCompanies().subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.length).toBe(1);
        done();
      }
    });
  });

  it('should get company by id', (done) => {
    const mockResponse = { success: true, data: mockCompany };
    repository.getCompanyById.and.returnValue(of(mockResponse));

    service.getCompanyById('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.id).toBe('1');
        done();
      }
    });
  });

  it('should create company', (done) => {
    const createData: CreateCompanyRequest = {
      name: 'New Company',
      description: 'New Description'
    };
    const mockResponse = { success: true, data: mockCompany };
    repository.createCompany.and.returnValue(of(mockResponse));

    service.createCompany(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(repository.createCompany).toHaveBeenCalledWith(createData);
        done();
      }
    });
  });

  it('should update company', (done) => {
    const updateData: UpdateCompanyRequest = {
      name: 'Updated Company',
      description: 'Updated Description'
    };
    const mockResponse = { success: true, data: { ...mockCompany, ...updateData } };
    repository.updateCompany.and.returnValue(of(mockResponse));

    service.updateCompany('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(repository.updateCompany).toHaveBeenCalledWith('1', updateData);
        done();
      }
    });
  });
});


