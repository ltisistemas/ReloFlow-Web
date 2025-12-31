import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentTemplateRepository } from '../../infra/repositories/document-template.repository';
import {
  DocumentTemplatesResponse,
  DocumentTemplateResponse,
  CreateDocumentTemplateRequest,
  UpdateDocumentTemplateRequest,
  DeleteDocumentTemplateResponse
} from '../interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  private readonly documentTemplateRepository = inject(DocumentTemplateRepository);

  getTemplatesByPosition(companyPositionId: string): Observable<DocumentTemplatesResponse> {
    return this.documentTemplateRepository.getTemplatesByPosition(companyPositionId);
  }

  getTemplateById(id: string): Observable<DocumentTemplateResponse> {
    return this.documentTemplateRepository.getTemplateById(id);
  }

  createTemplate(templateData: CreateDocumentTemplateRequest): Observable<DocumentTemplateResponse> {
    return this.documentTemplateRepository.createTemplate(templateData);
  }

  updateTemplate(id: string, templateData: UpdateDocumentTemplateRequest): Observable<DocumentTemplateResponse> {
    return this.documentTemplateRepository.updateTemplate(id, templateData);
  }

  deleteTemplate(id: string): Observable<DeleteDocumentTemplateResponse> {
    return this.documentTemplateRepository.deleteTemplate(id);
  }
}


