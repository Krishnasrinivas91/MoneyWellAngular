import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register/register.component';
import { HeaderComponent } from './header/header/header.component';
import { LoginComponent } from './login/login/login.component';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import {HtpBasicInterceptor} from './services/HtpBasic.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoginService,
    RegisterService,
    {provide: HTTP_INTERCEPTORS, useClass: HtpBasicInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
