export interface CreateCompanyRequest {
  name: string;
  description: string;
}

export interface UpdateCompanyRequest {
  name: string;
  description: string;
}

export interface DocumentTemplate {
  id: string;
  companyPositionId: string;
  name: string;
  documentType: string; // PASSPORT, VISA, etc.
  isRequired: boolean;
  targetType: number; // 0 = LEAD, 1 = LEAD_MEMBER
  created: string;
  updated: string;
  deleted: string | null;
}

export interface CompanyPosition {
  id: string;
  companyId: string;
  name: string;
  documentTemplates: DocumentTemplate[];
  created: string;
  updated: string;
  deleted: string | null;
}

export interface CompanyUser {
  id: string;
  companyId: string;
  userId: string;
  created: string;
  updated: string;
  deleted: string | null;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  description: string;
  financialCode: string;
  users: any[];
  created: string;
  updated: string;
  deleted: string | null;
  positions: CompanyPosition[];
}

export interface CompanyResponse {
  success: boolean;
  data: Company;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface CompaniesResponse {
  success: boolean;
  data: Company[];
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

// Document Template Interfaces
export interface CreateDocumentTemplateRequest {
  companyPositionId: string;
  name: string;
  documentType: string;
  isRequired: boolean;
  targetType: number; // 0 = LEAD, 1 = LEAD_MEMBER
}

export interface UpdateDocumentTemplateRequest {
  name: string;
  documentType: string;
  isRequired: boolean;
  targetType: number;
}

export interface DocumentTemplatesResponse {
  success: boolean;
  data: DocumentTemplate[];
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface DocumentTemplateResponse {
  success: boolean;
  data: DocumentTemplate;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface DeleteDocumentTemplateResponse {
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

// Company User Interfaces
export interface CreateCompanyUserRequest {
  companyId: string;
  userId: string;
}

export interface CompanyUsersResponse {
  success: boolean;
  data: CompanyUser[];
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface CompanyUserResponse {
  success: boolean;
  data: CompanyUser;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface DeleteCompanyUserResponse {
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

