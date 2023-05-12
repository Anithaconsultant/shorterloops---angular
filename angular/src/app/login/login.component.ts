import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted = false;
  constructor(private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService) {

  }
  userobj={
    'login':'0'
  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: [''],
      password: ['']
    })
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      alert("invalid");
      return;
    }
    if (this.submitted) {
      this.logser.getAllUsers().subscribe(res => {
        const user = res.find((a: any) => {
         

          return a.Username === this.loginForm.value.username && a.Password === this.loginForm.value.password

        });
        if (user) {
          this.logser.currentuser.Username=user.Username;
          this.logser.currentuser.UserId=user.UserId;
          this.logser.currentuser.CityId=user.User_cityid;
          this.logser.currentuser.Role=user.Role;
          this.logser.currentuser.wallet=user.wallet;
          this.logser.currentuser.cartId=user.cartId;
          this.logser.currentuser.gender=user.gender;
          this.logser.currentuser.avatar=user.avatar;
          this.logser.currentuser.login=user.login;
          this.loginForm.reset()
          this.userobj.login='1';
          this.logser.updateloggeduser(this.userobj).subscribe(
            (data) => {
              this.userobj = data;
            },
            (error) => {
              console.log(error);
            }
          );
          if (user.User_cityid == 0) {
            this.router.navigate(["home"])
          }
          else {
            this.router.navigate(["maincity"])
          }
        } else {
          alert("user not found")
        }
      }, err => {
        alert("Something went wrong")
      })
    }
  }
}
