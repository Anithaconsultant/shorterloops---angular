import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
 // username = "anitha";
  //password = "anitha";
username="admin";
password="admin";
  currentuser = {
    'Username': '',
    'UserId': '',
    'CityId': '',
    'Role': '',
    'wallet': ''
  };
  //baseurl = "http://10.10.4.129/api/";
  baseurl="http://127.0.0.0:8000/api/";
  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authorizationData
  })
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl,
      { headers: this.httpHeaders });
  }
  createUser(user: any): Observable<any> {
    const body = { Username: user.Username, email: user.email, Password: user.Password, mobile: user.mobile, wallet: user.wallet, status: user.status, User_cityid: user.User_cityid, Role: user.Role };
    console.log(body)
    return this.http.post(this.baseurl + '/signup/', body,
      { headers: this.httpHeaders });
  }
  createcity(city: any): Observable<any> {
    const body = { CityName: city.CityName, MayorId: city.MayorId, Clocktickrate: city.Clocktickrate, Status: city.Status };
    console.log(body)
    return this.http.post(this.baseurl + '/addcity/', body,
      { headers: this.httpHeaders });
  }
  getAllCities(): Observable<any> {
    return this.http.get(this.baseurl+'/addcity/',
      { headers: this.httpHeaders });
  }
  updateuser(user:any): Observable<any> {
    const body = { Username: user.Username, email: user.email, Password: user.Password, mobile: user.mobile, wallet: user.wallet, status: user.status, User_cityid: user.User_cityid, Role: user.Role };
    return this.http.put(this.baseurl + '/editcity/' + this.currentuser.UserId + '/', body,
    {headers: this.httpHeaders});
  }
}
