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
  allcity = [];
  constructor(private formbuilder: FormBuilder, private http: HttpClientModule, private router: Router, private logser: LoginserviceService, public datepipe: DatePipe) {
    this.currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.currentTime = this.datepipe.transform((new Date), 'hh:mm:ss')

  }
  city = {
    'CityName': '',
    'MayorId': this.logser.currentuser.UserId,
    'Clocktickrate': '',
    'Citystartdate': '',
    'CityCreateTime': '',
    'Status': 'Yes'
  };
  userobj={
    'cityid':'',
    'Role':'Mayor'
  }
  
  firstfacility={
    'CityId':'',
  }

  ngOnInit(): void {
    this.addcityForm = this.formbuilder.group({
      CityName: ['', Validators.required],
      Clocktickrate: ['', Validators.required],
      Citystartdate: [this.currentDate, Validators.required],
      CityCreateTime: [this.currentTime, Validators.required]
    })
    this.city.CityCreateTime = this.currentTime
    this.city.Citystartdate = this.currentDate
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
        },
        error => {
          console.log(error);
        }
      );
      setTimeout(() => {
        this.logser.getAllCities().subscribe((data) => {
          this.allcity = data;
          console.log(this.allcity)
          let length=this.allcity.length;
          this.userobj['cityid']=length.toString();
          this.firstfacility['CityId']=length.toString();
          this.logser.updateuser(this.userobj).subscribe(
            data => {
              this.userobj = data;
            },
            error => {
              console.log(error);
            }
          );
          this.logser.createfacility(this.firstfacility).subscribe(
            data => {
              this.firstfacility = data;
            },
            error => {
              console.log(error);
            }
          );
        })
      }, 2000)
      
       this.router.navigate(["maincity"])
    }
  }
}
