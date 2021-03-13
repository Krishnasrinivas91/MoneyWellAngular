import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class BasicauthGuard implements CanActivate {
  constructor(private loginService: LoginService,
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.loginService.currentUserValue;
        //console.log(currentUser);
        if(currentUser)
            return true;

        this.router.navigate(['/login']);
        return false;
  }
  
}
