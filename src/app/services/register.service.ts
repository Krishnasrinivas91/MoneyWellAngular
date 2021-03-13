import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiBaseUrl: string = "https://localhost:44326/api/Account/Register";

  constructor(private http: HttpClient) { }

  RegisterService(user: User):any{
    return this.http.post<User>(this.apiBaseUrl+'users/register', user);
}
}
