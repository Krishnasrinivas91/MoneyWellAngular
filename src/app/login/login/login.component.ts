import { HttpErrorResponse } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginRequest} from '../../models/login';
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage:string;
  loading = false;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: [, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: [, Validators.required]
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    if(this.loginForm.invalid)
      return;
    var request = new LoginRequest();
    request.UserName = this.loginForm.get('UserName').value;
    request.password = this.loginForm.get('Password').value;

    this.loading = true;
    this.loginService.Authenticate(request).subscribe(data => {
      if(data && data.message)
        this.errorMessage = data.message;
      else{
        localStorage.setItem("token", data.token);        
        window.location.href = "/home";
      }
      this.loading = false;
    },
    (error:HttpErrorResponse) => {
      
      this.loading = false;
      this.errorMessage = "Username or Password is incorrect";
      if(error.status===400){
        let obj = error.error;
        this.errorMessage = obj ? obj.message : null;
        console.log(error);
      }
  });
  }

}
