import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { runInInjectionContext } from '@angular/core';
import { authGuard, authRedirectGuard } from './auth.guard';
import { AuthService } from '../../../modules/auth/domain/services/auth.service';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;
  let injector: any;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    injector = TestBed.inject;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = { url: '/test' } as RouterStateSnapshot;
  });

  it('should allow access when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    const result = runInInjectionContext(TestBed, () => authGuard(mockRoute, mockState));
    expect(result).toBe(true);
  });

  it('should redirect when not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = runInInjectionContext(TestBed, () => authGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login'], { queryParams: { returnUrl: '/test' } });
  });
});

describe('authRedirectGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
  });

  it('should redirect when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    const result = runInInjectionContext(TestBed, () => authRedirectGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/portal']);
  });

  it('should allow access when not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = runInInjectionContext(TestBed, () => authRedirectGuard(mockRoute, mockState));
    expect(result).toBe(true);
  });
});


