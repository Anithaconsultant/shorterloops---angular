import { Component,OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { LoginserviceService } from './../services/loginservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 


export class HomeComponent implements OnInit{
  currentuser: any;
  selectrole = false;
  setusername: any;
  city: any;
  dataList:any;
  constructor(private logser: LoginserviceService) {
    this.currentuser = { ...this.logser.currentuser };
  this.setusername = this.currentuser.Username;
    console.log(this.currentuser.Username)
    this.logser.getAllCities().subscribe((data)=>{
      this.city = data;
      this.getcityList();
  })
  }
  ngOnInit() {
  
  }
  getcityList(){
    if (this.city) {
      console.log(this.city)
      this.dataList = JSON.parse(JSON.stringify(this.city));
      
    }
    console.log(this.dataList);
  }
  
}
