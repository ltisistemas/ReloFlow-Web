import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LeadService } from './lead.service';
import { LeadRepository } from '../../infra/repositories/lead.repository';
import { Lead, CreateLeadRequest, UpdateLeadRequest } from '../interface/lead.interface';

describe('LeadService', () => {
  let service: LeadService;
  let repository: jasmine.SpyObj<LeadRepository>;

  const mockLead: Lead = {
    id: '1',
    userId: '1',
    companyId: '1',
    companyPositionId: '1',
    name: 'Test Lead',
    description: 'Test Description',
    amount: 1000,
    currency: 'EUR',
    zipCode: null,
    streetAddress: null,
    streetAddressNumber: null,
    streetAddressComplement: null,
    city: null,
    state: null,
    country: null,
    members: [],
    created: '2024-01-01',
    updated: '2024-01-01',
    deleted: null
  };

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('LeadRepository', [
      'getLeadsByCompany',
      'getLeadById',
      'createLead',
      'updateLead',
      'updateLeadPosition'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LeadService,
        { provide: LeadRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(LeadService);
    repository = TestBed.inject(LeadRepository) as jasmine.SpyObj<LeadRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get leads by company', (done) => {
    const mockResponse = { success: true, data: [mockLead] };
    repository.getLeadsByCompany.and.returnValue(of(mockResponse));

    service.getLeadsByCompany('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.length).toBe(1);
        done();
      }
    });
  });

  it('should get lead by id', (done) => {
    const mockResponse = { success: true, data: mockLead };
    repository.getLeadById.and.returnValue(of(mockResponse));

    service.getLeadById('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.id).toBe('1');
        done();
      }
    });
  });

  it('should create lead', (done) => {
    const createData: CreateLeadRequest = {
      companyId: '1',
      companyPositionId: '1',
      name: 'New Lead',
      description: 'New Description',
      currency: 'EUR'
    };
    const mockResponse = { success: true, data: mockLead };
    repository.createLead.and.returnValue(of(mockResponse));

    service.createLead(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(repository.createLead).toHaveBeenCalledWith(createData);
        done();
      }
    });
  });

  it('should update lead', (done) => {
    const updateData: UpdateLeadRequest = {
      name: 'Updated Lead',
      description: 'Updated Description',
      currency: 'EUR',
      companyId: '1',
      companyPositionId: '1'
    };
    const mockResponse = { success: true, data: { ...mockLead, ...updateData } };
    repository.updateLead.and.returnValue(of(mockResponse));

    service.updateLead('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(repository.updateLead).toHaveBeenCalledWith('1', updateData);
        done();
      }
    });
  });

  it('should update lead position', (done) => {
    const mockResponse = { success: true, data: mockLead };
    repository.updateLeadPosition.and.returnValue(of(mockResponse));

    service.updateLeadPosition('1', { companyPositionId: '2' }).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(repository.updateLeadPosition).toHaveBeenCalledWith('1', { companyPositionId: '2' });
        done();
      }
    });
  });
});


