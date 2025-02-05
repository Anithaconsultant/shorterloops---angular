import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './../services/loginservice.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
@Component({
  selector: 'app-cityrule',
  templateUrl: './cityrule.component.html',
  styleUrls: ['./cityrule.component.scss']
})
export class CityruleComponent implements OnInit {

  @ViewChild('alertModal') alertModal!: AlertModalComponent;


  cityRuleForm: FormGroup;
  constructor(private fb: FormBuilder, private logser: LoginserviceService, private route: Router) {
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
      display_at_dustbin: [false],
      garbage_truck_announcement: [false]
    });
  }

  ngOnInit(): void {

    if (this.logser.currentuser.Username == '') {
      this.route.navigate(['/login']);
    }
  }

  onSubmit(): void {
    alert(this.cityRuleForm.valid)
    if (this.cityRuleForm.valid) {


      const formData = this.cityRuleForm.value;

      // Extracting the fields for City Table
      const cityUpdateData = {
        display_at_dustbin: formData.display_at_dustbin,
        garbage_truck_announcement: formData.garbage_truck_announcement
      };

      // Extracting the fields for CityRule Table
      let cityRuleData = { ...formData };
      delete cityRuleData.display_at_dustbin;
      delete cityRuleData.garbage_truck_announcement;

      // Perform the two separate API calls
      //console.log("City notice Data");
      //console.log(cityUpdateData);
      //console.log("Cityrule Data");
      //console.log(cityRuleData);
      this.updateCityTable(cityUpdateData);
      this.insertIntoCityRuleTable(cityRuleData);
    }
    else {
      alert("invalid");
    }
  }

  updateCityTable(data: any) {
    this.logser.updateNoticeonCityTable(data).subscribe(

      (response) => {
        //console.log('City Table Updated:', response);
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
    this.logser.resumeTimer().subscribe(response => {
      //console.log('Timer resumed:', response);
      this.route.navigate(["/maincity"]);
    });
  }
}
