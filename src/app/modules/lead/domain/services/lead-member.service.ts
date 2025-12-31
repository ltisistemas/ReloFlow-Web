import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadMemberRepository } from '../../infra/repositories/lead-member.repository';
import {
  LeadMembersResponse,
  CreateLeadMemberRequest,
  CreateLeadMemberResponse,
  UpdateLeadMemberRequest,
  UpdateLeadMemberResponse,
  DeleteLeadMemberResponse
} from '../interface/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadMemberService {
  private readonly leadMemberRepository = inject(LeadMemberRepository);

  getMembersByLead(leadId: string): Observable<LeadMembersResponse> {
    return this.leadMemberRepository.getMembersByLead(leadId);
  }

  createMember(memberData: CreateLeadMemberRequest): Observable<CreateLeadMemberResponse> {
    return this.leadMemberRepository.createMember(memberData);
  }

  updateMember(memberId: string, memberData: UpdateLeadMemberRequest): Observable<UpdateLeadMemberResponse> {
    return this.leadMemberRepository.updateMember(memberId, memberData);
  }

  deleteMember(memberId: string): Observable<DeleteLeadMemberResponse> {
    return this.leadMemberRepository.deleteMember(memberId);
  }
}

