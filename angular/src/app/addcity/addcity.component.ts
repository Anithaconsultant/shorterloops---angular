import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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

  constructor(private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService, public datepipe: DatePipe) {
    this.currentDate =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.currentTime=this.datepipe.transform((new Date),'hh:mm:ss')

  } 
  city = {
    'CityName': '',
    'MayorId':this.logser.currentuser.UserId,
    'Clocktickrate': '',
    'Citystartdate': '',
    'CityCreateTime': '',
    'Status': 'Yes'
  };

  ngOnInit(): void {
    this.addcityForm = this.formbuilder.group({
      CityName: ['', Validators.required],
      Clocktickrate: ['', Validators.required],
      Citystartdate: [this.currentDate, Validators.required],
      CityCreateTime: [this.currentTime, Validators.required]
    })
    this.city.CityCreateTime=this.currentTime
    this.city.Citystartdate=this.currentDate
  }
  addcity() {
    this.submitted = true;
    if (this.addcityForm.invalid) {
      alert("invalid");
      return;
    }
    if (this.submitted) {
      this.logser.createcity(this.city).subscribe(
        data => {
          this.city = data;
          console.log(this.logser.currentuser)
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(["maincity"])
    }
  }
}
