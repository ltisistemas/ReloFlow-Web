import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRepository } from './user.repository';
import { environment } from '../../../../../environments/environment';

describe('UserRepository', () => {
  let repository: UserRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepository]
    });

    repository = TestBed.inject(UserRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should get all users', (done) => {
    const mockResponse = {
      success: true,
      data: []
    };

    repository.getAllUsers().subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get user by email', (done) => {
    const mockUsersResponse = {
      success: true,
      data: [
        { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User' }
      ]
    };

    repository.getUserByEmail('test@example.com').subscribe({
      next: (user) => {
        expect(user).toBeTruthy();
        expect(user?.email).toBe('test@example.com');
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });
});


