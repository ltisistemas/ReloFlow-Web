import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthRepository } from '../../infra/repositories/auth.repository';
import { LoginRequest, SignUpRequest, AuthResponse, SignUpResponse, User } from '../interface/auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jasmine.SpyObj<AuthRepository>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    gender: null,
    nif: null,
    niss: null,
    registerNumber: null,
    nacionalidad: null,
    naturalidad: null,
    profession: null,
    salary: null,
    zipCode: null,
    streetAddress: null,
    streetAddressNumber: null,
    streetAddressComplement: null,
    city: null,
    state: null,
    country: null,
    passportNumber: null,
    passportCreated: null,
    passportExpires: null,
    hasVisa: false,
    visaStartDate: null,
    visaEndDate: null,
    anotherInformation: null,
    resetPassword: false,
    lastLogin: null,
    status: 0,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  };

  const mockAuthResponse: AuthResponse = {
    success: true,
    data: {
      token: 'test-token',
      sub: '1',
      email: 'john@example.com',
      name: 'John Doe'
    }
  };

  const mockSignUpResponse: SignUpResponse = {
    success: true,
    data: mockUser
  };

  beforeEach(() => {
    const authRepositorySpy = jasmine.createSpyObj('AuthRepository', ['signIn', 'signUp']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: authRepositorySpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    authRepository = TestBed.inject(AuthRepository) as jasmine.SpyObj<AuthRepository>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Clear localStorage
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in successfully', (done) => {
    const credentials: LoginRequest = { email: 'john@example.com', password: 'password123' };
    authRepository.signIn.and.returnValue(of(mockAuthResponse));

    service.signIn(credentials).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(authRepository.signIn).toHaveBeenCalledWith(credentials);
        expect(localStorage.getItem('auth_token')).toBe('test-token');
        done();
      }
    });
  });

  it('should handle sign in error', (done) => {
    const credentials: LoginRequest = { email: 'john@example.com', password: 'wrong' };
    authRepository.signIn.and.returnValue(throwError(() => ({ error: 'Invalid credentials' })));

    service.signIn(credentials).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });
  });

  it('should sign up successfully', (done) => {
    const userData: SignUpRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    };
    authRepository.signUp.and.returnValue(of(mockSignUpResponse));
    authRepository.signIn.and.returnValue(of(mockAuthResponse));

    service.signUp(userData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(authRepository.signUp).toHaveBeenCalledWith(userData);
        done();
      }
    });
  });

  it('should sign out', () => {
    localStorage.setItem('auth_token', 'test-token');
    localStorage.setItem('auth_user', JSON.stringify(mockUser));

    service.signOut();

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should check if user is authenticated', () => {
    localStorage.setItem('auth_token', 'test-token');
    expect(service.isAuthenticated()).toBe(true);

    localStorage.removeItem('auth_token');
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should get current user', () => {
    service['currentUserSubject'].next(mockUser);
    expect(service.getCurrentUser()).toEqual(mockUser);
  });
});


