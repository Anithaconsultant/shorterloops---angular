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

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
          this.loginForm.reset()
          if (user.User_cityid == null) {
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
