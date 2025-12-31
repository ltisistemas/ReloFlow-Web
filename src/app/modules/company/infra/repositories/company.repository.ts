import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CreateCompanyRequest, UpdateCompanyRequest, CompanyResponse, CompaniesResponse } from '../../domain/interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAllCompanies(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(`${this.apiUrl}/company`);
  }

  getCompanyById(companyId: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.apiUrl}/company/${companyId}`);
  }

  createCompany(companyData: CreateCompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${this.apiUrl}/company`, companyData);
  }

  updateCompany(companyId: string, companyData: UpdateCompanyRequest): Observable<CompanyResponse> {
    return this.http.put<CompanyResponse>(`${this.apiUrl}/company/${companyId}`, companyData);
  }
}

