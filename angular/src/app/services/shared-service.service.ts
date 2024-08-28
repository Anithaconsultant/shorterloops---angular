import { Injectable } from '@angular/core';
import { LoginserviceService } from './loginservice.service';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  switchyesorno = 0;
  currentrole = "";
  constructor(private logser: LoginserviceService) {
    this.currentrole = this.logser.currentuser.Role;
  }
  switchcustomerrole() {
    if (this.currentrole == 'Mayor' && this.switchyesorno == 1) {
      this.switchyesorno = 2;
      // this.dopanzoom(-3341, -2150, '1');
      $(".cart").hide();
    }
    else {
      this.initialstate();
      $(".cart").show();
    }
  }
  initialstate() {
    let that =this;

      if (that.currentrole == 'Mayor') {
        that.switchyesorno = 1;
      }
      else if (that.currentrole.includes('House')) {
        that.switchyesorno = 0;
      }
      else {
        that.switchyesorno = 2;
      }
    
  }

}


