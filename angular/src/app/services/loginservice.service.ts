import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  username = "anitha";
  password = "anitha";

  currentuser = {
    'Username': '',
    'UserId': '',
    'CityId': '',
    'Role': '',
    'wallet': '',
    'cartId':'',
    'gender':'',
    'avatar':'',
    'login':''
  };
  //baseurl = "https://dbl.iihs.in/api/";

  baseurl = "http://127.0.0.1:8000/api/";
  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authorizationData
  })
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    console.log(this.baseurl);
    return this.http.get(this.baseurl,
      { headers: this.httpHeaders });
  }
  createUser(user: any): Observable<any> {
    const body = { Username: user.Username, email: user.email, Password: user.Password, mobile: user.mobile, wallet: user.wallet, status: user.status, User_cityid: user.User_cityid, Role: user.Role,cartId:user.cartId,gender:user.gender,avatar:user.avatar};
    return this.http.post(this.baseurl + 'signup/', body,
      { headers: this.httpHeaders });
  }
  createcity(city: any): Observable<any> {
    const body = { CityName: city.CityName, MayorId: city.MayorId, Clocktickrate: city.Clocktickrate, Status: city.Status };
    return this.http.post(this.baseurl + 'addcity/', body,
      { headers: this.httpHeaders });
  }
  getAllCities(): Observable<any> {
    return this.http.get(this.baseurl + 'addcity/',
      { headers: this.httpHeaders });
  }
  updateloggeduser(loguser: any): Observable<any> {
    let body;
    console.log(loguser.login)
    body = { login: loguser.login};
     console.log(body)
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  updateuser(edituser: any): Observable<any> {
    let body;
    console.log(edituser.cartId,edituser,edituser.Role);
    if (edituser.cartId == undefined && edituser.Role=="Mayor") {
      this.currentuser.cartId=edituser.cityid+'_100';
      body = { User_cityid: edituser.cityid, Role: edituser.Role, cartId: edituser.cityid+'_100' };
    } 
    else { 
      body = { User_cityid: edituser.cityid, Role: edituser.Role, cartId:  edituser.cartId};
     }
    console.log(body)
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  getallfacility(cityid: any): Observable<any> {
    return this.http.get(this.baseurl + 'getfacility/' + cityid,
      { headers: this.httpHeaders });
  }
  updatefacility(facilityobj: any): Observable<any> {
    const body = { Facilityname: facilityobj.facilityname, Owner_id: facilityobj.Ownerid, Facility_cityid_id: facilityobj.facilityCityId }

    return this.http.put(this.baseurl + 'updatefacility/', body,
      { headers: this.httpHeaders });
  }
  createfacility(firstfacility: any): Observable<any> {
    const body = { Facility_cityid_id: firstfacility.CityId };
    return this.http.post(this.baseurl + 'facility/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
}
