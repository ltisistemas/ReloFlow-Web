import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../infra/repositories/user.repository';
import { UsersResponse, User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userRepository = inject(UserRepository);

  getAllUsers(): Observable<UsersResponse> {
    return this.userRepository.getAllUsers();
  }

  getUserByEmail(email: string): Observable<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}

