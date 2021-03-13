import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  responseString: string;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.formInitialization();
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    if(this.registerForm.invalid)
      return;
    var user = new User();
    user.UserName = this.registerForm.get('UserName').value;
    user.Password = this.registerForm.get('Password').value;
    user.ConfirmPassword = this.registerForm.get("ConfirmPassword").value;

    this.registerService.RegisterService(user).subscribe(data => 
      {
        this.responseString = data.message; 
        this.formInitialization();
      });
  }

  formInitialization(){
    this.registerForm = this.fb.group({
      UserName: [, Validators.required],
      Password: [, Validators.required],
      ConfirmPassword: [, Validators.required]
    });
  }
}
