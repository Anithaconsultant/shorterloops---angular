import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from './../services/loginservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  currentuser: any;
  selectrole = false;
  setusername: any;
  city: any;
  dataList: any;
  facility: any;

  setpair = [];
  selectedCity: any;
  selectedfacility: any;
  val: any = {
    CityName: "",
  };
  constructor(private logser: LoginserviceService) {
    this.currentuser = { ...this.logser.currentuser };
    this.setusername = this.currentuser.Username;
    this.logser.getAllCities().subscribe((data) => {
      this.city = data;
      this.getcityList();
    })
    this.logser.getallfacility().subscribe((data) => {
      this.facility = data;
      console.log(this.facility)
    })
  }
  ngOnInit() {

  }
  setList: any[] = [];
  getcityList() {
    if (this.city) {
      this.dataList = JSON.parse(JSON.stringify(this.city));
    }
    let newdata = {};
    for (let key in this.dataList) {
      newdata = [this.dataList[key].CityName, this.dataList[key].CityId ]
      this.setList.push(newdata);

    }
    console.log(this.setList,this.selectedCity);
  }
  checkavailablity() {

    console.log(this.selectedCity.value, this.selectedfacility, this.val.CityName);
    for (let key in this.facility) {
      // console.log(key)
      // console.log(this.facility[key].Facility_cityid==)
      // if (this.facility.hasOwnProperty(key)) {
      //    console.log(key, this.facility[key]);
      // }
    }
  }




}
