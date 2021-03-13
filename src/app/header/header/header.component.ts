import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn : boolean = false;
  isAdmin:boolean = false;
  
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.UserLoggedIn();
  }

  // ngOnChanges(){
  //   this.UserLoggedIn();
  // }

  logout(){    
    this.isUserLoggedIn = false;
    this.loginService.logout();      
    this.router.navigate(['/login']); 
  }

  UserLoggedIn()
  {
    if(localStorage.getItem('token') !== null)
      this.isUserLoggedIn = true;

    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
  }
}
