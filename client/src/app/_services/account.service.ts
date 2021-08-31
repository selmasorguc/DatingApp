import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = ' https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        
      })
    );

  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    console.log("set current user");
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUsername() {
    if (localStorage.getItem('user')) return JSON.parse(<any>localStorage.getItem('user')).username;
    return "";

  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
