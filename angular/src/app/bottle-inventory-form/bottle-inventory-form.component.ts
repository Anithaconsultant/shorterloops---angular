import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from './../services/loginservice.service';
import { BASE_ASSET } from '../constants/asset-base';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { data, get } from 'jquery';

@Component({
  selector: 'app-bottle-inventory-form',
  templateUrl: './bottle-inventory-form.component.html',
  styleUrls: ['./bottle-inventory-form.component.scss']
})
export class BottleInventoryFormComponent implements OnInit {
  inventoryForm!: FormGroup;
  currentUser: any;
  bottleTypes = [
    { value: 'BVB', label: 'BVB' },
    { value: 'BRCB', label: 'BRCB' },
    { value: 'BRFB', label: 'BRFB' },
    { value: 'UVB', label: 'UVB' },
    { value: 'URCB', label: 'URCB' },
    { value: 'URFB', label: 'URFB' }
  ];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginserviceService,
    private router: Router
  ) {
    this.createForm();
  }
  @ViewChild('alertModal') alertModal!: AlertModalComponent;
  citySummary: any = {};
  totalByProducer: any;
  allAssets: any = [];
  producerCode = '';
  selectedBottleType = '';
  cityId = '';
  currentRole = '';

  ngOnInit(): void {
    this.currentUser = this.loginService.currentuser;
    this.cityId = this.loginService.currentuser.CityId;
    this.currentRole = this.loginService.currentuser.Role;
    console.log(this.producerCode, this.currentUser.Role);
    if (this.currentRole.split(' ')[0].includes('B1')) {
      this.producerCode = "Shiny";
    }
    else if (this.currentRole.split(' ')[0].includes('B2')) {
      this.producerCode = "Spiky";
    }
    else if (this.currentRole.split(' ')[0].includes('B3')) {
      this.producerCode = "Bouncy";
    }
    else if (this.currentRole.split(' ')[0].includes('B5')) {
      this.producerCode = "Silky";
    }
    else if (this.currentRole.split(' ')[0].includes('B4')) {
      this.producerCode = "Wavy";
    }
    console.log(this.producerCode);
    this.inventoryForm.patchValue({
      producer: this.currentUser.username
    });
    if (this.loginService.currentuser.Username && this.loginService.currentuser.CityId) {
      this.loginService.getAllAssets().subscribe((data) => {
        this.allAssets = data;
        console.log(this.allAssets);
      });
    }
    else {
      this.router.navigate(['/login']);
    }

  }


  currentCycleNumber: number = 0;
  createForm(): void {
    // console.log(this.currentCycleNumber, ' currentcycle ', Math.floor(this.loginService.currentuser.currentday ));
    this.currentCycleNumber = Math.floor(this.loginService.currentuser.currentday / 90);

    this.inventoryForm = this.fb.group({

      bottle_type: ['', Validators.required],
      cycle_number: [this.currentCycleNumber + 1, [Validators.required, Validators.min(1)]],
      previous_cycle_number: [this.currentCycleNumber, [Validators.required, Validators.min(0)]],
      current_total_stock: [0, [Validators.required, Validators.min(0)]],
      bottles_sold_to_supermarket_prev_cycle: [0, [Validators.required, Validators.min(0)]],
      bottles_bought_by_consumers: [0, [Validators.required, Validators.min(0)]],
      bottles_returned_good: [0, [Validators.required, Validators.min(0)]],
      bottles_returned_damaged: [0, [Validators.required, Validators.min(0)]],
      manufacturing_day: [this.loginService.currentuser.currentday, Validators.min(1)],
      content_price_per_ml: [null, Validators.min(0)],
      bottle_price: [null, Validators.min(0)],
      total_mrp: [null, Validators.min(0)],
      max_refill_count: [10, [Validators.required, Validators.min(1)]],
      redeem_value_good: [null, Validators.min(0)],
      redeem_value_damaged: [null, Validators.min(0)],
      supermarket_commission_percent: [null, [Validators.min(0), Validators.max(100)]],
      consumer_discount_percent: [null, [Validators.min(0), Validators.max(100)]],
      bottles_to_produce: [0, [Validators.required, Validators.min(0)]],
      bottles_to_sell_to_supermarket: [0, [Validators.required, Validators.min(0)]],
      Bottle_CityId: [this.loginService.currentuser.CityId || '', Validators.required]

    });
  }
  currentlySelectedBrandBottles: any = [];


  getBottleCodeFromCategory(
    category: string,
    producer: string,
  ): string | null {
    category = category.toLowerCase();
    if (category === "bvb") {
      return `${producer}.V`;
    } else if (category === "uvb") {
      return "UB.V";
    } else if (category === "brcb" || category === "brfb") {

      console.log(`${producer}.R`);
      return `${producer}.R`;

    } else if (category === "urcb" || category === "urfb") {

      return "UB.R";

    } else {
      return null;
    }
  }
  customerpurchased: number = 0;
  returnedGood: number = 0;
  returnedDamaged: number = 0;
  available_Bottles_In_City: string = '';
  getDataFromServer(value: string): void {
    console.log(value)
    this.currentlySelectedBrandBottles = [];
    this.customerpurchased = 0;
    this.returnedGood = 0;
    this.returnedDamaged = 0;


    for (let r = 0; r < this.allAssets.length; r++) {
      let getBottleCode = this.getBottleCodeFromCategory(value, this.loginService.currentuser.Role.split(' ')[0])
      if (this.allAssets[r]['Bottle_Code'] === getBottleCode && getBottleCode !== null) {
        this.currentlySelectedBrandBottles.push(this.allAssets[r]);
      }
      else if (getBottleCode === null) {
        break;
      }
    }
    this.available_Bottles_In_City = this.currentlySelectedBrandBottles.length;
    if (this.currentlySelectedBrandBottles.length > 0) {
      for (let y = 0; y < this.currentlySelectedBrandBottles.length; y++) {
        if (this.currentlySelectedBrandBottles[y]['purchased'] == 1 && Math.floor(this.currentlySelectedBrandBottles[y]['Transaction_Id'].split('_')[1] / 90) == this.currentCycleNumber) {
          this.customerpurchased++;

          if (this.currentlySelectedBrandBottles[y]['Bottle_Status'] == "Empty-Dirty" && this.currentlySelectedBrandBottles[y]['Bottle_loc'] == "Return Conveyor" || this.currentlySelectedBrandBottles[y]['Bottle_loc'] == "Reverse Vending Machine") {
            this.returnedGood++;
          }

          if (this.currentlySelectedBrandBottles[y]['Bottle_Status'] == "Damaged-Empty" && this.currentlySelectedBrandBottles[y]['Bottle_loc'] == "Return Conveyor" || this.currentlySelectedBrandBottles[y]['Bottle_loc'] == "Reverse Vending Machine") {
            this.returnedDamaged++;
          }
        }

      }
    }

    this.inventoryForm.patchValue({
      bottles_bought_by_consumers: this.customerpurchased,
      bottles_sold_to_supermarket_prev_cycle: this.currentlySelectedBrandBottles.length,
      bottles_returned_good: this.returnedGood,
      bottles_returned_damaged: this.returnedDamaged,
    });
  }
  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      console.warn('🚫 Cannot submit, form invalid.');
      this.inventoryForm.markAllAsTouched();
      this.showFormErrors();
      return;
    }

    console.log('✅ Form Submitted!', this.inventoryForm.value);

    this.loginService.createInventory(
      this.producerCode,
      this.inventoryForm.value.bottle_type,
      this.cityId,
      this.inventoryForm.value
    ).subscribe({
      next: (response) => {
        console.log('✅ Inventory created successfully', response);
        this.selectedBottleType = this.inventoryForm.value.bottle_type;
        this.extractedBottleCode = this.getBottleCodeFromCategory(this.selectedBottleType, this.loginService.currentuser.Role.split(' ')[0]) || '';
        this.alertModal.openModal('Order Placed Successfully!');
        for (let i = 0; i < this.inventoryForm.value.bottles_to_produce; i++) {
          console.log(i, this.inventoryForm.value.bottles_to_produce, this.inventoryForm.value.bottles_to_sell_to_supermarket);
          if (i < (this.inventoryForm.value.bottles_to_sell_to_supermarket - 1)) {
            this.generatebottles('Supermarket', i + 1);
          }
          else {
            this.generatebottles(this.producerCode + "_Plant", i + 1);
          }
          // Fetch the last serial after creation
        }

        setTimeout(() => {
          this.resetFormToDefaults();
        }, 1000);

      },

      error: (error) => {
        console.error('❌ Error creating inventory:', error);

        // --- Friendly Alerts Based on Error Type ---
        if (error.status === 409) {
          alert('⚠️ Record already exists for this cycle, bottle type, and city.');
        }
        else if (error.status === 400 && error.error?.non_field_errors) {
          alert('⚠️ ' + error.error.non_field_errors[0]);
        }
        else if (error.status === 400 && typeof error.error === 'object') {
          const errorKeys = Object.keys(error.error);
          if (errorKeys.length > 0) {
            const key = errorKeys[0];
            alert(`⚠️ ${key}: ${error.error[key]}`);
          } else {
            alert('⚠️ Validation failed. Please check your input.');
          }
        }
        else if (error.status === 404) {
          alert('❗ Requested data not found on the server.');
        }
        else if (error.status === 500) {
          alert('🚨 Server error occurred. Please try again later.');
        }
        else {
          alert('❌ Unexpected error: ' + (error.message || 'Please check console.'));
        }
      },

      complete: () => {
        console.log('✅ Inventory request completed.');
      }
    });
  }

resetFormToDefaults(): void {
  this.currentCycleNumber = Math.floor(this.loginService.currentuser.currentday / 90);

  this.inventoryForm.reset({
    bottle_type: '',
    cycle_number: this.currentCycleNumber + 1,
    previous_cycle_number: this.currentCycleNumber,
    current_total_stock: 0,
    bottles_sold_to_supermarket_prev_cycle: 0,
    bottles_bought_by_consumers: 0,
    bottles_returned_good: 0,
    bottles_returned_damaged: 0,
    manufacturing_day: this.loginService.currentuser.currentday,
    content_price_per_ml: null,
    bottle_price: null,
    total_mrp: null,
    max_refill_count: 10,
    redeem_value_good: null,
    redeem_value_damaged: null,
    supermarket_commission_percent: null,
    consumer_discount_percent: null,
    bottles_to_produce: 0,
    bottles_to_sell_to_supermarket: 0,
    Bottle_CityId: this.cityId,
    producer: this.currentUser.username
  });

  this.selectedBottleType = '';
  this.customerpurchased = 0;
  this.returnedGood = 0;
  this.returnedDamaged = 0;
  this.currentlySelectedBrandBottles = [];
  this.available_Bottles_In_City = '';

  console.log('✅ Form has been reset to default values');
}

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.inventoryForm.get(controlName);
    return control ? control.hasError(errorCode) && (control.dirty || control.touched) : false;
  }
  userobj = {
    'login': '1'
  }
  gotocity() {
    this.router.navigate(["maincity"]);
  }
  showFormErrors(): void {
    if (!this.inventoryForm) return;
    console.warn('⚠️ Form is invalid. Details:');
    Object.keys(this.inventoryForm.controls).forEach(key => {
      const control = this.inventoryForm.get(key);
      if (control && control.invalid) {
        console.warn(
          `❌ ${key} =>`,
          control.errors,
          `| Current value: ${control.value}`
        );
      }
    });
  }
  extractedBottleCode: string = '';
  generatebottles(bottleloc: string, i: number): void {
    const newAsset = { ...BASE_ASSET };

    console.log(this.extractedBottleCode);

    newAsset.Bottle_Code = this.extractedBottleCode;
    newAsset.Content_Code = this.extractedBottleCode.split(".")[0] + '.' + this.producerCode;
    newAsset.Current_Content_Code = this.extractedBottleCode.split(".")[0] + '.' + this.producerCode;
    newAsset.Content_Price = this.inventoryForm.value.content_price_per_ml;
    newAsset.Bottle_Price = this.inventoryForm.value.bottle_price;
    newAsset.Redeem_Good = this.inventoryForm.value.redeem_value_good;
    newAsset.Redeem_Damaged = this.inventoryForm.value.redeem_value_damaged;
    newAsset.Discount_RefillB = this.inventoryForm.value.consumer_discount_percent;
    newAsset.Env_Tax_Customer = 5;
    newAsset.Env_Tax_Producer = 3;
    newAsset.Env_Tax_Retailer = 2;
    newAsset.Discard_fine = 20;
    newAsset.Current_SelfRefill_Count = 0;
    newAsset.CategoryCode = 'SB';
    newAsset.Asset_CityId = this.cityId;

    newAsset.Bottle_loc = bottleloc;
    if (this.selectedBottleType === 'BRFB' || this.selectedBottleType === 'URFB') {
      newAsset.Current_PlantRefill_Count = 1;
    } else {
      newAsset.Current_PlantRefill_Count = 0;
    }

    newAsset.Latest_Refill_Date = '';
    let newId = this.available_Bottles_In_City + i;
    const newAssetId = `${this.cityId}_SB_${newAsset.Bottle_Code.split(".")[0]}id${newAsset.Bottle_Code.split(".")[1]}_${(newId).toString().padStart(5, '0')}`;
    newAsset.AssetId = newAssetId;
    console.log('Generating new asset with ID:', newAssetId, newAsset);

    const payload = { ...newAsset };
    this.loginService.createAsset(payload).subscribe({
      next: (response) => {
        console.log('✅ Asset created successfully', response);
        // Update local list

      },
      error: (error) => {
        console.error('❌ Error creating asset:', error);
      }
    });
  }



}