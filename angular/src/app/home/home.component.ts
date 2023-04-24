import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from './../services/loginservice.service';
import { Router } from '@angular/router';
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
  selectedCity: string = '';
  selectedfacility: any;
  facilityobj = {
    facilityname: '',
    facilityCityId: '',
    Ownerid: ''
  }
  constructor(private logser: LoginserviceService, private router: Router) {
    this.currentuser = { ...this.logser.currentuser };
    this.setusername = this.currentuser.Username;
    this.logser.getAllCities().subscribe((data) => {
      this.city = data;
      this.getcityList();
    })
    this.logser.getallfacility().subscribe((data) => {
      this.facility = data;
      
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
      newdata = [this.dataList[key].CityName, this.dataList[key].CityId]
      this.setList.push(newdata);

    }
    //  console.log(this.setList, this.selectedCity);
  }
  getCityId() {
    console.log(this.setList[0][0],this.setList[0][1],this.setList.length)
    for (var i = 0; i < this.setList.length; i++);
    {
      console.log( this.setList[i],i)
      if (this.setList[i][0] == this.selectedCity) {
        //return this.setList[i][1];
      }
    }
  }
  canUpdate = false;
  checkavailablity() {
    let selectedcityid = this.getCityId();
    console.log(this.selectedCity, this.selectedfacility);
    for (let key in this.facility) {
      if (this.facility[key].Facility_cityid == selectedcityid && this.facility[key].Owner_id != '' && this.facility[key].facilityName == this.selectedfacility) {
        alert("The current role is not available please select any other role");
        this.canUpdate = true;
      }
      else {
        //this.facilityobj.facilityCityId = selectedcityid;
        this.facilityobj.facilityname = this.selectedfacility;
        this.facilityobj.Ownerid = this.logser.currentuser.UserId
      }


    }

    if (this.canUpdate == false) {

      this.logser.updatefacility(this.facilityobj).subscribe(
        data => {
          this.facilityobj = data;
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
