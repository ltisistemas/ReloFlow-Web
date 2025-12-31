import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LoginRequest, SignUpRequest, AuthResponse, SignUpResponse, ApiErrorResponse } from '../../domain/interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  signIn(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signin`, credentials);
  }

  signUp(userData: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/auth/signup`, userData);
  }
}

