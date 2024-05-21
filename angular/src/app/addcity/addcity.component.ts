import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.scss']
})
export class AddcityComponent implements OnInit {
  public addcityForm!: FormGroup;
  submitted = false;
  currentDate: any;
  currentTime: any;
  allcity = [];
  constructor(private formbuilder: FormBuilder, private modalService: NgbModal, private http: HttpClientModule, private router: Router, private logser: LoginserviceService, public datepipe: DatePipe) {
    this.currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.currentTime = this.datepipe.transform((new Date), 'hh:mm:ss')

  }

  assetData = {
    'AssetId': [
      'SB_B1idV_00001', 'SB_B1idV_00002', 'SB_B1idV_00003', 'SB_B1idV_00004', 'SB_B1idV_00005',
      'SB_UBidV_00001', 'SB_UBidV_00002', 'SB_UBidV_00003', 'SB_UBidV_00004', 'SB_UBidV_00005',
      'SB_B2idR_00001', 'SB_B2idR_00002', 'SB_B2idR_00003', 'SB_B2idR_00004', 'SB_B2idR_00005',
      'SB_B2idR_00006', 'SB_B2idR_00007', 'SB_B2idR_00008', 'SB_B2idR_00009', 'SB_B2idR_00010',
      'SB_B3idR_00001', 'SB_B3idR_00002', 'SB_B3idR_00003', 'SB_B3idR_00004', 'SB_B3idR_00005',
      'SB_UBidR_00001', 'SB_UBidR_00002', 'SB_UBidR_00003', 'SB_UBidR_00004', 'SB_UBidR_00005',
      'SB_UBidR_00006', 'SB_UBidR_00007', 'SB_UBidR_00008', 'SB_UBidR_00009', 'SB_UBidR_00010',
      'SB_UBidR_00011', 'SB_UBidR_00012', 'SB_UBidR_00013', 'SB_UBidR_00014', 'SB_UBidR_00015',
      'SB_B5idV_00001', 'SB_B5idV_00002', 'SB_B5idV_00003', 'SB_B5idV_00004', 'SB_B5idV_00005',
    ],

    'Bottle_Code': ['B1.V', 'B1.V', 'B1.V', 'B1.V', 'B1.V', 'UB.V', 'UB.V', 'UB.V', 'UB.V', 'UB.V',
      'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R', 'B2.R',
      'B3.R', 'B3.R', 'B3.R', 'B3.R', 'B3.R',
      'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R', 'UB.R',
      'B5.V', 'B5.V', 'B5.V', 'B5.V', 'B5.V'
    ],
    'Content_Code': ['B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny', 'B1.Shiny',
      'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky', 'B2.Spiky',
      'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy', 'B3.Bouncy',
      'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy', 'B4.Wavy',
      'B5.Silky', 'B5.Silky', 'B5.Silky', 'B5.Silky', 'B5.Silky',
    ],
    'Content_Price': ['300', '300', '300', '300', '300', '300', '300', '300', '300', '300',
      '200', '200', '200', '200', '200', '200', '200', '200', '200', '200',
      '250', '250', '250', '250', '250', '250', '250', '250', '250', '250',
      '275', '275', '275', '275', '275', '275', '275', '275', '275', '275',
      '350', '350', '350', '350', '350'],
    'Bottle_Price': ['18', '18', '18', '18', '18', '8', '8', '8', '8', '8',
      '10', '10', '10', '10', '10', '10', '10', '10', '10', '10',
      '11', '11', '11', '11', '11', '3', '3', '3', '3', '3',
      '3', '3', '3', '3', '3', '3', '3', '3', '3', '3',
      '19', '19', '19', '19', '19'],
    'Redeem_Good': ['1.8', '1.8', '1.8', '1.8', '1.8', '0.56', '0.56', '0.56', '0.56', '0.56',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1.32', '1.32', '1.32', '1.32', '1.32', '0.21', '0.21', '0.21', '0.21', '0.21',
      '0.21', '0.21', '0.21', '0.21', '0.21', '0.21', '0.21', '0.21', '0.21', '0.21',
      '2.28', '2.28', '2.28', '2.28', '2.28'],
    'Redeem_Damaged': ['0.9', '.9', '0.9', '0.9', '0.9', '0.28', '0.28', '0.28', '0.28', '0.28',
      '0.5', '0.5', '0.5', '0.5', '0.5', '0.5', '0.5', '0.5', '0.5', '0.5',
      '0.66', '0.66', '0.66', '0.66', '0.66', '0.105', '0.105', '0.105', '0.105', '0.105',
      '0.105', '0.105', '0.105', '0.105', '0.105', '0.105', '0.105', '0.105', '0.105', '0.105',
      '1.14', '1.14', '1.14', '1.14', '1.14'],
    'Discount_RefillB': ['1.8', '1.8', '1.8', '1.8', '1.8', '0.8', '0.8', '0.8', '0.8', '0.8',
      '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
      '1.1', '1.1', '1.1', '1.1', '1.1', '0.75', '0.75', '0.75', '0.75', '0.75',
      '0.75', '0.75', '0.75', '0.75', '0.75', '0.75', '0.75', '0.75', '0.75', '0.75',
      '1.9', '1.9', '1.9', '1.9', '1.9'],
    'Env_Tax': ['9', '9', '9', '9', '9', '2', '2', '2', '2', '2',
      '2.5', '2.5', '2.5', '2.5', '2.5', '2', '2', '2', '2', '2',
      '2.75', '2.75', '2.75', '2.75', '2.75', '0.75', '0.75', '0.75', '0.75', '0.75',
      '0.75', '0.75', '0.75', '0.75', '0.75', '0.6', '0.6', '0.6', '0.6', '0.6',
      '9.5', '9.5', '9.5', '9.5', '9.5'],
    'Discard_fine': ['9', '9', '9', '9', '9', '4', '4', '4', '4', '4',
      '5', '5', '5', '5', '5', '5', '5', '5', '5', '5',
      '5.5', '5.5', '5.5', '5.5', '5.5', '1.5', '1.5', '1.5', '1.5', '1.5',
      '1.5', '1.5', '1.5', '1.5', '1.5', '1.5', '1.5', '1.5', '1.5', '1.5',
      '9.5', '9.5', '9.5', '9.5', '9.5'],
    'Current_Refill_Count': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0],
    'Latest_Refill_Date': [
      '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023',
      '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '4/15/2023', '4/15/2023', '4/15/2023', '4/15/2023', '4/15/2023',
      '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023',
      '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '4/15/2023', '4/15/2023', '4/15/2023', '4/15/2023', '4/15/2023',
      '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023', '1/15/2023'],

  }
  Asset_CityId = '';
  CategoryCode = 'SB';
  Quantity = '500';
  Units = 'ml';
  Bottle_loc = 'Supermarket Shelf';
  Bottle_Status = 'Full';
  DOM = '1/1/2023';
  Max_Refill_Count = 5;

  assettableobj = {
    'AssetId': '',
    'Asset_CityId': '',
    'CategoryCode': '',
    'Bottle_Code': '',
    'Content_Code': '',
    'Quantity': '',
    'Units': '',
    'Bottle_loc': '',
    'Bottle_Status': '',
    'DOM': '',
    'Max_Refill_Count': 0,
    'Current_Refill_Count': 0,
    'Latest_Refill_Date': '',
    'Retirement_Date': '',
    'Retire_Reason': '',
    'Content_Price': '',
    'Bottle_Price': '',
    'Redeem_Good': '',
    'Redeem_Damaged': '',
    'Discount_RefillB': '',
    'Env_Tax': '',
    'Discard_fine': '',
    'Transaction_Id': '',
    'Transaction_Date': '',
    'Fromfacility': '',
    'Tofacility': ''
  }

  city = {
    'CityName': '',
    'MayorId': this.logser.currentuser.UserId,
    'Clocktickrate':1,
    'Citystartdate': '',
    'CityCreateTime': '',
    'Status': 'Yes',
    'cityavatar': '',
    'CurrentDay': 0,
    'CurrentTime': 0
  };
  userobj = {
    'cityid': '',
    'Role': 'Mayor'
  }

  firstfacility = {
    'CityId': '',
  }

  ngOnInit(): void {
    this.addcityForm = this.formbuilder.group({
      CityName: [''],
      Clocktickrate: [''],
      Citystartdate: [this.currentDate],
      CityCreateTime: [this.currentTime]
    })
    this.city.CityCreateTime = this.currentTime;
    this.city.Citystartdate = this.currentDate;
    if (this.logser.currentuser.Username == '') {
      this.router.navigate(["login"])
    }
    $("body").addClass('frontpage').removeClass('cartcontent');
  }
  selectcity(ind: any) {
    $(".city").css('border', '2px solid transparent');
    $(".city_" + ind).css('border', '2px solid #333');
  }
  selectedavatar = 0;
  userDetails = {
    'currentuser': '',
    'currentCartId': '',
    'CityId': '',
    'CurrentDay': ''

  }
  addcity() {
    this.submitted = true;
    if (this.addcityForm.invalid) {
      alert("invalid");
      return;
    }
    if (this.submitted) {
      if (this.selectedavatar == 0) {
        alert("kindly select your Avatar")
      }
      if (this.city.Clocktickrate == 0) {
        alert("kindly select your Avatar")
      }
      if(isNaN(this.city.Clocktickrate)){
        alert('Clock Tick rate is number.')
      }
      if(!isNaN(this.city.Clocktickrate) && this.selectedavatar!=0 && this.city.Clocktickrate>0) {
        this.city.cityavatar = String(this.selectedavatar);
        console.log(this.city)
        this.logser.createcity(this.city).subscribe(
          data => {
            this.city = data;
          },
          error => {
            console.log(error);
          }
        );
        setTimeout(() => {
          this.logser.getAllCities().subscribe((data) => {
            this.allcity = data;
            let length = this.allcity.length;
            this.userobj['cityid'] = length.toString();
            this.firstfacility['CityId'] = length.toString();
            this.logser.currentuser.Role = 'Mayor';
            this.logser.currentuser.CityId = length.toString();
            this.Asset_CityId = length.toString();
            this.logser.updateuser(this.userobj).subscribe(
              data => {
                this.userobj = data;

              },
              error => {
                console.log(error);
              }
            );
            this.userDetails.currentuser = this.logser.currentuser.Username;
            this.userDetails.CityId = this.logser.currentuser.CityId;
            this.userDetails.currentCartId = this.logser.currentuser.cartId;
            this.userDetails.CurrentDay = this.logser.currentuser.currentday.toString();
            console.log(this.userDetails)
            /*this.logser.sendUserDetails(this.userDetails).subscribe(
              response => {
                console.log('User details sent successfully');
              },
              error => {
                console.error('Error sending user details:', error);
              }
            );*/
            let count = 0;
            let numbers = Object.values(this.assetData);
            numbers[0].forEach((number) => {
              this.assettableobj['AssetId'] = this.Asset_CityId + "_" + number;
              this.assettableobj['Asset_CityId'] = this.Asset_CityId;
              this.assettableobj['CategoryCode'] = 'SB';
              this.assettableobj['Bottle_Code'] = this.assetData['Bottle_Code'][count];
              this.assettableobj['Content_Code'] = this.assetData['Content_Code'][count];
              this.assettableobj['Quantity'] = '500';
              this.assettableobj['Units'] = 'ml';
              this.assettableobj['Bottle_loc'] = 'Supermarket shelf';
              this.assettableobj['Bottle_Status'] = 'Full';
              this.assettableobj['DOM'] = '1/1/2023';
              this.assettableobj['Max_Refill_Count'] = 5;
              this.assettableobj['Current_Refill_Count'] = this.assetData['Current_Refill_Count'][count];
              this.assettableobj['Latest_Refill_Date'] = this.assetData['Latest_Refill_Date'][count];
              this.assettableobj['Content_Price'] = this.assetData['Content_Price'][count];
              this.assettableobj['Bottle_Price'] = this.assetData['Bottle_Price'][count];
              this.assettableobj['Redeem_Good'] = this.assetData['Redeem_Good'][count];
              this.assettableobj['Redeem_Damaged'] = this.assetData['Redeem_Damaged'][count];
              this.assettableobj['Discount_RefillB'] = this.assetData['Discount_RefillB'][count];
              this.assettableobj['Env_Tax'] = this.assetData['Env_Tax'][count];
              this.assettableobj['Discard_fine'] = this.assetData['Discard_fine'][count];
              count++;
              console.log("print");
         
              this.logser.createAsset(this.assettableobj).subscribe(
                data => {
                  this.assettableobj = data;
                },
                error => {
                  console.log(error);
                }
              );

            });

            this.logser.createfacility(this.firstfacility).subscribe(
              data => {
                this.firstfacility = data;
                this.router.navigate(["maincity"])
              },
              error => {
                console.log(error);
              }
            );
          })
        }, 200)
      }

    }
  }
  openwhyshorter(whyshorter: any) {
    this.modalService.open(whyshorter);
  }
  openaboutshorter(aboutshorter: any) {
    this.modalService.open(aboutshorter);
  }
  opennavshorter(navigation: any) {
    this.modalService.open(navigation);
  }
}
