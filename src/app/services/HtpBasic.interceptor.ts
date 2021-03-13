import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable()
export class HtpBasicInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.GetTokenDetails(); 
    console.log(token);
    if (token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next.handle(request);
  }
}
