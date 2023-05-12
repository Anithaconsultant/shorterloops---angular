import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
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
    'User_cityid': '',
    'Role': '',
    'cartId': '0',
    'avatar': '',
    'gender': ''

  }; user: any;
  userList: any;
  newmale: any[] = [];
  newfemale: any[] = [];
  maleset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  femaleset = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  bgposition = ['-180px -72px', '-613px -78px', '-1111px -77px', '-1486px -75px', '-1923px -88px', '-2393px -75px', '-2749px -82px', '-3331px -72px', '-3840px -96px', '-4309px -62px', '-180px -570px', '-680px -577px', '-1111px -575px', '-1471px -553px', '-1929px -586px', '-2393px -573px', '-2849px -581px', '-3331px -570px', '-3840px -595px', '-4309px -634px', '-180px -1021px', '-673px -1027px', '-1111px -1026px', '-1486px -1021px', '-1929px -1037px', '-2393px -1024px', '-2842px -1031px', '-3331px -1021px', '-3840px -1046px', '-4309px -1013px', '-180px -1429px', '-680px -1444px', '-1111px -1433px', '-1526px -1468px', '-1929px -1444px', '-2393px -1431px', '-2954px -1439px', '-3331px -1429px', '-3840px -1453px', '-4309px -1457px']
  constructor(private formbuilder: FormBuilder, private modalService: NgbModal, private http: HttpClientModule, private router: Router, private logser: LoginserviceService) {
    this.logser.getAllUsers().subscribe((data) => {
      this.user = data;console.log(this.user.length);
      for (var i = 0; i < this.user.length; i++) {
        let avatarnumber=this.user[i].avatar;
        console.log()
        for (var j=0;j<this.maleset.length;j++){
          console.log(this.maleset[j],avatarnumber)
          if(this.maleset[j]==avatarnumber){
            this.maleset.splice(j,1);
          }
        }
        console.log(this.maleset);
        for (var j=0;j<this.femaleset.length;j++){
          if(this.femaleset[j]==avatarnumber){
            this.femaleset.splice(j,1);
          }
        }
      }
      console.log(this.femaleset);  
      this.newmale=this.maleset.slice(0);
      this.newfemale=this.femaleset.slice(0);
   });
    
  }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required]
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
  open(content: any) {
    if (this.newuser.gender != '') {

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    else {
      alert("Kindly select the Gender");
    }

  }

  selectphoto(ind: any) {
    $(".pics").css('border', '4px solid #fff');
    $("#pic_" + ind).css('border', '4px solid #333');
    this.newuser.avatar = String(ind);
    console.log(this.newuser.avatar);

  }

}
