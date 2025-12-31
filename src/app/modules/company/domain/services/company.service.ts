import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { CreateCompanyRequest, UpdateCompanyRequest, CompanyResponse, CompaniesResponse, Company } from '../interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly companyRepository = inject(CompanyRepository);

  getAllCompanies(): Observable<CompaniesResponse> {
    return this.companyRepository.getAllCompanies();
  }

  getCompanyById(companyId: string): Observable<CompanyResponse> {
    return this.companyRepository.getCompanyById(companyId);
  }

  createCompany(companyData: CreateCompanyRequest): Observable<CompanyResponse> {
    return this.companyRepository.createCompany(companyData);
  }

  updateCompany(companyId: string, companyData: UpdateCompanyRequest): Observable<CompanyResponse> {
    return this.companyRepository.updateCompany(companyId, companyData);
  }
}

