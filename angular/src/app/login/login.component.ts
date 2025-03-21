import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('alertModal') alertModal!: AlertModalComponent;
  public loginForm!: FormGroup;
  submitted = false;
  constructor(private modalService: NgbModal,private sharedService: SharedServiceService, private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService) {

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
  switchYesOrNo!: number; // The variable is now a number
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.alertModal.openModal("Please enter Username and Password",false);
      return;
    }
    if (this.submitted) {
      this.logser.getAllUsers().subscribe(
        (res: any[]) => {
          const user = res.find((a: any) => 
            a.Username === this.loginForm.value.username && 
            a.Password === this.loginForm.value.password
          );
    
          if (!user) {
            this.alertModal.openModal("Invalid Username/Password or Please Register If You are visiting For First Time", false);
            return;
          }
    
          // if (user.Password !== this.loginForm.value.password) {
          //   this.alertModal.openModal("Kindly Check your Credentials", false);
          //   return;
          // }
    
          this.setCurrentUser(user);
          this.loginForm.reset();
          this.userobj.login = '1';
    
          this.logser.updateloggeduser(this.userobj).subscribe(
            (data) => {
              this.userobj = data;
              this.navigateBasedOnRoleAndCity(user);
            },
            (error) => {
              this.alertModal.openModal("Something went wrong", false);
            }
          );
        },
        (err) => {
          this.alertModal.openModal("Something went wrong", false);
        }
      );
    }
    
 
  }
  private setCurrentUser(user: any): void {
    this.logser.currentuser.Username = user.Username;
    this.logser.currentuser.UserId = user.UserId;
    this.logser.currentuser.CityId = user.User_cityid;
    this.logser.currentuser.Role = user.Role;
  
    if (user.Role !== 'Governor') {
      this.logser.currentuser.wallet = user.wallet;
      this.logser.currentuser.cartId = user.cartId;
      this.logser.currentuser.gender = user.gender;
      this.logser.currentuser.avatar = user.avatar;
      this.logser.currentuser.login = user.login;
    }
  }
  
  private navigateBasedOnRoleAndCity(user: any): void {
    if (user.User_cityid == 0 && user.Role !== 'Governor') {
      this.router.navigate(["home"]);
    } else {
      if (user.Role === 'Governor') {
        this.router.navigate(["report"]);
      } else {
        this.switchYesOrNo = 0;
        this.sharedService.setSwitchYesOrNo(this.switchYesOrNo);
        this.router.navigate(["maincity"]);
      }
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
