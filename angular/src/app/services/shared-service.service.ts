import { Injectable } from '@angular/core';
import { LoginserviceService } from './loginservice.service';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private auditPlasticVideoModalSubject = new Subject<void>();
  auditPlasticVideoModal$ = this.auditPlasticVideoModalSubject.asObservable();
  private auditBottleCleaningVideoModalSubject = new Subject<void>();
  auditBottleCleaningVideoModal$ = this.auditBottleCleaningVideoModalSubject.asObservable();
  private rungarbagetruckSubject = new Subject<void>();
  rungarbagetruck$ = this.rungarbagetruckSubject.asObservable();
  private openModalSource = new Subject<void>();
  openModal$ = this.openModalSource.asObservable();
  private switchYesOrNoSource = new BehaviorSubject<number>(0);
  switchYesOrNo$ = this.switchYesOrNoSource.asObservable();
  currentrole = "";
  constructor(private logser: LoginserviceService) {
    this.currentrole = this.logser.currentuser.Role;
  }

  setSwitchYesOrNo(value: number) {
    this.switchYesOrNoSource.next(value);
  }

  open_Audit_bottleCleaning_Video() {
    this.auditBottleCleaningVideoModalSubject.next();
  }

  open_Audit_plastic_Video(): void {
    this.auditPlasticVideoModalSubject.next();
  }
  rungarbagetruck(): void {
    this.rungarbagetruckSubject.next();
  }

}


