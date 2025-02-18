import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../services/shared-service.service';
import { Subscription } from 'rxjs';
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
  switchYesOrNo!: number; // The variable is now a number
  private subscription!: Subscription;
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal, private sharedService: SharedServiceService) {
    this.currentrole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
    this.subscription = this.sharedService.switchYesOrNo$.subscribe(value => {
      this.switchYesOrNo = value;
    });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  currentwallet = 0.0;
  netrefund = 0.0;
  netfine = 0.0;
  currentusertransaction: any[] = [];
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
  showCityRuleComponent(option: any) {
     this.logser.toggleTimer(true).subscribe(
        response => {
          console.log('Timer paused updated:', response);
          this.router.navigate(['/cityrule'], { queryParams: { option: option } });
        },
        error => {
          console.error('Error updating timer:', error);
        }
      );
    
    
    // });

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
  cashflowdata: any[] = [];
  currentWalletMunis = 0.0
  earningFromSales = 0.0;
  DebitsInReturnConveyor = 0.0;
  DebitForReturningBottle = 0.0;
  calculateSums() {
    this.logser.getsupermarketcashbox('Municipality Office').subscribe(data => {
      this.currentWalletMunis = data[0]['Cashbox'];
    });
    this.logser.gettransactions().subscribe(data => {
      this.cashflowdata = [];
      if (this.cashflowdata.length == 0) {
        for (let t = 0; t < data.length; t++) {
          let getcityId = data[t]['TransactionId'].split("_")[0];
          let currentDummyRole = '';
          (this.logser.currentuser.Role == 'Mayor') ? currentDummyRole = "Municipality Office" : currentDummyRole = this.logser.currentuser.Role;
          if (getcityId == this.currentusercityId && (data[t]['CreditFacility'] == this.logser.currentuser.Role)) {
            this.cashflowdata.push(data[t]);
          }
        }
      }
      //console.log(this.cashflowdata)
      if (this.cashflowdata) {
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
  currentWalletsupermarket = 0.0;
  CreditFromRefillShampoo = 0.0;
  calculatesupermarketSums() {
    this.logser.getsupermarketcashbox('Supermarket Owner').subscribe(data => {
      this.currentWalletsupermarket = data[0]['Cashbox'];
    });
    this.logser.gettransactions().subscribe(data => {
      this.cashflowdata = [];
      if (this.cashflowdata.length == 0) {
        for (let t = 0; t < data.length; t++) {
          let getcityId = data[t]['TransactionId'].split("_")[0];
          if (getcityId == this.currentusercityId && (data[t]['CreditFacility'] == this.logser.currentuser.Role || data[t]['DebitFacility'] == 'Return Conveyor')) {
            this.cashflowdata.push(data[t]);
          }
        }
      }
      console.log(this.cashflowdata)
      if (this.cashflowdata) {
        const purchaseRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("Purchasing"));


        this.earningFromSales = purchaseRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);

        // Calculate and display matched Fine records
        const debitRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("returning"));


        this.DebitsInReturnConveyor = debitRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);


      }
    });


  }
  currentWalletReverseVending = 0.0;
  DebitForreverse = 0.0;
  calculatereverseSums() {
    this.logser.getsupermarketcashbox('Bottle Reverse Vending Machine Owner').subscribe(data => {
      console.log(data)
      this.currentWalletReverseVending = data[0]['Cashbox'];
    });
    this.logser.gettransactions().subscribe(data => {
      this.cashflowdata = [];
      if (this.cashflowdata.length == 0) {
        for (let t = 0; t < data.length; t++) {
          let getcityId = data[t]['TransactionId'].split("_")[0];
          if (getcityId == this.currentusercityId && (data[t]['DebitFacility'] == 'Bottle Reverse Vending Machine')) {
            this.cashflowdata.push(data[t]);
          }
        }
      }
      console.log(this.cashflowdata)
      if (this.cashflowdata) {
        const purchaseRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("returning Bottle"));


        this.DebitForReturningBottle = purchaseRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);



      }
    });


  }
  WalletUniversalManufacturing = 0.0;
  plasticRecyclicCashbox = 0.0;
  calculateUniversalManufacturingSums() {
    this.logser.getsupermarketcashbox('Universal Bottle Manufacturing Plant owner').subscribe(data => {
      console.log(data)
      this.WalletUniversalManufacturing = data[0]['Cashbox'];
    });
  }
  calPlasticRecyclingSums() {
    this.logser.getsupermarketcashbox('Plastic Recycling Plant Owner').subscribe(data => {
      console.log(data)
      this.plasticRecyclicCashbox = data[0]['Cashbox'];
    });
  }
  ubcpCashbox=0.0;
  calUBCPSum() {
    this.logser.getsupermarketcashbox('Universal Bottle Cleaning Plant Owner').subscribe(data => {
      console.log(data)
      this.ubcpCashbox = data[0]['Cashbox'];
    });
  }
  b4ShampooCashbox=0.0;
  b1ShampooCashbox=0.0;
  b2ShampooCashbox=0.0;
  b3ShampooCashbox=0.0;
  b5ShampooCashbox=0.0;
  calB4shampoo() {
    this.logser.getsupermarketcashbox('B4 Shampoo Producer').subscribe(data => {
      console.log(data)
      this.b4ShampooCashbox = data[0]['Cashbox'];
    });
  }
  calB1shampoo() {
    this.logser.getsupermarketcashbox('B1 Shampoo Producer').subscribe(data => {
      console.log(data)
      this.b1ShampooCashbox = data[0]['Cashbox'];
    });
  }
  calB2shampoo() {
    this.logser.getsupermarketcashbox('B2 Shampoo Producer').subscribe(data => {
      console.log(data)
      this.b2ShampooCashbox = data[0]['Cashbox'];
    });
  }
  calB3shampoo() {
    this.logser.getsupermarketcashbox('B3 Shampoo Producer').subscribe(data => {
      console.log(data)
      this.b3ShampooCashbox = data[0]['Cashbox'];
    });
  }
  calB5shampoo() {
    this.logser.getsupermarketcashbox('B5 Shampoo Producer').subscribe(data => {
      console.log(data)
      this.b5ShampooCashbox = data[0]['Cashbox'];
    });
  }
  currentWalletRefilling = 0.0;
  calculaterefillSums() {
    this.logser.getsupermarketcashbox('Shampoo Refilling Station Owner').subscribe(data => {
      console.log(data)
      this.currentWalletRefilling = data[0]['Cashbox'];
    });
    this.logser.gettransactions().subscribe(data => {
      this.cashflowdata = [];
      if (this.cashflowdata.length == 0) {
        for (let t = 0; t < data.length; t++) {
          let getcityId = data[t]['TransactionId'].split("_")[0];
          if (getcityId == this.currentusercityId && (data[t]['CreditFacility'] == 'Shampoo Refilling Station Owner')) {
            this.cashflowdata.push(data[t]);
          }
        }
      }
      console.log(this.cashflowdata)
      if (this.cashflowdata) {
        const purchaseRecords = this.cashflowdata
          .filter(record => record.Purpose.includes("Refilling"));


        this.CreditFromRefillShampoo = purchaseRecords
          .reduce((sum, record) => sum + parseFloat(record.Amount), 0);



      }
    });


  }

  onMenuItemClick() {
    const newValue = 1;  // Set this to the appropriate number value based on your logic

    if (this.switchYesOrNo === 0) {
      this.switchYesOrNo = 2;
    } else if (this.switchYesOrNo === 2) {
      this.switchYesOrNo = 0;
    }

    this.sharedService.setSwitchYesOrNo(this.switchYesOrNo);

  }


  openAuditPlasticVideoModal(): void {
    this.sharedService.open_Audit_plastic_Video();
  }
  openAuditBottleCleaningVideoModal(): void {
    this.sharedService.open_Audit_bottleCleaning_Video();
  }
  rungarbagetruck(): void {
    this.sharedService.rungarbagetruck();
  }
}


