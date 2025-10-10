import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from './../services/loginservice.service';

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
    private router: Router,
  ) {
    this.createForm();
  }
  citySummary: any = {};
  totalByProducer: any;
  allAssets: any = [];
  producerCode = '';
  selectedBottleType = '';
  cityId = '';

  ngOnInit(): void {
    this.currentUser = this.loginService.currentuser;
    this.cityId = this.loginService.currentuser.CityId;
    console.log(this.producerCode, this.currentUser.Role);
    if (this.loginService.currentuser.Role.split(' ')[0].includes('B1')) {
      this.producerCode = "Shiny";
    }
    else if (this.loginService.currentuser.Role.split(' ')[0].includes('B2')) {
      this.producerCode = "Spiky";
    }
    else if (this.loginService.currentuser.Role.split(' ')[0].includes('B3')) {
      this.producerCode = "Bouncy";
    }
    else if (this.loginService.currentuser.Role.split(' ')[0].includes('B5')) {
      this.producerCode = "Silky";
    }
    else if (this.loginService.currentuser.Role.split(' ')[0].includes('B4')) {
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
    console.log(Math.floor(this.loginService.currentuser.currentday / 90));
    this.currentCycleNumber = Math.floor(this.loginService.currentuser.currentday / 90);
    this.inventoryForm = this.fb.group({

      bottle_type: ['', Validators.required],
      cycle_number: [this.currentCycleNumber, [Validators.required, Validators.min(1)]],
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
    plantRefillCount: number
  ): string | null {
    category = category.toLowerCase();
    console.log(category, producer, plantRefillCount)
    if (category === "bvb") {
      return `${producer}.V`;
    } else if (category === "uvb") {
      return "UB.V";
    } else if (category === "brcb" || category === "brfb") {
      console.log('brcb');
      if ((category === "brfb" && plantRefillCount > 0) ||
        (category === "brcb" && plantRefillCount === 0)) {
        console.log(`${producer}.R`);
        return `${producer}.R`;
      } else {
        return null;
      }
    } else if (category === "urcb" || category === "urfb") {
      if ((category === "urfb" && plantRefillCount > 0) ||
        (category === "urcb" && plantRefillCount === 0)) {
        return "UB.R";
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  customerpurchased: number = 0;
  returnedGood: number = 0;
  returnedDamaged: number = 0;
  getDataFromServer(value: string): void {
    console.log(value)
    this.currentlySelectedBrandBottles = [];
    this.customerpurchased = 0;
    this.returnedGood = 0;
    this.returnedDamaged = 0;


    for (let r = 0; r < this.allAssets.length; r++) {
      let extractedBottleCode = this.getBottleCodeFromCategory(value, this.loginService.currentuser.Role.split(' ')[0], this.allAssets[r]['Current_PlantRefill_Count'])
      console.log(extractedBottleCode);
      if (this.allAssets[r]['Bottle_Code'] === extractedBottleCode) {
        this.currentlySelectedBrandBottles.push(this.allAssets[r]);
      }
    }
    for (let y = 0; y < this.currentlySelectedBrandBottles.length; y++) {
      console.log(this.currentlySelectedBrandBottles[y]['Transaction_Id'].split('_')[1], Math.floor(this.currentlySelectedBrandBottles[y]['Transaction_Id'].split('_')[1] / 90) == this.currentCycleNumber)
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

    console.log(this.currentlySelectedBrandBottles)
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
      this.inventoryForm.markAllAsTouched(); // shows mat-errors
      this.showFormErrors(); // log specific invalid fields
      return;
    }
    if (this.inventoryForm.valid) {
      this.loginService.updateInventory(this.producerCode, this.inventoryForm.value.bottle_type, this.cityId, this.inventoryForm.value).subscribe(
        response => {
          // Handle success
          console.log('Inventory updated successfully', response);
        },
        error => {
          // Handle error
          console.error('Error creating inventory', error);
        }
      );
    }
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.inventoryForm.get(controlName);
    return control ? control.hasError(errorCode) && (control.dirty || control.touched) : false;
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

}