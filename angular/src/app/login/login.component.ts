import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('alertModal') alertModal!: AlertModalComponent;
  public loginForm!: FormGroup;
  submitted = false;
  constructor(private modalService: NgbModal, private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService) {

  }
  userobj = {
    'login': '0'
  }
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  showImage = false;

  // Called when the video ends
  onVideoEnded() {
    this.showImage = false;
  }

  // Called when the Skip button is clicked
  onSkip() {
    $("video").hide();
    this.showImage = true;
    // You can implement additional logic here if needed
    //console.log('Skip button clicked');
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
      this.alertModal.openModal("Please enter Username and Password",false);
      return;
    }
    if (this.submitted) {
      let userfound = false;
      this.logser.getAllUsers().subscribe(res => {
        const user = res.find((a: any) => {
          if (a.Username === this.loginForm.value.username) {
            userfound = true;
          }
          return a.Username === this.loginForm.value.username && a.Password === this.loginForm.value.password;
        });
        if (user) {
          this.logser.currentuser.Username = user.Username;
          this.logser.currentuser.UserId = user.UserId;
          this.logser.currentuser.CityId = user.User_cityid;
          this.logser.currentuser.Role = user.Role;
          this.logser.currentuser.wallet = user.wallet;
          this.logser.currentuser.cartId = user.cartId;
          this.logser.currentuser.gender = user.gender;
          this.logser.currentuser.avatar = user.avatar;
          this.logser.currentuser.login = user.login;
          this.loginForm.reset()
          this.userobj.login = '1';
          this.logser.updateloggeduser(this.userobj).subscribe(
            (data) => {
              this.userobj = data;
              if (user.User_cityid == 0) {
                this.router.navigate(["home"])
              }
              else {
                this.router.navigate(["maincity"])
              }
            },
            (error) => {
              //console.log(error);
            }
          );

        } else {
          if (userfound) {
            this.alertModal.openModal("Kindly Check your Credentials",false);
          } else {
            this.alertModal.openModal("User not Found. Kindly Register.",false);
          }
        }
      }, err => {
        this.alertModal.openModal("Something went wrong",false)
      })
    }
  }
  playVideo() {

    this.showImage=true;
    const video = this.videoPlayer.nativeElement;
    video.play();
  }
  openwhyshorter(whyshorter: any) {

    this.modalService.open(whyshorter, { windowClass: 'frontpage' });
  }
  openaboutshorter(aboutshorter: any) {

    this.modalService.open(aboutshorter, { windowClass: 'frontpage' });
  }
  opennavshorter(navigation: any) {

    this.modalService.open(navigation, { windowClass: 'frontpage' });
  }
}
