import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadRepository } from '../../infra/repositories/lead.repository';
import {
  LeadsResponse,
  Lead,
  UpdateLeadPositionRequest,
  CreateLeadRequest,
  CreateLeadResponse,
  UpdateLeadRequest,
  UpdateLeadResponse,
  LeadResponse
} from '../interface/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private readonly leadRepository = inject(LeadRepository);

  getLeadsByCompany(companyId: string): Observable<LeadsResponse> {
    return this.leadRepository.getLeadsByCompany(companyId);
  }

  getLeadById(leadId: string): Observable<LeadResponse> {
    return this.leadRepository.getLeadById(leadId);
  }

  createLead(leadData: CreateLeadRequest): Observable<CreateLeadResponse> {
    return this.leadRepository.createLead(leadData);
  }

  updateLead(leadId: string, leadData: UpdateLeadRequest): Observable<UpdateLeadResponse> {
    return this.leadRepository.updateLead(leadId, leadData);
  }

  updateLeadPosition(leadId: string, positionData: UpdateLeadPositionRequest): Observable<{ success: boolean; data: Lead }> {
    return this.leadRepository.updateLeadPosition(leadId, positionData);
  }
}

