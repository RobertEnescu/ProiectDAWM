import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  usersListSubject = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  login(username: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}?username=${username}&password=${password}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }
}
