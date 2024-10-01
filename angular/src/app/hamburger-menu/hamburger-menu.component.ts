import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  menuOpen = false;
  currentUserCartId = '';
  currentUserId = 0;
  currentUserRole = '';
  currentusername = '';
  currentusergender = '';
  currentuseravatar = '';
  currentusercityId = '';
  switchyesorno = 1;
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal, private sharedService: SharedServiceService) {
    this.currentrole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  currentrole = "";
  userobj = {
    'login': '1'
  }
  ngOnInit(): void {

  }
  closeMenu() {
    this.menuOpen = false;
  }
  showNewComponent() {
    // Navigate to the new component route
    this.router.navigate(['/report']);
  }

  openaboutshorter(aboutshorter: any) {
    this.modalService.open(aboutshorter, { windowClass: "frontpage" });
  }
  opennavshorter(navigation: any) {
    this.modalService.open(navigation, { windowClass: "frontpage" });
  }


  onMenuItemClick() {
    const newValue = 1;  // Set this to the appropriate number value based on your logic
    
    if (this.currentrole == 'Mayor' && this.switchyesorno == 1) {
      this.switchyesorno = 2;
    }
    else if (this.currentrole == 'Mayor' && this.switchyesorno ==2 ) {
      this.switchyesorno = 1;
    }
    

    this.sharedService.setSwitchYesOrNo( this.switchyesorno);

    }
  }


  // setTimeout(() => {
      
  //   if (that.logser.currentuser.Role == 'Mayor') {
  //     that.switchYesOrNo = 1;
  //   }
  //   else if (that.currentrole.includes('House')) {
  //     that.switchYesOrNo = 0;
  //   }
  //   else {
  //     that.switchYesOrNo = 2;
  //   }
  //  this.sharedService.setSwitchYesOrNo(this.switchYesOrNo);
  // }, 2000)