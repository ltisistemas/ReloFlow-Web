import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { UserRepository } from '../../infra/repositories/user.repository';
import { User, UsersResponse } from '../interface/user.interface';

describe('UserService', () => {
  let service: UserService;
  let repository: jasmine.SpyObj<UserRepository>;

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

  beforeEach(() => {
    const repositorySpy = jasmine.createSpyObj('UserRepository', [
      'getAllUsers',
      'getUserByEmail'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: UserRepository, useValue: repositorySpy }
      ]
    });

    service = TestBed.inject(UserService);
    repository = TestBed.inject(UserRepository) as jasmine.SpyObj<UserRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', (done) => {
    const mockResponse: UsersResponse = { success: true, data: [mockUser] };
    repository.getAllUsers.and.returnValue(of(mockResponse));

    service.getAllUsers().subscribe({
      next: (response) => {
        expect(response.success).toBe(true);
        expect(response.data.length).toBe(1);
        expect(response.data[0].email).toBe('john@example.com');
        done();
      }
    });
  });

  it('should get user by email', (done) => {
    repository.getUserByEmail.and.returnValue(of(mockUser));

    service.getUserByEmail('john@example.com').subscribe({
      next: (user) => {
        expect(user).toBeTruthy();
        expect(user?.email).toBe('john@example.com');
        done();
      }
    });
  });

  it('should return null when user not found', (done) => {
    repository.getUserByEmail.and.returnValue(of(null));

    service.getUserByEmail('notfound@example.com').subscribe({
      next: (user) => {
        expect(user).toBeNull();
        done();
      }
    });
  });
});


