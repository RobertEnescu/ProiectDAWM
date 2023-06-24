import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import usersData from './users.json';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersList: User[] = usersData;
  usersListSubject = new Subject<User[]>();

  constructor() {}

  get users(): User[] {
    return this.usersList;
  }

  set users(usersToSet: any) {
    this.usersList = usersToSet;
    this.usersListSubject.next(usersToSet);
  }

  deleteUser(user: User) {
    const index = this.usersList.findIndex(() => user);
    this.usersList.splice(index, 1);

    this.usersListSubject.next(this.usersList);
  }

  addNewUser() {
    this.usersList.push(this.emptyUser());
    this.usersListSubject.next(this.usersList);
  }

  emptyUser(): User {
    return {
      username: '-',
      email: '-',
      password: '-',
    };
  }
}
