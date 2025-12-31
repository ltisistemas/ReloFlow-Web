import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompanyUserService } from './company-user.service';
import { CompanyUserRepository } from '../../infra/repositories/company-user.repository';
import { CreateCompanyUserRequest } from '../interface/company.interface';

describe('CompanyUserService', () => {
  let service: CompanyUserService;
  let repository: jasmine.SpyObj<CompanyUserRepository>;

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('CompanyUserRepository', [
      'getUsersByCompany',
      'getCompanyUserById',
      'createCompanyUser',
      'deleteCompanyUser'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CompanyUserService,
        { provide: CompanyUserRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(CompanyUserService);
    repository = TestBed.inject(CompanyUserRepository) as jasmine.SpyObj<CompanyUserRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users by company', (done) => {
    const mockResponse = { success: true, data: [] };
    repository.getUsersByCompany.and.returnValue(of(mockResponse));

    service.getUsersByCompany('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should create company user', (done) => {
    const createData: CreateCompanyUserRequest = {
      companyId: '1',
      userId: '1'
    };
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        companyId: '1',
        userId: '1',
        created: '2024-01-01',
        updated: '2024-01-01',
        deleted: null
      }
    };
    repository.createCompanyUser.and.returnValue(of(mockResponse));

    service.createCompanyUser(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should delete company user', (done) => {
    const mockResponse = { success: true, data: { success: true } };
    repository.deleteCompanyUser.and.returnValue(of(mockResponse));

    service.deleteCompanyUser('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });
});


