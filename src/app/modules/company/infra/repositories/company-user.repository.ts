import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  CompanyUsersResponse,
  CompanyUserResponse,
  CreateCompanyUserRequest,
  DeleteCompanyUserResponse
} from '../../domain/interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getUsersByCompany(companyId: string): Observable<CompanyUsersResponse> {
    return this.http.get<CompanyUsersResponse>(`${this.apiUrl}/companyuser/company/${companyId}`);
  }

  getCompanyUserById(id: string): Observable<CompanyUserResponse> {
    return this.http.get<CompanyUserResponse>(`${this.apiUrl}/companyuser/${id}`);
  }

  createCompanyUser(userData: CreateCompanyUserRequest): Observable<CompanyUserResponse> {
    return this.http.post<CompanyUserResponse>(`${this.apiUrl}/companyuser`, userData);
  }

  deleteCompanyUser(id: string): Observable<DeleteCompanyUserResponse> {
    return this.http.delete<DeleteCompanyUserResponse>(`${this.apiUrl}/companyuser/${id}`);
  }
}


