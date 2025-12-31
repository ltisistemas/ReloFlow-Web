export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    sub: string;
    email: string;
    name: string;
  };
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface SignUpResponse {
  success: boolean;
  data: User;
  message?: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: number | null;
  nif: string | null;
  niss: string | null;
  registerNumber: string | null;
  nacionalidad: string | null;
  naturalidad: string | null;
  profession: string | null;
  salary: number | null;
  zipCode: string | null;
  streetAddress: string | null;
  streetAddressNumber: string | null;
  streetAddressComplement: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  passportNumber: string | null;
  passportCreated: string | null;
  passportExpires: string | null;
  hasVisa: boolean;
  visaStartDate: string | null;
  visaEndDate: string | null;
  anotherInformation: string | null;
  resetPassword: boolean;
  lastLogin: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    property: string;
    message: string;
  }>;
}

