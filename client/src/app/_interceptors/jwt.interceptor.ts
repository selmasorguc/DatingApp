import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {currentUser = user;});
    if(localStorage.getItem('user')) {
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })
    }
    return next.handle(request);
  }
}
