import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeadRepository } from './lead.repository';
import { environment } from '../../../../../environments/environment';
import { CreateLeadRequest, UpdateLeadRequest } from '../../domain/interface/lead.interface';

describe('LeadRepository', () => {
  let repository: LeadRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeadRepository]
    });

    repository = TestBed.inject(LeadRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should get leads by company', (done) => {
    const mockResponse = {
      success: true,
      data: []
    };

    repository.getLeadsByCompany('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lead/company/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get lead by id', (done) => {
    const mockResponse = {
      success: true,
      data: { id: '1', name: 'Test Lead' }
    };

    repository.getLeadById('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lead/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create lead', (done) => {
    const createData: CreateLeadRequest = {
      companyId: '1',
      companyPositionId: '1',
      name: 'Test Lead',
      description: 'Test',
      currency: 'EUR'
    };
    const mockResponse = {
      success: true,
      data: { id: '1', ...createData }
    };

    repository.createLead(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lead`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update lead', (done) => {
    const updateData: UpdateLeadRequest = {
      name: 'Updated Lead',
      description: 'Updated',
      currency: 'EUR',
      companyId: '1',
      companyPositionId: '1'
    };
    const mockResponse = {
      success: true,
      data: { id: '1', ...updateData }
    };

    repository.updateLead('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lead/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should update lead position', (done) => {
    const mockResponse = {
      success: true,
      data: { id: '1', companyPositionId: '2' }
    };

    repository.updateLeadPosition('1', { companyPositionId: '2' }).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/lead/1/position`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });
});


