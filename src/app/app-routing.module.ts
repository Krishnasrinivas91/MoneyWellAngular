import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import {BankComponent} from './bank/bank/bank.component';
import {BasicauthGuard} from './services/basicauth.guard';


const routes: Routes = [
  {path: 'register', component:RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bank', component: BankComponent, canActivate: [BasicauthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
