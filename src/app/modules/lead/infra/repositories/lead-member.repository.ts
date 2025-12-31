import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  LeadMembersResponse,
  CreateLeadMemberRequest,
  CreateLeadMemberResponse,
  UpdateLeadMemberRequest,
  UpdateLeadMemberResponse,
  DeleteLeadMemberResponse
} from '../../domain/interface/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadMemberRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMembersByLead(leadId: string): Observable<LeadMembersResponse> {
    return this.http.get<LeadMembersResponse>(`${this.apiUrl}/leadmember/lead/${leadId}`);
  }

  createMember(memberData: CreateLeadMemberRequest): Observable<CreateLeadMemberResponse> {
    return this.http.post<CreateLeadMemberResponse>(`${this.apiUrl}/leadmember`, memberData);
  }

  updateMember(memberId: string, memberData: UpdateLeadMemberRequest): Observable<UpdateLeadMemberResponse> {
    return this.http.put<UpdateLeadMemberResponse>(`${this.apiUrl}/leadmember/${memberId}`, memberData);
  }

  deleteMember(memberId: string): Observable<DeleteLeadMemberResponse> {
    return this.http.delete<DeleteLeadMemberResponse>(`${this.apiUrl}/leadmember/${memberId}`);
  }
}

