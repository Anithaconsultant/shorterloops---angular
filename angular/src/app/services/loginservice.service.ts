import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  username = "admin";
  password = "admin@123";
  currentuser = {
    'Username': '',
    'UserId': '',
    'CityId': '',
    'Role': '',
    'wallet': 0.0,
    'cartId': '',
    'gender': '',
    'avatar': '',
    'login': '',
    'cityname': '',
    'CurrentTime': '',
    'currentday': 0,
    'cityrate': '',
    'cityavatar': ''
  };
  // baseurl = "https://dbl.iihs.in/api/";
  baseurl = "http://127.0.0.1:8000/api/";
  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authorizationData
  });

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl,
      { headers: this.httpHeaders });
  }
  createUser(user: any): Observable<any> {
    const body = { Username: user.Username, email: user.email, Password: user.Password, mobile: user.mobile, wallet: user.wallet, status: user.status, User_cityid: user.User_cityid, Role: user.Role, cartId: user.cartId, gender: user.gender, avatar: user.avatar };

    return this.http.post(this.baseurl + 'signup/', body,
      { headers: this.httpHeaders });
  }
  createAsset(asset: any): Observable<any> {
    const body = { AssetId: asset.AssetId, Asset_CityId: asset.Asset_CityId, CategoryCode: asset.CategoryCode, Bottle_Code: asset.Bottle_Code, Content_Code: asset.Content_Code, Current_Content_Code: asset.Current_Content_Code, Quantity: asset.Quantity, remQuantity: asset.remQuantity, Units: asset.Units, Bottle_loc: asset.Bottle_loc, Bottle_Status: asset.Bottle_Status, DOM: asset.DOM, Max_Refill_Count: asset.Max_Refill_Count, Current_Refill_Count: asset.Current_Refill_Count, Latest_Refill_Date: asset.Latest_Refill_Date, Retirement_Date: asset.Retirement_Date, Retire_Reason: asset.Retire_Reason, Content_Price: asset.Content_Price, Bottle_Price: asset.Bottle_Price, Redeem_Good: asset.Redeem_Good, Redeem_Damaged: asset.Redeem_Damaged, Discount_RefillB: asset.Discount_RefillB, Env_Tax: asset.Env_Tax, Discard_fine: asset.Discard_fine, Transaction_Id: asset.Transaction_Id, Transaction_Date: asset.Transaction_Date, Fromfacility: asset.Fromfacility, Tofacility: asset.Tofacility };
    return this.http.post(this.baseurl + 'asset/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }
  createcity(city: any): Observable<any> {

    const body = { CityName: city.CityName, MayorId: city.MayorId, Clocktickrate: city.Clocktickrate, Status: city.Status, cityavatar: city.cityavatar };
    return this.http.post(this.baseurl + 'addcity/', body,
      { headers: this.httpHeaders });

  }
  updatecurrenttime(): Observable<any> {

    return this.http.get(this.baseurl + 'updatetime/' + this.currentuser.CityId, { headers: this.httpHeaders });

  }
  getAllCities(): Observable<any> {
    return this.http.get(this.baseurl + 'addcity/',
      { headers: this.httpHeaders });
  }
  getAllAssets(): Observable<any> {
    return this.http.get(this.baseurl + 'asset/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }

  getthisAssets(currentitem: any): Observable<any> {
    return this.http.get(this.baseurl + 'assets/' + currentitem, { headers: this.httpHeaders });
  }


  lockthisAsset(currentitem: string): Observable<any> {
    return this.http.post(this.baseurl + 'lockasset/' + currentitem, { headers: this.httpHeaders });
  }
  unlockthisAsset(currentitem: string): Observable<any> {
    return this.http.post(this.baseurl + 'unlockasset/' + currentitem, { headers: this.httpHeaders });
  }

  startthread(): Observable<any> {
    return this.http.post(this.baseurl + 'update_city_threads/', { headers: this.httpHeaders });
  }
  updatethisAssets(currentitem: any): Observable<any> {
    const body: { [key: string]: any } = {
      Bottle_loc: currentitem.Bottleloc, Bottle_Status: currentitem.bottlestatus,
      Transaction_Id: currentitem.transactionid, Transaction_Date: currentitem.transactiondate,
      Fromfacility: currentitem.fromfacility,
      Tofacility: currentitem.tofacility,
      Latest_Refill_Date: currentitem.Latest_Refill_Date

    };
    if (currentitem.contentCode !== '') {
      body['Current_Content_Code'] = currentitem.contentCode;
    }

    if (currentitem.purchased !== '') {
      body['purchased'] = currentitem.purchased;
    }
    if (currentitem.dragged !== '') {
      body['dragged'] = currentitem.dragged;
    }


    return this.http.put(this.baseurl + 'assets/' + currentitem.currentitem, body,
      { headers: this.httpHeaders });
  }
  updateConveyorAssets(currentitem: any): Observable<any> {
    const body = {
      Bottle_loc: currentitem.Bottleloc,
      Bottle_Status: currentitem.bottlestatus,
      Fromfacility: currentitem.fromfacility,
      Tofacility: currentitem.Bottleloc,
      Transaction_Id: currentitem.transactionid, Transaction_Date: currentitem.transactiondate,
    };

    return this.http.put(this.baseurl + 'assets/' + currentitem.currentitem, body,
      { headers: this.httpHeaders });
  }

  updatethisAssetQuantity(currentbottle: any): Observable<any> {
    const body: { [key: string]: any } = {
      remQuantity: String(currentbottle.currentQuantity),
      Bottle_Status: currentbottle.Bottle_Status,

    };
    if (currentbottle.Location !== '') {
      body['Bottle_loc'] = currentbottle.Location;
    }
    return this.http.put(this.baseurl + 'assets/' + currentbottle.currentbottle, body,
      { headers: this.httpHeaders });
  }

  updateRefillData(bottleDataatRefill: any): Observable<any> {
    const body: { [key: string]: any } = {
      remQuantity: String(bottleDataatRefill.currentQuantity),
      Bottle_Status: bottleDataatRefill.Bottle_Status,
      Current_Refill_Count: bottleDataatRefill.Current_Refill_Count

    };

    return this.http.put(this.baseurl + 'assets/' + bottleDataatRefill.RefillingBottle, body,
      { headers: this.httpHeaders });
  }
  updatedragged(currentbottle: any): Observable<any> {
    const body = {
      Bottle_loc: currentbottle.Bottleloc,
      dragged: currentbottle.dragged,
      purchased: currentbottle.purchased

    };
    return this.http.put(this.baseurl + 'assets/' + currentbottle.currentbottle, body,
      { headers: this.httpHeaders });
  }
  updatelocation(currentbottle: any): Observable<any> {
    const body = {
      Bottle_loc: currentbottle.Bottleloc
    };
    return this.http.put(this.baseurl + 'assets/' + currentbottle.currentbottle, body,
      { headers: this.httpHeaders });
  }
  getcitynames(): Observable<any> {

    return this.http.get(this.baseurl + 'getcityname/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  updateloggeduser(loguser: any): Observable<any> {
    let body;
    body = { login: loguser.login };
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  updateuseravatar(avatar: any): Observable<any> {
    let body;
    body = { avatar: avatar };
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  leavescity(): Observable<any> {
    let body;
    body = { User_cityid: '', Role: '', cartId: '', avatar: '' };
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  updateuser(edituser: any): Observable<any> {
    let body;
    if (edituser.cartId == undefined && edituser.Role == "Mayor") {
      this.currentuser.cartId = edituser.cityid + '_100';
      body = { User_cityid: edituser.cityid, Role: edituser.Role, cartId: edituser.cityid + '_100' };
    }
    else {
      body = { User_cityid: edituser.cityid, Role: edituser.Role, cartId: edituser.cartId };
    }
    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  updatewallet(): Observable<any> {
    let body = { wallet: this.currentuser.wallet };

    return this.http.put(this.baseurl + 'updateusercity/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  getallfacility(cityid: any): Observable<any> {
    return this.http.get(this.baseurl + 'getfacility/' + cityid,
      { headers: this.httpHeaders });
  }
  updatefacility(facilityobj: any): Observable<any> {
    const body = { Facilityname: facilityobj.facilityname, Owner_id: facilityobj.Ownerid, Facility_cityid: facilityobj.facilityCityId, Owner_status: facilityobj.Owner_status }
    return this.http.put(this.baseurl + 'updatefacility/', body,
      { headers: this.httpHeaders });
  }
  leavefacility(): Observable<any> {
    const body = { Owner_id: '', Owner_status: 'Inactive' }
    return this.http.put(this.baseurl + 'leavefacility/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }
  createfacility(firstfacility: any): Observable<any> {
    const body = { Facility_cityid: firstfacility.CityId };
    return this.http.post(this.baseurl + 'facility/' + this.currentuser.UserId, body,
      { headers: this.httpHeaders });
  }

  createtransaction(transaction: any): Observable<any> {
    const body = {
      TransactionId: transaction.TransactionId, 'Amount': transaction.Amount, 'DebitFacility': transaction.DebitFacility,
      'CreditFacility': transaction.CreditFacility, 'Purpose': transaction.Purpose
    };
    return this.http.post(this.baseurl + 'cashflow/', body,
      { headers: this.httpHeaders });
  }
  gettransactions(): Observable<any> {
    return this.http.get(this.baseurl + 'cashflow/',
      { headers: this.httpHeaders });
  }
  updatetransactioninfacility(transaction: any): Observable<any> {
    const body = {};
    return this.http.post(this.baseurl + 'cashflow/', body,
      { headers: this.httpHeaders });
  }
  getsupermarketcashbox(): Observable<any> {
    return this.http.get(this.baseurl + 'getsupermarketcash/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  getrefillingstationcashbox(): Observable<any> {
    return this.http.get(this.baseurl + 'getrefillingstationcash/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  getcashboxmunicipality(): Observable<any> {
    return this.http.get(this.baseurl + 'getmunicipalitycash/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  updatesupermarketcashbox(cashbox: any): Observable<any> {
    const body = { Cashbox: cashbox };
    return this.http.put(this.baseurl + 'getsupermarketcash/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }
  updaterefillingcashbox(cashbox: any): Observable<any> {
    const body = { Cashbox: cashbox };
    return this.http.put(this.baseurl + 'getrefillingstationcash/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }
  updatecashboxmunicipality(cashbox: any): Observable<any> {
    const body = { Cashbox: cashbox }
    return this.http.put(this.baseurl + 'getmunicipalitycash/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }

  sendUserDetails(userDetails: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authorizationData)
      .set('user-data', JSON.stringify(userDetails));

    const url = this.baseurl + 'receive_user_details/';
    return this.http.post(url, {}, { headers: headers });
  }
  getAuditLogs(assetId: any) {
    return this.http.get(this.baseurl + 'audit-log/' + assetId + '&' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  getAuditLogsuser(user: any) {
    return this.http.get(this.baseurl + 'audit-logs/' + user + '&' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  getBottlePrice() {
    return this.http.get(this.baseurl + 'bottleprice/',
      { headers: this.httpHeaders });
  }
  getShampooPrice() {
    return this.http.get(this.baseurl + 'shampooprice/',
      { headers: this.httpHeaders });
  }

  getFilterOptions(): Observable<any> {
    return this.http.get(this.baseurl + 'filter-options/');
  }

  getFilteredLogs(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.get(this.baseurl + 'filter-audit-logs/', { headers: this.httpHeaders, params });
  }

}
