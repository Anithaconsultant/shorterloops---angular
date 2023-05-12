import { Component, OnInit } from "@angular/core";
import { LoginserviceService } from "./../services/loginservice.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentuser: any;
  selectrole = false;
  setusername: any;
  city: any;
  dataList: any;
  facility: any;
  setpair = [];
  selectedCity: string = "";
  selectedfacility: string = "";
  facilityobj = {
    facilityname: "",
    facilityCityId: 0,
    Ownerid: "",
  };
  userobj = {
    'cityid': 0,
    'Role': '',
    'cartId': ''
  }
  constructor(private logser: LoginserviceService, private router: Router) {
    this.currentuser = { ...this.logser.currentuser };
    this.setusername = this.currentuser.Username;
    this.logser.getAllCities().subscribe((data) => {
      this.city = data;
      this.getcityList();
    });
  }
  ngOnInit(): void {
    if(this.logser.currentuser.Username==''){
     this.router.navigate(["login"])
    }
  }
  setList: any[] = [];
  getcityList() {
    if (this.city) {
      this.dataList = JSON.parse(JSON.stringify(this.city));
    }
    let newdata = {};
    for (let key in this.dataList) {
      newdata = [this.dataList[key].CityName, this.dataList[key].CityId];
      this.setList.push(newdata);
    }
    //  console.log(this.setList, this.selectedCity);
  }
  getCityId() {
    for (var i = 0; i < this.setList.length; i++) {
      if (this.setList[i][0] == this.selectedCity) {
        console.log(this.setList[i][1]);
        return this.setList[i][1];
      }
    }
  }
  canUpdate = false;
  checkindata() {
    let selectedcityid = parseInt(this.getCityId());
    console.log(selectedcityid, this.selectedfacility, this.selectedCity);
    this.logser.getallfacility(selectedcityid).subscribe((data) => {
      this.facility = data;
      console.log(this.facility);

      for (let key in this.facility) {
        if (
          this.facility[key].Facility_cityid == selectedcityid &&
          this.facility[key].Owner_id != "" &&
          this.facility[key].facilityName == this.selectedfacility
        ) {
          alert(
            "The current role is not available please select any other role"
          );
          this.canUpdate = true;
        } else {
          let currentcartId;
          if (this.facility[key].Facilityname == this.selectedfacility) {
            currentcartId = this.facility[key].cartId;
            console.log('currentcartId'+currentcartId);
            this.facilityobj.facilityCityId = selectedcityid;
            this.facilityobj.facilityname = this.selectedfacility;
            this.facilityobj.Ownerid = this.logser.currentuser.UserId;
            this.userobj.cityid = selectedcityid;
            this.userobj.Role = this.selectedfacility;
            this.userobj.cartId = currentcartId;
            this.logser.currentuser.Role = this.selectedfacility;
            this.logser.currentuser.cartId = currentcartId;
          }

        }
      }


    });
  }
  dochanges() {
    console.log("updating")
    if (this.canUpdate == false && this.selectrole) {
      console.log(this.facilityobj);
      this.logser.updatefacility(this.facilityobj).subscribe(
        (data) => {
          this.facilityobj = data;
          this.logser.updateuser(this.userobj).subscribe(
            (data) => {
              this.userobj = data;
              this.router.navigate(["maincity"]);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
