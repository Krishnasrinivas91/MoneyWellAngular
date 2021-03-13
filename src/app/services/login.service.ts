import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  apiBaseUrl: string = "https://localhost:44326/token";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
   }
   public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  Authenticate(request: LoginRequest):any{
    const headers= new HttpHeaders()
                    .set('grant_type', 'password')
                    .set('username', request.UserName)
                    .set('password', request.password);

    return this.http.post<LoginRequest>(this.apiBaseUrl, {'headers':headers}).pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));;
}

GetTokenDetails(): string{
    return localStorage.getItem('token');
}

logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
}
}
