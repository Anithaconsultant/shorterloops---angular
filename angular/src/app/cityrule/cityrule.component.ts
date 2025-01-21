import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './../services/loginservice.service';
@Component({
  selector: 'app-cityrule',
  templateUrl: './cityrule.component.html',
  styleUrls: ['./cityrule.component.scss']
})
export class CityruleComponent implements OnInit {
  cityRuleForm: FormGroup;


  constructor(private fb: FormBuilder,private logser:LoginserviceService,private route:Router) {

    this.cityRuleForm = this.fb.group({
      city_id: [this.logser.currentuser.CityId ||'', Validators.required],
      rule_number: [null, Validators.required],
      day_number: [this.logser.currentuser.currentday||'', Validators.required],
      time_in_hours: [parseInt(this.logser.currentuser.CurrentTime)],
      virgin_plastic_price: [null],
      recycled_plastic_price: [null],
      envtx_p_shampoo: [null],
      envtx_p_bvb: [null],
      envtx_p_brcb: [null],
      envtx_p_brfb: [null],
      envtx_ub_v_m: [null],
      envtx_ub_rc_m: [null],
      envtx_ub_xx_cl: [null],
      envtx_r_bvb: [null],
      envtx_r_brcb: [null],
      envtx_r_brfb: [null],
      envtx_r_uvb: [null],
      envtx_r_urcb: [null],
      envtx_r_urfB: [null],
      envtx_c_bvb: [null],
      envtx_c_brcb: [null],
      envtx_c_brfb: [null],
      envtx_c_uvb: [null],
      envtx_c_urcb: [null],
      envtx_c_urfB: [null],
      fine_for_throwing_bottle: [null],
      dustbinning_fine: [null],
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
    if (this.cityRuleForm.valid) {
      console.log('Form Data:', this.cityRuleForm.value);
      // Send the form data to the backend
      // Example: this.http.post('API_URL', this.cityRuleForm.value).subscribe();
    } else {
      console.error('Form is invalid');
    }
  }
}
