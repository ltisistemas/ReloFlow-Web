import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyUserRepository } from '../../infra/repositories/company-user.repository';
import {
  CompanyUsersResponse,
  CompanyUserResponse,
  CreateCompanyUserRequest,
  DeleteCompanyUserResponse
} from '../interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {
  private readonly companyUserRepository = inject(CompanyUserRepository);

  getUsersByCompany(companyId: string): Observable<CompanyUsersResponse> {
    return this.companyUserRepository.getUsersByCompany(companyId);
  }

  getCompanyUserById(id: string): Observable<CompanyUserResponse> {
    return this.companyUserRepository.getCompanyUserById(id);
  }

  createCompanyUser(userData: CreateCompanyUserRequest): Observable<CompanyUserResponse> {
    return this.companyUserRepository.createCompanyUser(userData);
  }

  deleteCompanyUser(id: string): Observable<DeleteCompanyUserResponse> {
    return this.companyUserRepository.deleteCompanyUser(id);
  }
}


