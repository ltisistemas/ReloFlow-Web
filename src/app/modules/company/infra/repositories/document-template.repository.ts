import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  DocumentTemplatesResponse,
  DocumentTemplateResponse,
  CreateDocumentTemplateRequest,
  UpdateDocumentTemplateRequest,
  DeleteDocumentTemplateResponse
} from '../../domain/interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getTemplatesByPosition(companyPositionId: string): Observable<DocumentTemplatesResponse> {
    return this.http.get<DocumentTemplatesResponse>(`${this.apiUrl}/companypositiondocumenttemplate/company-position/${companyPositionId}`);
  }

  getTemplateById(id: string): Observable<DocumentTemplateResponse> {
    return this.http.get<DocumentTemplateResponse>(`${this.apiUrl}/companypositiondocumenttemplate/${id}`);
  }

  createTemplate(templateData: CreateDocumentTemplateRequest): Observable<DocumentTemplateResponse> {
    return this.http.post<DocumentTemplateResponse>(`${this.apiUrl}/companypositiondocumenttemplate`, templateData);
  }

  updateTemplate(id: string, templateData: UpdateDocumentTemplateRequest): Observable<DocumentTemplateResponse> {
    return this.http.put<DocumentTemplateResponse>(`${this.apiUrl}/companypositiondocumenttemplate/${id}`, templateData);
  }

  deleteTemplate(id: string): Observable<DeleteDocumentTemplateResponse> {
    return this.http.delete<DeleteDocumentTemplateResponse>(`${this.apiUrl}/companypositiondocumenttemplate/${id}`);
  }
}


