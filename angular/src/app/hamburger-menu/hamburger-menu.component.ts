import { Component } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {
  menuOpen = false;
  currentUserCartId = '';
  currentUserId = 0;
  currentUserRole = '';
  currentusername = '';
  currentusergender = '';
  currentuseravatar = '';
  currentusercityId = '';
  switchyesorno=0;
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal, private shared: SharedServiceService) {
    this.currentrole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
    this.switchyesorno=this.shared.switchyesorno;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  currentrole = "";
  userobj = {
    'login': '1'
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

  callswitchcustomerrole() {
    this.shared.switchcustomerrole();
  }
}
