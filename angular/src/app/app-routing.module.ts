import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {MaincityComponent} from './maincity/maincity.component';
import {HomeComponent} from './home/home.component';
import {AddcityComponent} from './addcity/addcity.component'
const routes: Routes = [
{ path: "", redirectTo: "login", pathMatch: "full" },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'addcity', component: AddcityComponent },
{ path: 'maincity', component: MaincityComponent },
{ path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
