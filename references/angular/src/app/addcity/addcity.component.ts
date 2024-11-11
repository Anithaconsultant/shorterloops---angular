import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Asset {
  Bottle_Code: string;
  Content_Code: string;
  Content_Price: string;
  Bottle_Price: string;
  Redeem_Good: string;
  Redeem_Damaged: string;
  Discount_RefillB: string;
  Env_Tax: string;
  Discard_fine: string;
  Current_Refill_Count: number;
  Latest_Refill_Date: string;
}

interface AssetData {
  [key: string]: Asset; // This allows any string key to index into an Asset object
}

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


  assetData: AssetData ={
    'SB_B1idV_00001': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00002': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00003': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00004': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00005': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00006': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00007': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00008': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00009': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B1idV_00010': {
        'Bottle_Code': 'B1.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '18',
        'Redeem_Good': '1.8',
        'Redeem_Damaged': '0.9',
        'Discount_RefillB': '1.8',
        'Env_Tax': '9',
        'Discard_fine': '9',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00001': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00002': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00003': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00004': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00005': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00006': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00007': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00008': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00009': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidV_00010': {
        'Bottle_Code': 'UB.V',
        'Content_Code': 'B1.Shiny',
        'Content_Price': '300',
        'Bottle_Price': '8',
        'Redeem_Good': '0.56',
        'Redeem_Damaged': '0.28',
        'Discount_RefillB': '0.8',
        'Env_Tax': '2',
        'Discard_fine': '4',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00001': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00002': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00003': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00004': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00005': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    
    'SB_B2idR_00006': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00007': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00008': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00009': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00010': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2.5',
        'Discard_fine': '5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B2idR_00011': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2',
        'Discard_fine': '5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_B2idR_00012': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2',
        'Discard_fine': '5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_B2idR_00013': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2',
        'Discard_fine': '5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_B2idR_00014': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2',
        'Discard_fine': '5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_B2idR_00015': {
        'Bottle_Code': 'B2.R',
        'Content_Code': 'B2.Spiky',
        'Content_Price': '200',
        'Bottle_Price': '10',
        'Redeem_Good': '1',
        'Redeem_Damaged': '0.5',
        'Discount_RefillB': '1',
        'Env_Tax': '2',
        'Discard_fine': '5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    
    'SB_B2idR_00016': {
      'Bottle_Code': 'B2.R',
      'Content_Code': 'B2.Spiky',
      'Content_Price': '200',
      'Bottle_Price': '10',
      'Redeem_Good': '1',
      'Redeem_Damaged': '0.5',
      'Discount_RefillB': '1',
      'Env_Tax': '2',
      'Discard_fine': '5',
      'Current_Refill_Count': 1,
      'Latest_Refill_Date': '4/15/2023'
  },
  'SB_B2idR_00017': {
      'Bottle_Code': 'B2.R',
      'Content_Code': 'B2.Spiky',
      'Content_Price': '200',
      'Bottle_Price': '10',
      'Redeem_Good': '1',
      'Redeem_Damaged': '0.5',
      'Discount_RefillB': '1',
      'Env_Tax': '2',
      'Discard_fine': '5',
      'Current_Refill_Count': 1,
      'Latest_Refill_Date': '4/15/2023'
  },
  'SB_B2idR_00018': {
      'Bottle_Code': 'B2.R',
      'Content_Code': 'B2.Spiky',
      'Content_Price': '200',
      'Bottle_Price': '10',
      'Redeem_Good': '1',
      'Redeem_Damaged': '0.5',
      'Discount_RefillB': '1',
      'Env_Tax': '2',
      'Discard_fine': '5',
      'Current_Refill_Count': 1,
      'Latest_Refill_Date': '4/15/2023'
  },
  'SB_B2idR_00019': {
      'Bottle_Code': 'B2.R',
      'Content_Code': 'B2.Spiky',
      'Content_Price': '200',
      'Bottle_Price': '10',
      'Redeem_Good': '1',
      'Redeem_Damaged': '0.5',
      'Discount_RefillB': '1',
      'Env_Tax': '2',
      'Discard_fine': '5',
      'Current_Refill_Count': 1,
      'Latest_Refill_Date': '4/15/2023'
  },
  'SB_B2idR_00020': {
      'Bottle_Code': 'B2.R',
      'Content_Code': 'B2.Spiky',
      'Content_Price': '200',
      'Bottle_Price': '10',
      'Redeem_Good': '1',
      'Redeem_Damaged': '0.5',
      'Discount_RefillB': '1',
      'Env_Tax': '2',
      'Discard_fine': '5',
      'Current_Refill_Count': 1,
      'Latest_Refill_Date': '4/15/2023'
  },
    'SB_B3idR_00001': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00002': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00003': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00004': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00005': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00006': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00007': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00008': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00009': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B3idR_00010': {
        'Bottle_Code': 'B3.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '11',
        'Redeem_Good': '1.32',
        'Redeem_Damaged': '0.66',
        'Discount_RefillB': '1.1',
        'Env_Tax': '2.75',
        'Discard_fine': '5.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00001': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00002': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00003': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00004': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00005': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00006': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00007': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00008': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00009': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00010': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B3.Bouncy',
        'Content_Price': '250',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00011': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00012': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00013': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00014': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00015': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00016': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00017': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00018': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00019': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00020': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.75',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_UBidR_00021': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00022': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00023': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00024': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00025': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00026': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00027': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00028': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00029': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_UBidR_00030': {
        'Bottle_Code': 'UB.R',
        'Content_Code': 'B4.Wavy',
        'Content_Price': '275',
        'Bottle_Price': '3',
        'Redeem_Good': '0.21',
        'Redeem_Damaged': '0.105',
        'Discount_RefillB': '0.75',
        'Env_Tax': '0.6',
        'Discard_fine': '1.5',
        'Current_Refill_Count': 1,
        'Latest_Refill_Date': '4/15/2023'
    },
    'SB_B5idV_00001': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00002': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00003': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00004': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00005': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00006': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00007': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00008': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00009': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    },
    'SB_B5idV_00010': {
        'Bottle_Code': 'B5.V',
        'Content_Code': 'B5.Silky',
        'Content_Price': '350',
        'Bottle_Price': '19',
        'Redeem_Good': '2.28',
        'Redeem_Damaged': '1.14',
        'Discount_RefillB': '1.9',
        'Env_Tax': '9.5',
        'Discard_fine': '9.5',
        'Current_Refill_Count': 0,
        'Latest_Refill_Date': ''
    }
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
    'CategoryCode': 'SB',
    'Bottle_Code': '',
    'Content_Code': '',
    'Current_Content_Code': '',
    'Quantity': '500',
    'remQuantity': '500',
    'Units': 'ml',
    'Bottle_loc': 'Supermarket shelf',
    'Bottle_Status': 'Full',
    'DOM': '1/1/2023',
    'Max_Refill_Count': 5,
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
    'Clocktickrate': '',
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
      
      const length = Object.keys(this.assetData).length;
      console.log(length);  
      

      if (this.selectedavatar == 0) {
        alert("kindly select your Avatar")
      }
     
     else if (isNaN(parseInt(this.city.Clocktickrate))) {
        alert('Clock Tick rate is number.')
      }
      else if (!isNaN(parseInt(this.city.Clocktickrate)) && this.selectedavatar != 0 && parseInt(this.city.Clocktickrate) > 0) {
        this.city.cityavatar = String(this.selectedavatar);
        $(".maskholder").show();
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
            let count = 0;

            let assetIds = Object.keys(this.assetData); // Get the keys of the assetData object

            // Loop through each asset ID in the assetData object
            assetIds.forEach((assetId, count) => {
              const asset = this.assetData[assetId]; // Get the asset data for the current assetId
            
              // Prepare the assettableobj with the data
              this.assettableobj['AssetId'] = this.Asset_CityId + "_" + assetId; // Extract the numeric part from assetId
              this.assettableobj['Asset_CityId'] = this.Asset_CityId;
              this.assettableobj['Bottle_Code'] = asset['Bottle_Code'];
              this.assettableobj['Content_Code'] = asset['Content_Code'];
              this.assettableobj['Current_Content_Code'] = asset['Content_Code'];
              this.assettableobj['Current_Refill_Count'] = asset['Current_Refill_Count'];
              this.assettableobj['Latest_Refill_Date'] = asset['Latest_Refill_Date'];
              this.assettableobj['Content_Price'] = asset['Content_Price'];
              this.assettableobj['Bottle_Price'] = asset['Bottle_Price'];
              this.assettableobj['Redeem_Good'] = asset['Redeem_Good'];
              this.assettableobj['Redeem_Damaged'] = asset['Redeem_Damaged'];
              this.assettableobj['Discount_RefillB'] = asset['Discount_RefillB'];
              this.assettableobj['Env_Tax'] = asset['Env_Tax'];
              this.assettableobj['Discard_fine'] = asset['Discard_fine'];
            
              // Call the service to create the asset
              this.logser.createAsset(this.assettableobj).subscribe(
                data => {
                  this.assettableobj = data;
                  console.log("From addCity");
                  console.log(this.assettableobj);
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
    this.modalService.open(whyshorter,{windowClass:'frontpage'});
  }
  openaboutshorter(aboutshorter: any) {
    this.modalService.open(aboutshorter,{windowClass:'frontpage'});
  }
  opennavshorter(navigation: any) {
    this.modalService.open(navigation,{windowClass:'frontpage'});
  }
}
