import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { UsersResponse, User } from '../../domain/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/user`);
  }

  getUserByEmail(email: string): Observable<User | null> {
    // Como não há endpoint específico, busca na lista completa e filtra
    return this.getAllUsers().pipe(
      map((response: UsersResponse) => {
        if (response.success && response.data) {
          const user = response.data.find(u => u.email.toLowerCase() === email.toLowerCase());
          return user || null;
        }
        return null;
      })
    );
  }
}

