import { Injectable } from '@angular/core';
import { LoginserviceService } from './loginservice.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  currentrole = "";
  constructor(private logser: LoginserviceService) {
    this.currentrole = this.logser.currentuser.Role;


  }
  private switchYesOrNoSource = new BehaviorSubject<number>(0); // default value is 0

  // Exposing the observable for subscription
  switchYesOrNo$ = this.switchYesOrNoSource.asObservable();



  // Method to update the switchYesOrNo value
  setSwitchYesOrNo(value: number) {
    this.switchYesOrNoSource.next(value);
  }



}


