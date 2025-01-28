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


  constructor(private fb: FormBuilder, private logser: LoginserviceService, private route: Router) {

    this.cityRuleForm = this.fb.group({
      cityId: [this.logser.currentuser.CityId || '', Validators.required],
      rule_number: [null, Validators.required],
      day_number: [this.logser.currentuser.currentday || '', Validators.required],
      time_in_hours: [parseInt(this.logser.currentuser.CurrentTime)],
      virgin_plastic_price: [null],
      recycled_plastic_price: [null],
      envtx_p_shampoo: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_p_bvb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_p_brcb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_p_brfb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_ub_v_m: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_ub_rc_m: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_ub_xx_cl: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_bvb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_brcb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_brfb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_uvb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_urcb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_r_urfB: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_bvb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_brcb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_brfb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_uvb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_urcb: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      envtx_c_urfB: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      fine_for_throwing_bottle: ['', [Validators.required, Validators.min(0)]],
      dustbinning_fine: ['', [Validators.required, Validators.min(0)]],
      display_at_dustbin: [false],
      garbage_truck_announcement: [false]
    });
  }

  ngOnInit(): void {
   
    if (this.logser.currentuser.Username == '') {
      this.route.navigate(['/login']);
    }
  }
  ngAfterViewInit(): void {
    $('.cityruleLink').on("click", () => { alert("oi"); })
  }
  onSubmit(): void {
    if (this.cityRuleForm.valid) {
      console.log('Form Data:', this.cityRuleForm.value);
      // Send the form data to the backend
      // Example: this.http.post('API_URL', this.cityRuleForm.value).subscribe();
      this.logser.createcityrule(this.cityRuleForm.value).subscribe(
        data => {

          console.log(data);
        },
        error => {
          console.log(error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
  gotocity() {
    this.route.navigate(["maincity"]);
  }

}
