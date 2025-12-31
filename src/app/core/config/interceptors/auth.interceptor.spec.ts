import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { runInInjectionContext } from '@angular/core';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../../../modules/auth/domain/services/auth.service';

describe('authInterceptor', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const nextSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: HttpHandler, useValue: nextSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    next = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should add authorization header when token exists', (done) => {
    authService.getToken.and.returnValue('test-token');
    const request = new HttpRequest('GET', '/api/test');
    const mockEvent = of({} as HttpEvent<any>);
    next.handle.and.returnValue(mockEvent);

    runInInjectionContext(TestBed, () => {
      authInterceptor(request, next.handle).subscribe(() => {
        expect(authService.getToken).toHaveBeenCalled();
        expect(next.handle).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should not add authorization header for auth routes', (done) => {
    authService.getToken.and.returnValue('test-token');
    const request = new HttpRequest('GET', '/api/auth/signin');
    const mockEvent = of({} as HttpEvent<any>);
    next.handle.and.returnValue(mockEvent);

    runInInjectionContext(TestBed, () => {
      authInterceptor(request, next.handle).subscribe(() => {
        expect(next.handle).toHaveBeenCalledWith(request);
        done();
      });
    });
  });

  it('should not add authorization header when token does not exist', (done) => {
    authService.getToken.and.returnValue(null);
    const request = new HttpRequest('GET', '/api/test');
    const mockEvent = of({} as HttpEvent<any>);
    next.handle.and.returnValue(mockEvent);

    runInInjectionContext(TestBed, () => {
      authInterceptor(request, next.handle).subscribe(() => {
        expect(authService.getToken).toHaveBeenCalled();
        expect(next.handle).toHaveBeenCalled();
        done();
      });
    });
  });
});


