import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  username = "Admin";
  password = "Admin@123";
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
 //baseurl = "https://dbl.iihs.in/api/";
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
    const body = { AssetId: asset.AssetId, Asset_CityId: asset.Asset_CityId, CategoryCode: asset.CategoryCode, Bottle_Code: asset.Bottle_Code, Content_Code: asset.Content_Code, Current_Content_Code: asset.Current_Content_Code, Quantity: asset.Quantity, remQuantity: asset.remQuantity, Units: asset.Units, Bottle_loc: asset.Bottle_loc, Bottle_Status: asset.Bottle_Status, DOM: asset.DOM, Max_Refill_Count: asset.Max_Refill_Count, Current_SelfRefill_Count: asset.Current_SelfRefill_Count, Current_PlantRefill_Count: asset.Current_PlantRefill_Count, Latest_Refill_Date: asset.Latest_Refill_Date, Retirement_Date: asset.Retirement_Date, Retire_Reason: asset.Retire_Reason, Content_Price: asset.Content_Price, Bottle_Price: asset.Bottle_Price, Redeem_Good: asset.Redeem_Good, Redeem_Damaged: asset.Redeem_Damaged, Discount_RefillB: asset.Discount_RefillB, Env_Tax_Customer: asset.Env_Tax_Customer, Discard_fine: asset.Discard_fine, Transaction_Id: asset.Transaction_Id, Transaction_Date: asset.Transaction_Date, Fromfacility: asset.Fromfacility, Tofacility: asset.Tofacility };
    return this.http.post(this.baseurl + 'asset/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }
  createcity(city: any): Observable<any> {

    const body = { CityName: city.CityName, MayorId: city.MayorId, Clocktickrate: city.Clocktickrate, Status: city.Status, cityavatar: city.cityavatar };
    return this.http.post(this.baseurl + 'addcity/', body,
      { headers: this.httpHeaders });

  }

  createcityrule(cityrule: any): Observable<any> {
    //console.log(cityrule)
    return this.http.post(this.baseurl + 'addRule/', cityrule,
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
  getFilteredCityAssets(cityId: any): Observable<any> {
    return this.http.get(this.baseurl + 'asset/' + cityId,
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

  updateNoticeonCityTable(body: any): Observable<any> {
    //console.log(body)
    return this.http.put(this.baseurl + 'addcity/' + this.currentuser.CityId, body,
      { headers: this.httpHeaders });
  }

  updateRefillData(bottleDataatRefill: any): Observable<any> {
    const body: { [key: string]: any } = {
      remQuantity: String(bottleDataatRefill.currentQuantity),
      Bottle_Status: bottleDataatRefill.Bottle_Status,
      Current_SelfRefill_Count: bottleDataatRefill.Current_SelfRefill_Count

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
  updateBtlLocationandMakeitRetired(currentbottle: any,bottleId:any): Observable<any> {
    return this.http.put(this.baseurl + 'assets/' + bottleId, currentbottle,
      { headers: this.httpHeaders });
  }
  bringBackBrandedBottles(currentbottle: any,assetId:any): Observable<any> {

    return this.http.put(this.baseurl + 'assets/' +assetId, currentbottle,
      { headers: this.httpHeaders });
  }
  updateUBContent(currentbottle: any): Observable<any> {
    const body = {
      Content_Code:'',
      Current_Content_Code:'',
      Transaction_Id:'',
      Transaction_Date:'',
      Fromfacility:'',
      Tofacility:'',
      dragged:false,
      purchased:false,
      Bottle_Status:'Empty-Clean'
    };
    console.log("UB update",currentbottle,body);
    return this.http.put(this.baseurl + 'assets/' + currentbottle, body,
      { headers: this.httpHeaders });
  }
  updateBrandedContent(currentbottle: any): Observable<any> {
    const body = {
      Transaction_Id:'',
      Transaction_Date:'',
      Fromfacility:'',
      Tofacility:'',
      dragged:false,
      purchased:false,
      Bottle_Status:'Empty-Clean'
    };
    console.log("Branded",currentbottle,body);
    return this.http.put(this.baseurl + 'assets/' + currentbottle, body,
      { headers: this.httpHeaders });
  }
  getcitynames(): Observable<any> {
  console.log( this.currentuser.CityId)
    return this.http.get(this.baseurl + 'getcityname/' + this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  getLastCityRule(): Observable<any> {
  console.log( this.currentuser.CityId)
    return this.http.get(this.baseurl + 'cityrule/' + this.currentuser.CityId,
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
    console.log(body);
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
  getFacilitycashbox(facilityName:any): Observable<any> {
    return this.http.get(this.baseurl + 'getFacilityCashbox/' +facilityName+'/'+ this.currentuser.CityId,
      { headers: this.httpHeaders });
  }
  updateFacilitycashbox(facilityName:any,cashbox:any): Observable<any> {
    const body = { Cashbox: cashbox };
    return this.http.put(this.baseurl + 'getFacilityCashbox/' +facilityName+'/'+ this.currentuser.CityId,body,
      { headers: this.httpHeaders });
  }
  toggleTimer( timerPaused: boolean): Observable<any> {
    
    return this.http.post(this.baseurl + 'toggle-timer/' + this.currentuser.CityId, {timer_paused:timerPaused},
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

  pauseTimer() {
    return this.http.post(this.baseurl + 'manage-city-timer/' + this.currentuser.CityId, { action: 'pause' },
      { headers: this.httpHeaders });

  }

  resumeTimer() {
    return this.http.post(this.baseurl + 'manage-city-timer/' + this.currentuser.CityId, { action: 'resume' },
      { headers: this.httpHeaders });

  }




}
