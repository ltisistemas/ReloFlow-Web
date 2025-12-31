import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthRepository } from '../../infra/repositories/auth.repository';
import { LoginRequest, SignUpRequest, AuthResponse, SignUpResponse, User } from '../interface/auth.interface';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadStoredAuth();
  }

  signIn(credentials: LoginRequest): Observable<AuthResponse> {
    return this.authRepository.signIn(credentials).pipe(
      tap((response: AuthResponse) => {
        if (response.success && response.data) {
          this.setAuthData(response.data.token, {
            id: response.data.sub,
            email: response.data.email,
            firstName: response.data.name.split(' ')[0] || '',
            lastName: response.data.name.split(' ').slice(1).join(' ') || '',
          } as User);
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signUp(userData: SignUpRequest): Observable<SignUpResponse> {
    return this.authRepository.signUp(userData).pipe(
      tap((response: SignUpResponse) => {
        if (response.success && response.data) {
          // Após cadastro, fazer login automaticamente
          this.signIn({
            email: userData.email,
            password: userData.password
          }).subscribe({
            next: () => {
              this.router.navigate(['/portal']);
            },
            error: (error) => {
              console.error('Erro ao fazer login após cadastro:', error);
            }
          });
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private setAuthData(token: string, user: User): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  private getStoredUser(): User | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
    return null;
  }

  private loadStoredAuth(): void {
    const user = this.getStoredUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }
}

