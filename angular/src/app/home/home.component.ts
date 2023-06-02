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
  user: any;
  userobj = {
    'cityid': 0,
    'Role': '',
    'cartId': '',
    'avatar': '',
    'gender': ''
  }


  constructor(private logser: LoginserviceService, private router: Router) {
    this.currentuser = { ...this.logser.currentuser };
    this.setusername = this.currentuser.Username;
    this.userobj.gender = this.currentuser.gender;
    this.logser.getAllCities().subscribe((data) => {
      this.city = data;
      this.getcityList();
    });



  }
  ngOnInit(): void {
    if (this.logser.currentuser.Username == '') {
      this.router.navigate(["login"])
    }
    this.logser.getAllUsers().subscribe((data) => {
      this.user = data;
      console.log(this.user);


    })
  }
  setList: any[] = [];
  selectedcityid = '';
  choosefacility() {
    this.selectedcityid = this.getCityId();
    for (var t = 0; t < this.user.length; t++) {
      if (this.user[t].Role !== '' && this.user[t].User_cityid == this.selectedcityid) {
        let that = this;
        $('#role').find('option').each(function () {
          if ($(this).attr('value') == that.user[t].Role) {
            $(this).attr('disabled', 'true');
          }
        });
      }
    }
  }
  getcityList() {
    if (this.city) {
      this.dataList = JSON.parse(JSON.stringify(this.city));
    }
    let newdata = {};
    for (let key in this.dataList) {
      newdata = [this.dataList[key].CityName, this.dataList[key].CityId];
      this.setList.push(newdata);
    }
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
    console.log(this.selectedcityid, this.selectedfacility, this.selectedCity);
    this.logser.getallfacility(this.selectedcityid).subscribe((data) => {
      this.facility = data;
      console.log(this.facility);

      for (let key in this.facility) {
        if (
          this.facility[key].Facility_cityid == this.selectedcityid &&
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
            this.facilityobj.facilityCityId = parseInt(this.selectedcityid);
            this.facilityobj.facilityname = this.selectedfacility;
            this.facilityobj.Ownerid = this.logser.currentuser.UserId;
            this.userobj.cityid = parseInt(this.selectedcityid);
            this.userobj.Role = this.selectedfacility;
            this.userobj.cartId = currentcartId;
            this.logser.currentuser.Role = this.selectedfacility;
            this.logser.currentuser.cartId = currentcartId;
            this.logser.currentuser.CityId = this.selectedcityid.toString();
          }

        }
      }


    });
  }
  dochanges() {
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
