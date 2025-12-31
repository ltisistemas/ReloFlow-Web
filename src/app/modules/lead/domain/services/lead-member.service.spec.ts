import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LeadMemberService } from './lead-member.service';
import { LeadMemberRepository } from '../../infra/repositories/lead-member.repository';
import { CreateLeadMemberRequest, UpdateLeadMemberRequest } from '../interface/lead.interface';

describe('LeadMemberService', () => {
  let service: LeadMemberService;
  let repository: jasmine.SpyObj<LeadMemberRepository>;

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('LeadMemberRepository', [
      'getMembersByLead',
      'createMember',
      'updateMember',
      'deleteMember'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LeadMemberService,
        { provide: LeadMemberRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(LeadMemberService);
    repository = TestBed.inject(LeadMemberRepository) as jasmine.SpyObj<LeadMemberRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get members by lead', (done) => {
    const mockResponse = { success: true, data: [] };
    repository.getMembersByLead.and.returnValue(of(mockResponse));

    service.getMembersByLead('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should create member', (done) => {
    const createData: CreateLeadMemberRequest = {
      leadId: '1',
      userId: '1',
      name: null
    };
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        ...createData,
        created: '2024-01-01',
        updated: '2024-01-01',
        deleted: null
      }
    };
    repository.createMember.and.returnValue(of(mockResponse));

    service.createMember(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should update member', (done) => {
    const updateData: UpdateLeadMemberRequest = {
      userId: '1',
      name: 'Updated Name'
    };
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        leadId: '1',
        ...updateData,
        created: '2024-01-01',
        updated: '2024-01-01',
        deleted: null
      }
    };
    repository.updateMember.and.returnValue(of(mockResponse));

    service.updateMember('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should delete member', (done) => {
    const mockResponse = { success: true, data: { success: true } };
    repository.deleteMember.and.returnValue(of(mockResponse));

    service.deleteMember('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });
});


