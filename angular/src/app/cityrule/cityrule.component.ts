import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginserviceService } from './../services/loginservice.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-cityrule',
  templateUrl: './cityrule.component.html',
  styleUrls: ['./cityrule.component.scss']
})
export class CityruleComponent implements OnInit {
[x: string]: any;

  @ViewChild('alertModal') alertModal!: AlertModalComponent;


  cityRuleForm: FormGroup; notificationForm!: FormGroup;
  constructor(private fb: FormBuilder,private sharedser:SharedServiceService, private logser: LoginserviceService, private route: Router, private activateroute: ActivatedRoute) {
    this.notificationForm = this.fb.group({
      display_at_dustbin: [false],
      garbage_truck_announcement: [false]
    });
    this.cityRuleForm = this.fb.group({
      cityId: [this.logser.currentuser.CityId || '', Validators.required],
      rule_number: [null, Validators.required],
      day_number: [this.logser.currentuser.currentday || '', Validators.required],
      time_in_hours: [parseInt(this.logser.currentuser.CurrentTime)],
      virgin_plastic_price: [null],
      recycled_plastic_price: [null],
      envtx_p_shampoo: ['', [Validators.min(0), Validators.max(100)]],
      envtx_p_bvb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_p_brcb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_p_brfb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_ub_v_m: ['', [Validators.min(0), Validators.max(100)]],
      envtx_ub_rc_m: ['', [Validators.min(0), Validators.max(100)]],
      envtx_ub_xx_cl: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_bvb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_brcb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_brfb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_uvb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_urcb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_r_urfB: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_bvb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_brcb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_brfb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_uvb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_urcb: ['', [Validators.min(0), Validators.max(100)]],
      envtx_c_urfB: ['', [Validators.min(0), Validators.max(100)]],
      fine_for_throwing_bottle: ['', [Validators.min(0)]],
      dustbinning_fine: ['', [Validators.min(0)]],

    });
  }
  currentOption: any = '';
  ngOnInit(): void {
    this.activateroute.queryParams.subscribe(params => {
      this.currentOption = params['option'];
      //   console.log('Received option:', this.currentOption);
    });
    if (this.logser.currentuser.Username == '') {
      this.route.navigate(['/login']);
    }
    else {
      if (this.currentOption == 'cityrule') { this.loadLastCityRule(); }
      else { this.loadLastCitynotification(); }

    }

    
  }
  loadLastCityRule() {
    const cityId = this.cityRuleForm.get('cityId')?.value; // Get cityId from the form

    if (cityId) {
      this.logser.getLastCityRule().subscribe(
        (data) => {
          if (data) {
            this.cityRuleForm.patchValue(data); // Populate form with API response
          }
        },
        (error) => {
          console.error("Error fetching last city rule", error);
        }
      );
    }
  }
  loadLastCitynotification() {
    const cityId = this.logser.currentuser.CityId; // Get cityId from the form

    if (cityId) {
      this.logser.getcitynames().subscribe(
        (data: any) => {
          if (data) {
            console.log("API Response:", data);

            // Ensure checkboxes receive boolean values
            const formattedData = {
              display_at_dustbin: data[0].display_at_dustbin,
              garbage_truck_announcement: data[0].garbage_truck_announcement
            };
            console.log(formattedData)
            this.notificationForm.patchValue(formattedData); // Populate form with API response
          }
        },
        (error) => {
          console.error("Error fetching cityname", error);
        }
      );
    }
  }
  showWarning:boolean=false;
  toggleWarning(event: any) {
    this.showWarning = event.target.checked; // Get checkbox value
    this.sharedser.setShowWarning(this.showWarning); // Update service state
  }
  playWarning:boolean=false;
  togglePlayWarning(event: any) {
    this.playWarning = event.target.checked; // Get checkbox value
    this.sharedser.setPlayWarning(this.playWarning); // Update service state
  }
  notificationSubmit(): void {
    if (this.notificationForm.valid) {
      const notificationData = this.notificationForm.value;
      let cityUpdateData = { ...notificationData };
      this.updateCityTable(cityUpdateData);
      this.notificationForm.reset();
      this.alertModal.openModal("Notification Updated", false, () => { this.gotocity(); })
    }
  }
  onSubmit(): void {
    if (this.cityRuleForm.valid) {
      const formData = this.cityRuleForm.value;
      let cityRuleData = { ...formData };
      this.insertIntoCityRuleTable(cityRuleData);
      this.cityRuleForm.reset();
      this.alertModal.openModal("New Rule is Created", false, () => { this.gotocity(); })
    }
    else {
     this.alertModal.openModal("Please fill the valid Details");
    }
  }
  activeInfo: string | null = null;
  toggleInfo(field: string) {
    this.activeInfo = this.activeInfo === field ? null : field;
  }
  updateCityTable(data: any) {
    this.logser.updateNoticeonCityTable(data).subscribe(

      (response) => {
        console.log('City Table Updated:', response);
      },
      (error) => {
        console.error('Error updating City Table:', error);
      }
    );
  }

  insertIntoCityRuleTable(data: any) {
    this.logser.createcityrule(data).subscribe((response) => {
      //console.log('City Table Updated:', response);
    },
      (error) => {
        console.error('Error updating City Table:', error);
      });
  }

  gotocity() {

    this.logser.toggleTimer(false).subscribe(
      response => {
        console.log('Timer resumed:', response);
        this.route.navigate(["/maincity"]);
      },
      error => {
        console.error('Error updating timer:', error);
      }
    );
    //  this.logser.resumeTimer().subscribe(response => {
    //console.log('Timer resumed:', response);

    //   });
  }
}
