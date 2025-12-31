import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompanyRepository } from './company.repository';
import { environment } from '../../../../../environments/environment';
import { CreateCompanyRequest, UpdateCompanyRequest } from '../../domain/interface/company.interface';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyRepository]
    });

    repository = TestBed.inject(CompanyRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should get all companies', (done) => {
    const mockResponse = {
      success: true,
      data: []
    };

    repository.getAllCompanies().subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/company`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get company by id', (done) => {
    const mockResponse = {
      success: true,
      data: { id: '1', name: 'Test' }
    };

    repository.getCompanyById('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/company/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create company', (done) => {
    const createData: CreateCompanyRequest = {
      name: 'Test Company',
      description: 'Test Description'
    };
    const mockResponse = {
      success: true,
      data: { id: '1', ...createData }
    };

    repository.createCompany(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/company`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update company', (done) => {
    const updateData: UpdateCompanyRequest = {
      name: 'Updated Company',
      description: 'Updated Description'
    };
    const mockResponse = {
      success: true,
      data: { id: '1', ...updateData }
    };

    repository.updateCompany('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/company/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
});


