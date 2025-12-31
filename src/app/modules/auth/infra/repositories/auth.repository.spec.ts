import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthRepository } from './auth.repository';
import { environment } from '../../../../../environments/environment';
import { LoginRequest, SignUpRequest } from '../../domain/interface/auth.interface';

describe('AuthRepository', () => {
  let repository: AuthRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthRepository]
    });

    repository = TestBed.inject(AuthRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should sign in', (done) => {
    const credentials: LoginRequest = { email: 'test@example.com', password: 'password123' };
    const mockResponse = {
      success: true,
      data: {
        token: 'test-token',
        sub: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    repository.signIn(credentials).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.token).toBe('test-token');
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/signin`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should sign up', (done) => {
    const userData: SignUpRequest = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    };
    const mockResponse = {
      success: true,
      data: {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      }
    };

    repository.signUp(userData).subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.email).toBe('test@example.com');
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});


