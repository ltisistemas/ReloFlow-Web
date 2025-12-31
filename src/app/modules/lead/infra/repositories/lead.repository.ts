import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  LeadsResponse,
  Lead,
  UpdateLeadPositionRequest,
  CreateLeadRequest,
  CreateLeadResponse,
  UpdateLeadRequest,
  UpdateLeadResponse,
  LeadResponse
} from '../../domain/interface/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getLeadsByCompany(companyId: string): Observable<LeadsResponse> {
    return this.http.get<LeadsResponse>(`${this.apiUrl}/lead/company/${companyId}`);
  }

  getLeadById(leadId: string): Observable<LeadResponse> {
    return this.http.get<LeadResponse>(`${this.apiUrl}/lead/${leadId}`);
  }

  createLead(leadData: CreateLeadRequest): Observable<CreateLeadResponse> {
    return this.http.post<CreateLeadResponse>(`${this.apiUrl}/lead`, leadData);
  }

  updateLead(leadId: string, leadData: UpdateLeadRequest): Observable<UpdateLeadResponse> {
    return this.http.put<UpdateLeadResponse>(`${this.apiUrl}/lead/${leadId}`, leadData);
  }

  updateLeadPosition(leadId: string, positionData: UpdateLeadPositionRequest): Observable<{ success: boolean; data: Lead }> {
    return this.http.patch<{ success: boolean; data: Lead }>(`${this.apiUrl}/lead/${leadId}/position`, positionData);
  }
}

