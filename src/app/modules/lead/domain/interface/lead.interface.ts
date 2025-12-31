export interface LeadMember {
  id: string;
  leadId: string;
  userId: string | null;
  name: string | null;
  created: string;
  updated: string;
  deleted: string | null;
}

export interface Lead {
  id: string;
  userId: string;
  companyId: string;
  companyPositionId: string;
  name: string;
  description: string;
  amount: number | null;
  currency: string;
  zipCode: string | null;
  streetAddress: string | null;
  streetAddressNumber: string | null;
  streetAddressComplement: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  members: LeadMember[];
  created: string;
  updated: string;
  deleted: string | null;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface UpdateLeadPositionRequest {
  companyPositionId: string;
}

export interface CreateLeadRequest {
  companyId: string;
  companyPositionId: string;
  name: string;
  description: string;
  amount?: number | null;
  currency: string;
  zipCode?: string | null;
  streetAddress?: string | null;
  streetAddressNumber?: string | null;
  streetAddressComplement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

export interface CreateLeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface UpdateLeadRequest {
  name: string;
  description: string;
  amount?: number | null;
  currency: string;
  zipCode?: string | null;
  streetAddress?: string | null;
  streetAddressNumber?: string | null;
  streetAddressComplement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  companyId: string;
  companyPositionId: string;
}

export interface UpdateLeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface LeadResponse {
  success: boolean;
  data: Lead;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

// LeadMember interfaces
export interface CreateLeadMemberRequest {
  leadId: string;
  userId: string | null;
  name: string | null;
}

export interface UpdateLeadMemberRequest {
  userId: string | null;
  name: string | null;
}

export interface LeadMembersResponse {
  success: boolean;
  data: LeadMember[];
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface CreateLeadMemberResponse {
  success: boolean;
  data: LeadMember;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface UpdateLeadMemberResponse {
  success: boolean;
  data: LeadMember;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface DeleteLeadMemberResponse {
  success: boolean;
  data: {
    success: boolean;
  };
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

// Interface para membros pendentes de salvamento
export interface PendingMember {
  email: string;
  userId: string | null;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } | null;
  name: string | null;
  isExistingUser: boolean;
}

