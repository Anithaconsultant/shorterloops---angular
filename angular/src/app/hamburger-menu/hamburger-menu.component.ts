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
  currentwallet=0.0;
  netrefund=0.0;
  netfine=0.0;
  currentusertransaction:any[]=[];
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
  showCityRuleComponent() {
    this.logser.pauseTimer().subscribe(response => {
      //console.log('Timer paused:', response);
      this.router.navigate(['/cityrule']);
    });

  }

  openaboutshorter(aboutshorter: any) {
    this.modalService.open(aboutshorter, { windowClass: "frontpage" });
  }
  opennavshorter(navigation: any) {
    this.modalService.open(navigation, { windowClass: "frontpage" });
  }

  openCashbox(cashBox: any) {
    this.modalService.open(cashBox, { windowClass: "cartcontent" });
  }
  openCashboxLedger(legderBook: any) {
    this.modalService.open(legderBook, { windowClass: "cartcontent" });
  }

  fineTotal = 0.0;
  environmentTaxTotal = 0.0;
  cashflowdata:any[]=[];
  currentWalletMunis = 0.0

  calculateSums() {
    this.logser.getcashboxmunicipality().subscribe(data => {
      this.currentWalletMunis=data[0]['Cashbox'] ;
      });
    this.logser.gettransactions().subscribe(data => {
      this.cashflowdata = [];
      if (this.cashflowdata.length == 0) {
        for (let t = 0; t < data.length; t++) {
          let getcityId = data[t]['TransactionId'].split("_")[0];

          if (getcityId == this.currentusercityId && ( data[t]['CreditFacility'] == 'Municipality Office')) {
            this.cashflowdata.push(data[t]);
          }
        }
      }
      //console.log(this.cashflowdata)
      if(this.cashflowdata){
          const environmentTaxRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("Environment tax"));

         
          this.environmentTaxTotal = environmentTaxRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);

          // Calculate and display matched Fine records
          const fineRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("Fine for Throwing Bottle"));

          
          this.fineTotal = fineRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);

        
      }
    });


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


 