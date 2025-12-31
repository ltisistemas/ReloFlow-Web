import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DocumentTemplateService } from './document-template.service';
import { DocumentTemplateRepository } from '../../infra/repositories/document-template.repository';
import { CreateDocumentTemplateRequest, UpdateDocumentTemplateRequest } from '../interface/company.interface';

describe('DocumentTemplateService', () => {
  let service: DocumentTemplateService;
  let repository: jasmine.SpyObj<DocumentTemplateRepository>;

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('DocumentTemplateRepository', [
      'getTemplatesByPosition',
      'getTemplateById',
      'createTemplate',
      'updateTemplate',
      'deleteTemplate'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DocumentTemplateService,
        { provide: DocumentTemplateRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(DocumentTemplateService);
    repository = TestBed.inject(DocumentTemplateRepository) as jasmine.SpyObj<DocumentTemplateRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get templates by position', (done) => {
    const mockResponse = { success: true, data: [] };
    repository.getTemplatesByPosition.and.returnValue(of(mockResponse));

    service.getTemplatesByPosition('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should create template', (done) => {
    const createData: CreateDocumentTemplateRequest = {
      companyPositionId: '1',
      name: 'Passport',
      documentType: 'PASSPORT',
      isRequired: true,
      targetType: 0
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
    repository.createTemplate.and.returnValue(of(mockResponse));

    service.createTemplate(createData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should update template', (done) => {
    const updateData: UpdateDocumentTemplateRequest = {
      name: 'Updated Passport',
      documentType: 'PASSPORT',
      isRequired: false,
      targetType: 0
    };
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        companyPositionId: '1',
        ...updateData,
        created: '2024-01-01',
        updated: '2024-01-01',
        deleted: null
      }
    };
    repository.updateTemplate.and.returnValue(of(mockResponse));

    service.updateTemplate('1', updateData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });

  it('should delete template', (done) => {
    const mockResponse = { success: true, data: { success: true } };
    repository.deleteTemplate.and.returnValue(of(mockResponse));

    service.deleteTemplate('1').subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });
  });
});


