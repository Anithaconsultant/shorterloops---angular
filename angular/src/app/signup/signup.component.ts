import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  submitted = false;
  newuser = {
    'Username': '',
    'email': '',
    'mobile': '',
    'Password': '',
    'wallet': '2000',
    'status': 'active',
    'User_cityid':'',
    'Role':'',
    'cartId':'0'
  };
  constructor(private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService) {

  }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      alert("invalid");
      return;
    }
    if (this.submitted) {
      this.logser.createUser(this.newuser).subscribe(
        data => {
          this.newuser=data;
        },
        error => {
          console.log(error);
        }
        );
        this.router.navigate(["login"])
    }
  }
}
