import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { ModeService } from '../../../../../shared/services/mode.service';
import { CompanyService } from '../../../../company/domain/services/company.service';
import { LeadService } from '../../../../lead/domain/services/lead.service';
import { Company } from '../../../../company/domain/interface/company.interface';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let modeService: jasmine.SpyObj<ModeService>;
  let companyService: jasmine.SpyObj<CompanyService>;
  let leadService: jasmine.SpyObj<LeadService>;

  const mockCompany: Company = {
    id: '1',
    userId: '1',
    name: 'Test Company',
    description: 'Test',
    financialCode: 'TEST',
    users: [],
    created: '2024-01-01',
    updated: '2024-01-01',
    deleted: null,
    positions: []
  };

  beforeEach(async () => {
    const modeServiceSpy = jasmine.createSpyObj('ModeService', [], {
      selectedCompany$: of(mockCompany)
    });
    const companyServiceSpy = jasmine.createSpyObj('CompanyService', ['getCompanyById']);
    const leadServiceSpy = jasmine.createSpyObj('LeadService', ['getLeadsByCompany']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: ModeService, useValue: modeServiceSpy },
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: LeadService, useValue: leadServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    modeService = TestBed.inject(ModeService) as jasmine.SpyObj<ModeService>;
    companyService = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
    leadService = TestBed.inject(LeadService) as jasmine.SpyObj<LeadService>;

    leadService.getLeadsByCompany.and.returnValue(of({ success: true, data: [] }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data when company is selected', () => {
    fixture.detectChanges();
    expect(leadService.getLeadsByCompany).toHaveBeenCalled();
  });
});

