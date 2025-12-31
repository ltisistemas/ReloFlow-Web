import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { runInInjectionContext } from '@angular/core';
import { of, throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';
import { AuthService } from '../../../modules/auth/domain/services/auth.service';

describe('errorInterceptor', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signOut']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should handle 401 error and sign out', (done) => {
    const request = new HttpRequest('GET', '/api/test');
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized'
    });

    const next = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

    runInInjectionContext(TestBed, () => {
      errorInterceptor(request, next).subscribe({
        error: (error: any) => {
          expect(authService.signOut).toHaveBeenCalled();
          expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
          expect(error).toBeDefined();
          done();
        }
      });
    });
  });

  it('should handle 403 error and redirect', (done) => {
    const request = new HttpRequest('GET', '/api/test');
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden'
    });

    const next = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

    runInInjectionContext(TestBed, () => {
      errorInterceptor(request, next).subscribe({
        error: (error: any) => {
          expect(router.navigate).toHaveBeenCalledWith(['/portal']);
          expect(error).toBeDefined();
          done();
        }
      });
    });
  });

  it('should pass through non-401/403 errors', (done) => {
    const request = new HttpRequest('GET', '/api/test');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });

    const next = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

    runInInjectionContext(TestBed, () => {
      errorInterceptor(request, next).subscribe({
        error: (error: any) => {
          expect(authService.signOut).not.toHaveBeenCalled();
          expect(error).toBeDefined();
          done();
        }
      });
    });
  });
});


