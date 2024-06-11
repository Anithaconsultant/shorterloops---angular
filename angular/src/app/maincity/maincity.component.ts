import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})
export class MaincityComponent implements AfterViewInit, OnInit, OnDestroy {


  noavatar = false;
  userobj = {
    'login': '1'
  }
  currentrole = "Customer";
  @ViewChild('cityrail', { static: true }) public cityrail!: ElementRef;
  @ViewChild('transactioncomplete', { static: true }) public transactioncomplete!: ElementRef;
  @ViewChild('thankyousuper', { static: true }) public thankyousuper!: ElementRef;
  @ViewChild('doneshopping', { static: true }) public doneshopping!: ElementRef;
  @ViewChild('pleasecheck', { static: true }) public pleasecheck!: ElementRef;
  @ViewChild('paymentreceived', { static: true }) public paymentreceived!: ElementRef;
  @ViewChild('welcome', { static: true }) public welcome!: ElementRef;
  @ViewChild('welcomemarket', { static: true }) public welcomemarket!: ElementRef;
  @ViewChild('bottledroppeded', { static: true }) public bottledroppeded!: ElementRef;
  @ViewChild('placebottle', { static: true }) public placebottle!: ElementRef;
  @ViewChild('selectbrand', { static: true }) public selectbrand!: ElementRef;
  @ViewChild('bottledifferent', { static: true }) public bottledifferent!: ElementRef;
  @ViewChild('checkprice', { static: true }) public checkprice!: ElementRef;
  @ViewChild('useplusminus', { static: true }) public useplusminus!: ElementRef;
  @ViewChild('collectbottle', { static: true }) public collectbottle!: ElementRef;
  @ViewChild('thankyou', { static: true }) public thankyou!: ElementRef;
  @ViewChild('maincity', { static: false }) private scene!: ElementRef;
  @ViewChild('content', { static: false }) private content!: ElementRef;
  @ViewChild('bottlesticker', { static: false }) private bottlesticker!: ElementRef;
  @ViewChild('cartcontent', { static: false }) private cartcontent!: ElementRef;
  @ViewChild('supermarket', { static: false }) private supermarket!: ElementRef;
  @ViewChild('cartdisplay', { static: false }) private cartdisplay!: ElementRef;
  netamount = 0;
  boughtbottledata: any[] = [];
  getcurrentplacedbrand = '';
  refillbrandselected = '';
  selectquantity = 0;
  timeout: any;
  resetanimation = false;
  opensuperflag = 0;

  //bottles: string[] = [];
  bottledropped: string[] = [];
  bottletaken: string[] = [];
  commonobj: any[] = [];
  silkyvpn: string[] = [];
  shinyvpn: string[] = [];
  shinyuvpn: string[] = [];
  spikyrpn: string[] = [];
  spikyrpr: string[] = [];
  bouncyrpn: string[] = [];
  bouncyurpn: string[] = [];
  wavyurpn: string[] = [];
  wavyurpr: string[] = [];
  bottles = ['silkyvpn', 'spikyrpn', 'shiny_vpn', 'bouncyrpn']
  refillbottles = ['_SB_UB1.V_00007', '_SB_B2.R_00001', '_SB_UB3.R_00001', '_SB_UB4.R_00001']
  refilledbottles: string[] = [];
  shinyrefilling: string[] = [];
  spikyrefilling: string[] = [];
  silkyrefilling: string[] = [];
  bouncyrefilling: string[] = [];
  wavyrefilling: string[] = [];
  frontclass = '';
  leblfound = false;
  frontlabel = '';
  shapooprice = 0.0;
  totalamount = 0.0;
  droppedbottle = false;
  brandselected = false;
  quantityselected = false;
  confirmpressed = false;
  public instance: any;
  public instance1: any;
  currentUserRole: string = '';
  currentUserCartId = '';
  currentUserId = 0;
  currentusername = '';
  currentusergender = '';
  currentuseravatar = '';
  currentusercityId = '';
  objkey = Object.keys;
  positionObject = {
    'House6': [[-199, -3525], [712, 4010], [665, 3898], [614, 3807]],
    'House7': [[-443, -3538], [1049, 4010], [1003, 3898], [951, 3807]],
    'House8': [[-744, -3475], [1384, 4010], [1337, 3898], [1288, 3807]],
    'House9': [[-1053, -3468], [1718, 4010], [1674, 3898], [1626, 3807]],
    'House10': [[-1282, -3537], [2061, 4010], [2009, 3898], [1962, 3807]],
    'House1': [[-277, -3247], [712, 3584], [665, 3472], [614, 3382]],
    'House2': [[-443, -3154], [1049, 3584], [1003, 3472], [951, 3382]],
    'House3': [[-744, -3154], [1384, 3584], [1337, 3472], [1288, 3382]],
    'House4': [[-1053, -3154], [1718, 3584], [1674, 3472], [1626, 3382]],
    'House5': [[-1282, -3154], [2061, 3584], [2009, 3472], [1962, 3382]],
    'Recycling': [[-5641, -3623], [5930, 4010], [5898, 3898], [6009, 3806]],
    'Supermarket': [[-5651, -3616], [6268, 4010], [6235, 3898], [6346, 3806]],
    'Universal': [[-6360, -3606], [6945, 4010], [6910, 3898], [7020, 3806]],
    'Reverse': [[-6635, -3154], [7295, 3584], [7246, 3473], [7357, 3382]],
    'Plastic': [[-6254, -3154], [6958, 3584], [6910, 3473], [7020, 3382]],
    'Refilling': [[-6158, -3154], [6617, 3584], [6576, 3473], [6683, 3382]],
    'Bottle': [[-5762, -3154], [6279, 3584], [6235, 3473], [6346, 3382]],
    'Mayor': [[-5762, -3154], [5931, 3584], [5898, 3473], [6009, 3382]]
  }
  newmale: any[] = [];
  maleset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  user: any;
  assetdata: any;
  hasMayor = false;
  cityname: any;
  cityrate: any;
  canMoveTop = true;
  canMoveLeft = true;
  canMoveRight = true;
  canMoveBottom = true;
  topval = 0;
  cartlocrefill = '';
  setflag = 0;
  markettop = false;
  marketleft = false;
  marketright = false;
  marketbottom = false;
  refilltop = false;
  refillleft = false;
  refillright = false;
  refillbottom = false;
  cartlocmarket = '';
  deg = 90;
  whichRoad = '';
  cityCurrentTime = '';
  citycurrentday = 0;
  cityavatar = '';
  currentwallet = 0;
  showwallet = false;
  showratings = false;
  showbottles = false;
  showtransactions = false;
  altertab = 0;
  assetdataset: any[] = [];
  timeupdate = 0;
  citytiming = {
    'CurrentTime': {},
    'CurrentDay': 0
  }
  canupdatedb = false;
  sec = 0;
  transaction = {
    'TransactionId': '',
    'Amount': '',
    'DebitFacility': this.currentUserRole,
    'CreditFacility': '',
    'Purpose': ''
  }
  municipalcashbox = 0;
  supermarketcashbox = 0;
  transactioncount = '00000';
  billpaid = true;
  transactionsubcount = '00';
  updatebottleasset = {
    'currentitem': '',
    'Bottleloc': '',
    'bottlestatus': '',
    'transactionid': '',
    'fromfacility': '',
    'tofacility': '',
    'transactiondate': '',
    'purchased': false
  }
  userDetails = {
    'currentuser': '',
    'currentCartId': '',
    'CityId': '',
    'CurrentDay': ''

  }
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal) {
    this.currentUserRole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
  }
  ngOnInit(): void {
    if (this.logser.currentuser.Username != '') {
    //   sessionStorage.setItem('currentUser', JSON.stringify(this.logser.currentuser));
    // } else {
    //   let current = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    //   this.logser.currentuser = JSON.parse(JSON.stringify(current))
    //   this.currentUserRole = this.logser.currentuser.Role;
    //   this.currentUserCartId = this.logser.currentuser.cartId;
    //   this.currentusername = this.logser.currentuser.Username;
    //   this.currentusergender = this.logser.currentuser.gender;
    //   this.currentuseravatar = this.logser.currentuser.avatar;
    //   this.currentusercityId = this.logser.currentuser.CityId;
    //   this.cityCurrentTime = this.logser.currentuser.CurrentTime;
    //   this.citycurrentday = this.logser.currentuser.currentday;
    //   this.cityrate = this.logser.currentuser.cityrate;
    //   this.cityavatar = this.logser.currentuser.cityavatar;
    //   this.currentwallet = this.logser.currentuser.wallet;
    //   $(".maincity").addClass("city_" + this.cityavatar)

    // }

    this.userDetails.currentuser = this.logser.currentuser.Username;
    this.userDetails.CityId = this.logser.currentuser.CityId;
    this.userDetails.currentCartId = this.logser.currentuser.cartId;
    this.userDetails.CurrentDay = this.logser.currentuser.currentday.toString();
    // this.logser.sendUserDetails(this.userDetails).subscribe(
    //   response => {
    //     console.log('User details sent successfully');
    //   },
    //   error => {
    //     console.error('Error sending user details:', error);
    //   }
    // );
    // this.loadAvailableAsset();
    this.logser.getAllUsers().subscribe((data) => {
      this.user = data;
      for (var t = 0; t < this.user.length; t++) {
        if (this.user[t].login == 1 && this.user[t].User_cityid == this.logser.currentuser.CityId) {
          $("." + this.user[t].Role.split(" ")[0]).show();
          this.currentUserId = this.user[t].UserId;
        }
        if (this.user[t].Username == this.currentusername) {
          this.currentwallet = this.user[t].wallet;
          this.logser.currentuser.wallet = this.user[t].wallet;
        }
        if (this.user[t].Username == this.currentusername && this.user[t].avatar == '') {
          this.noavatar = true;
          if (this.noavatar == true) {
            this.open(this.content)
          }
        }
        else if (this.user[t].Username == this.currentusername && this.user[t].avatar !== '') {
          this.logser.currentuser.avatar = this.user[t].avatar;
          this.currentuseravatar = this.user[t].avatar
          $(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
        }
        if (this.user[t].Role !== '') {
          let word = this.user[t].Role.split(" ")[0];
          let xpos = this.positionObject[word as keyof typeof this.positionObject][3][0];
          let ypos = this.positionObject[word as keyof typeof this.positionObject][3][1];
          let x2 = this.positionObject[word as keyof typeof this.positionObject][2][0];
          let y2 = this.positionObject[word as keyof typeof this.positionObject][2][1];
          $(".displaypanel." + word).css({ 'left': xpos + 'px', 'top': ypos + 'px' }).html(this.user[t].Role);
          $(".housedisplay." + word).css({ 'left': x2 + 'px', 'top': y2 + 'px' }).html(this.user[t].Username).show();
          if (word == 'Supermarket' || word == 'Plastic' || word == 'Ubottle' || word == 'Reverse' || word == 'Refilling') {
            $(".commoncls." + word).html('').addClass('openlight');
          }
        }
        if (this.user[t].User_cityid == this.logser.currentuser.CityId) {
          let avatarnumber = this.user[t].avatar;
          for (var j = 0; j < this.maleset.length; j++) {
            if (this.maleset[j].toString() == avatarnumber) {
              this.maleset.splice(j, 1);
            }
          }
        }
      }
      this.newmale = this.maleset.slice(0);

    });
    this.logser.getcitynames().subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        if (data[0].MayorId != 0) {
          $(".mayorflag").show();
        }
        // this.currentTime();
      }, 500)
      this.logser.currentuser.cityname = data[0].CityName;
      this.logser.currentuser.CurrentTime = (this.convertSeconds(data[0]['CurrentTime'].toString()));
      this.logser.currentuser.currentday = data[0].CurrentDay;
      this.logser.currentuser.cityrate = data[0].cityrate;
      this.logser.currentuser.cityavatar = data[0].cityavatar;
      this.cityrate = data[0].cityrate;
      this.cityavatar = data[0].cityavatar;
      this.cityname = this.logser.currentuser.cityname;
      this.cityCurrentTime = (this.convertSeconds(data[0].CurrentTime));
      this.citycurrentday = data[0].CurrentDay;
      //(this.citycurrentday > 0) ? this.sec = (this.cityCurrentTime * 3600) + (3600 * 24 * this.citycurrentday) : this.sec = this.cityCurrentTime * 3600;
      $(".maincity").addClass("city_" + this.cityavatar)
    });

    $("body").removeClass('frontpage').removeClass('cartcontent');

    setInterval(() => { this.loadAvailableAsset() }, 10000);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  setTrue() {
    this.canMoveTop = true;
    this.canMoveBottom = true;
    this.canMoveRight = true;
    this.canMoveLeft = true;
  }

  onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  showNewComponent() {
    // Navigate to the new component route
    this.router.navigate(['/report']);
  }

  convertSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let string = hours + ':' + minutes;
    return string

  }
  loadAvailableAsset() {

    this.logser.getAllAssets().subscribe((data) => {
      this.assetdataset = [];
      this.shinyvpn = [];
      this.shinyuvpn = [];
      this.spikyrpn = [];
      this.spikyrpr = [];
      this.bouncyrpn = [];
      this.bouncyurpn = [];
      this.wavyurpn = [];
      this.wavyurpr = [];
      this.silkyvpn = [];
      for (let y = 0; y < data.length; y++) {
        this.assetdataset.push(data[y]);
        let isDragged = data[y]['dragged'];
        let isPurchased = data[y]['purchased'];
        let bottleloc = data[y]['Bottle_loc'];

        switch (true) {
          case data[y]['Content_Code'] == "B1.Shiny" && data[y]['Bottle_Code'] == "UB.V":
            let cat1 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.shinyuvpn.push(cat1);
            }
            this.updateobjects(cat1, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B1.Shiny" && data[y]['Bottle_Code'] == "B1.V":
            let cat2 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.shinyvpn.push(cat2);
            }
            this.updateobjects(cat2, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B2.Spiky" && data[y]['Bottle_Code'] == "B2.R" && data[y]['Current_Refill_Count'] == 1:
            let cat3 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.spikyrpr.push(cat3);
            }
            this.updateobjects(cat3, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B2.Spiky" && data[y]['Bottle_Code'] == "B2.R" && data[y]['Current_Refill_Count'] == 0:
            let cat4 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.spikyrpn.push(cat4);
            }
            this.updateobjects(cat4, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B3.Bouncy" && data[y]['Bottle_Code'] == "B3.R":
            let cat5 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.bouncyrpn.push(cat5);
            }
            this.updateobjects(cat5, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B3.Bouncy" && data[y]['Bottle_Code'] == "UB.R":
            let cat6 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.bouncyurpn.push(cat6);
            }
            this.updateobjects(cat6, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R" && data[y]['Current_Refill_Count'] == 1:
            let cat7 = "City" + data[y]['AssetId'] + 'atU1' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.wavyurpr.push(cat7);
            }
            this.updateobjects(cat7, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R" && data[y]['Current_Refill_Count'] == 0:
            let cat8 = "City" + data[y]['AssetId'] + 'atU0' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.wavyurpn.push(cat8);
            }
            this.updateobjects(cat8, isDragged, isPurchased, bottleloc);
            break;
          case data[y]['Content_Code'] == "B5.Silky" && data[y]['Bottle_Code'] == "B5.V":
            let cat9 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
            if (isDragged == false && bottleloc == 'Supermarket shelf') {
              this.silkyvpn.push(cat9);
            }
            this.updateobjects(cat9, isDragged, isPurchased, bottleloc);
            break;
        }
      }
      console.log(this.commonobj);
    });

    this.logser.updatecurrenttime().subscribe(
      data => {
        //console.log(data)
        this.citytiming['CurrentTime'] = this.convertSeconds(data[0]['CurrentTime']);
        this.citytiming['CurrentDay'] = data[0].CurrentDay;

      },
      error => {
        console.log(error);
      }
    );
  }
  updateobjects(cat: any, isDragged: any, isPurchased: any, bottleloc: any) {
    let existingItem = this.commonobj.findIndex(item => item.id === cat);
    if (existingItem == -1) {
      this.commonobj.push({ 'id': cat, 'status': 'available', 'location': 'Supermarket shelf' });
    }
    else {
      let currentItem = this.commonobj.findIndex(item => item.id === cat);
      if (isDragged == true && isPurchased == false && bottleloc !== 'Supermarket shelf') {
        this.commonobj[currentItem]['status'] = 'blocked';
        this.commonobj[currentItem]['location'] = bottleloc;
      }
      if (isDragged == true && isPurchased == true && bottleloc !== 'Supermarket shelf') {
        this.commonobj[currentItem]['status'] = 'purchased';
        this.commonobj[currentItem]['location'] = bottleloc;
      }
    }

  }
  checkCartPosition() {
    const topValue = parseInt($(".cart").css('top').split("px")[0]);
    const leftValue = parseInt($(".cart").css('left').split("px")[0]);
    const isWithinRange = (value: number, min: number, max: number) => value > min && value < max;

    console.log(topValue, leftValue)
    if (isWithinRange(topValue, 2723, 2789) && isWithinRange(leftValue, 5300, 5891)) {
      this.whichRoad = "refillingstation";
      this.opensuperflag = 2;
      this.openrefillingstation();
      this.setTrue();
    } else if (isWithinRange(topValue, 3524, 3640) && isWithinRange(leftValue, 5300, 7390)) {
      this.whichRoad = "mayorhouseroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 2640, 3000) && isWithinRange(leftValue, 1500, 1700)) {
      this.whichRoad = "Supermarketroad";
      this.setTrue();
      if (topValue < 2720) {
        this.opensuperflag = 1;
        this.opensupermarket();
      }
    } else if (isWithinRange(topValue, 4000, 4065) && isWithinRange(leftValue, 5300, 7390)) {
      this.whichRoad = "lowercolonyrightroad";
      console.log("helo")
      this.setTrue();
    } else if (isWithinRange(topValue, 0, 4395) && isWithinRange(leftValue, 2700, 2800)) {
      this.whichRoad = "lefthorizontalroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 0, 4395) && isWithinRange(leftValue, 5190, 5300)) {
      this.whichRoad = "rightroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 3524, 3640) && isWithinRange(leftValue, 300, 2800)) {
      this.whichRoad = "leftcolonytop";
      this.setTrue();
    } else if (isWithinRange(topValue, 4000, 4065) && isWithinRange(leftValue, 300, 2800)) {
      this.whichRoad = "leftcolonybottom";
      this.setTrue();
    } else if (isWithinRange(topValue, 2950, 3050) && isWithinRange(leftValue, 0, 7390)) {
      this.whichRoad = "municipalityroad";
      this.setTrue();
    } else {
      this.canMoveLeft = false;
      this.canMoveTop = false;
      this.canMoveBottom = false;
      this.canMoveRight = false;

      if (this.whichRoad == 'rightroad') {

        if (leftValue <= 5190) {
          this.canMoveBottom = true;
          this.canMoveTop = true;
          this.canMoveLeft = false;
          this.canMoveRight = true;
        }
        if (leftValue >= 5300) {
          this.canMoveTop = true;
          this.canMoveBottom = true;
          this.canMoveLeft = true;
          this.canMoveRight = false;
        }
        if (topValue <= 0) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = false;
          this.canMoveBottom = true;
        }
        if (topValue >= 4395) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = false;
        }
      }
      else if (this.whichRoad == 'refillingstation') {
        if (leftValue <= 5700) {
          this.canMoveBottom = true;
          this.canMoveTop = true;
          this.canMoveLeft = false;
          this.canMoveRight = true;
        }
        if (leftValue >= 5790) {
          this.canMoveTop = true;
          this.canMoveBottom = true;
          this.canMoveLeft = true;
          this.canMoveRight = false;
        }
        if (topValue <= 2789) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = false;
          this.canMoveBottom = true;
        }
        if (topValue >= 2723) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = false;
        }
      }
      else if (this.whichRoad == 'mayorhouseroad') {
        if (topValue <= 3524) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 3640) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 5300) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 7390) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "Supermarketroad") {
        if (topValue <= 2640) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 3000) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 1500) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 1700) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "lowercolonyrightroad") {
        if (topValue <= 4010) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 4065) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 5300) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 7390) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "lefthorizontalroad") {
        if (topValue <= 4010) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 4065) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 5300) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 7390) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "leftcolonytop") {
        if (topValue <= 3524) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 3640) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 300) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 2800) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "leftcolonybottom") {
        if (topValue <= 4010) {
          this.canMoveBottom = true;
          this.canMoveTop = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (topValue >= 4065) {
          this.canMoveTop = true;
          this.canMoveBottom = false;
          this.canMoveLeft = true;
          this.canMoveRight = true;
        }
        if (leftValue <= 300) {
          this.canMoveRight = true;
          this.canMoveLeft = false;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
        if (leftValue >= 2800) {
          this.canMoveRight = false;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = true;
        }
      }
      else if (this.whichRoad == "municipalityroad") {
        if (leftValue <= 0) {
          this.canMoveBottom = true;
          this.canMoveTop = true;
          this.canMoveLeft = false;
          this.canMoveRight = true;
        }
        if (leftValue >= 7390) {
          this.canMoveTop = true;
          this.canMoveBottom = true;
          this.canMoveLeft = true;
          this.canMoveRight = false;
        }
        if (topValue <= 2950) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = false;
          this.canMoveBottom = true;
        }
        if (topValue >= 3050) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = true;
          this.canMoveBottom = false;
        }
      }
    }
  }


  @HostListener('document:keydown.arrowdown', ['$event'])
  movedown($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveBottom) {
        let leftval = $(".cart").css('top');
        leftval = parseInt(leftval) + 10 + "px";
        $(".cart").css({ 'top': leftval })
      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketbottom == true) {
        let leftval = $(".supermarketcart").css('top');
        leftval = parseInt(leftval) + 50 + "px";
        $(".supermarketcart").css({ 'top': leftval })
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillbottom == true) {
        let leftval = $("#refillcart").css('top');
        leftval = parseInt(leftval) + 10 + "px";
        $("#refillcart").css({ 'top': leftval })
      }
    }
  }
  @HostListener('document:keydown.arrowup', ['$event'])
  moveup($event: any) {
    console.log(this.canMoveTop, this.canMoveBottom, this.canMoveLeft, this.canMoveRight)
    $event.stopPropagation();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveTop) {
        let leftval = $(".cart").css('top');
        leftval = parseInt(leftval) - 10 + "px";
        $(".cart").css({ 'top': leftval })
      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.markettop == true) {
        let leftval = $(".supermarketcart").css('top');
        leftval = parseInt(leftval) - 50 + "px";
        $(".supermarketcart").css({ 'top': leftval })
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refilltop == true) {
        let leftval = $("#refillcart").css('top');
        leftval = parseInt(leftval) - 10 + "px";
        $("#refillcart").css({ 'top': leftval })
      }
    }
  }
  @HostListener('document:keydown.arrowleft', ['$event'])
  moveleft($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveLeft == true) {
        let leftval = $(".cart").css('left');
        leftval = parseInt(leftval) - 10 + "px";
        $(".cart").css({ 'left': leftval })
      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketleft == true) {
        let leftval = $(".supermarketcart").css('left');
        leftval = parseInt(leftval) - 50 + "px";
        $(".supermarketcart").css({ 'left': leftval })
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillleft == true) {
        let leftval = $("#refillcart").css('left');
        leftval = parseInt(leftval) - 10 + "px";
        $("#refillcart").css({ 'left': leftval })
      }
    }
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  moveright($event: any) {

    $event.stopPropagation();

    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveRight == true) {
        let leftval = $(".cart").css('left');
        leftval = parseInt(leftval) + 10 + "px";
        $(".cart").css({ 'left': leftval })
      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketright == true) {
        let leftval = $(".supermarketcart").css('left');
        leftval = parseInt(leftval) + 50 + "px";
        $(".supermarketcart").css({ 'left': leftval })
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillright == true) {
        let leftval = $("#refillcart").css('left');
        leftval = parseInt(leftval) + 10 + "px";
        $("#refillcart").css({ 'left': leftval })
      }
    }
  }
  setrefilltrue() {
    this.refilltop = true;
    this.refillleft = true;
    this.refillright = true;
    this.refillbottom = true;
  }
  recenter() {
    this.dopanzoom((parseInt($(".cart").css('left').split('px')[0]) - 650) * -1, (parseInt($(".cart").css('top').split('px')[0]) - 300) * -1, '1');
  }
  refillcartposition() {
    let topValue = parseInt($("#refillcart").css('top').split("px")[0]);
    let leftValue = parseInt($("#refillcart").css('left').split("px")[0]);
    if (topValue > 242 && topValue < 370 && leftValue > 10 && leftValue < 1060) {
      this.cartlocrefill = "enterpoint";

      this.setrefilltrue();
    }
    else if (topValue > 370 && topValue < 410 && leftValue > 10 && leftValue < 1060) {
      this.cartlocrefill = "exitpoint";
      this.setrefilltrue();
      if (leftValue <= 40 && leftValue >= 15) {
        this.movetomaincity();
      }
    }
    else {
      this.refilltop = false;
      this.refillleft = false;
      this.refillright = false;
      this.refillbottom = false;

      if (this.cartlocrefill == 'enterpoint') {
        if (topValue <= 242) {
          this.refillbottom = true;
          this.refilltop = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (topValue >= 300) {
          this.refilltop = true;
          this.refillbottom = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (leftValue <= 10) {
          this.refillright = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillleft = false;
        }
        else if (leftValue >= 1060) {
          this.refillleft = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillright = false;
        }

      }

      else if (this.cartlocrefill == 'exitpoint') {
        if (topValue <= 370) {
          this.refillbottom = true;
          this.refilltop = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (topValue >= 410) {
          this.refilltop = true;
          this.refillbottom = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (leftValue <= 10) {
          this.refillright = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillleft = false;
        }
        else if (leftValue >= 1060) {
          this.refillleft = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillright = false;
        }
      }
    }
  }

  setmarkettrue() {
    this.markettop = true;
    this.marketleft = true;
    this.marketright = true;
    this.marketbottom = true;
  }

  supercartposition() {
    let topValue = parseInt($(".supermarketcart").css('top').split("px")[0]);
    let leftValue = parseInt($(".supermarketcart").css('left').split("px")[0]);
    if (this.setflag == 0 || this.setflag == 1) {
      if (topValue < 3533 && topValue > 3090 && leftValue > 920 && leftValue < 4900) {
        this.cartlocmarket = "nearconveyor";
        this.setmarkettrue();
      }
      else {
        this.markettop = false;
        this.marketleft = false;
        this.marketright = false;
        this.marketbottom = false;
        if (this.cartlocmarket == "nearconveyor") {
          if (topValue > 3533) {
            this.markettop = true;
            this.marketleft = true;
            this.marketright = true;
            this.marketbottom = false;
          }
          if (topValue < 3090) {
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
            this.marketbottom = true;
          }
          if (leftValue < 920) {
            this.markettop = true;
            this.marketleft = false;
            this.marketright = true;
            this.marketbottom = true;
          }
          if (leftValue > 4900) {
            this.markettop = true;
            this.marketleft = true;
            this.marketright = false;
            this.marketbottom = true;
          }
        }
      }



      if (topValue < 3533 && topValue > 3090 && leftValue > 4900 && leftValue < 5000) {
        this.cartlocmarket = "nearconveyor";
        this.setmarkettrue();

        if ($(".cart_bottle_list").children('div').length > 0 || $(".newbottle_list").children('div').length > 0) {
          this.marketright = false;
          $("#checklight2").removeClass('green')
          $("#checklight1").addClass('red');
          if (this.setflag == 0) {
            alert("Please place all items you intend to return at the mouth of the conveyor")
            this.setflag = 1;
          }
        }
        else {
          this.setflag = 2
        }
      }
    }
    if (this.setflag == 2) {
      if (leftValue > 4980 && leftValue < 5050 && topValue < 3533 && topValue > 3090) {
        $("#checklight1").removeClass('red')
        $("#checklight2").addClass('green');
        this.cartlocmarket = "supermatketentry";
        this.setmarkettrue();
        this.cityrail.nativeElement.play();
        $('#innerdoor1').animate({ 'height': '100px' }, 300);
        this.setflag = 3;
      }


    }
    if (this.setflag == 3 || this.setflag == 4) {

      if (topValue > 3090 && topValue < 3533 && leftValue > 5000 && leftValue < 11400) {
        if (this.setflag == 3) {
          if (leftValue > 5700 && leftValue < 5800) {
            this.welcomemarket.nativeElement.play();
            $("#checklight2").removeClass('green');
            this.setflag = 4;
            $('#innerdoor1').animate({ 'height': '1076px' }, 300);
          }
        }
        this.cartlocmarket = "maincorider";
        this.setmarkettrue();
      }
      else if (topValue > 1005 && topValue < 3240 && leftValue > 11250 && leftValue < 11450) {
        this.cartlocmarket = "turningcorider";
        this.setmarkettrue();
      }
      else if (topValue > 1005 && topValue < 1270 && leftValue > 6050 && leftValue < 11450) {
        this.cartlocmarket = "othercorider";
        this.setmarkettrue();
        if (topValue < 1150 && leftValue > 6600 && leftValue < 6800 && this.billpaid == false && this.bottletaken.length !== 0) {
          this.startbilling();
          this.cityrail.nativeElement.play();
        }
      }
      else if (topValue > 1005 && topValue < 1270 && leftValue > 5600 && leftValue < 6050 && this.billpaid == true) {
        this.thankyousuper.nativeElement.play();
        $(".displaymoniter").html("Thank you! Visit Again!");
        this.cartlocmarket = "cameout";
        $(".cartid_highlight").removeClass('highlight');
        $("#innerdoor2").animate({ 'height': '100px' }, 200);
      }
      else if (topValue > 1005 && topValue < 1270 && leftValue <= 5700 && leftValue > 1000) {
        this.cartlocmarket = "cameout";
        if (leftValue < 5200) {
          $("#innerdoor2").animate({ 'height': '1030px' }, 200);
        }
      }

      else if (topValue > 1005 && topValue < 1270 && leftValue < 1000) {
        this.cartlocmarket = "stopped";
        this.markettop = false;
        this.marketleft = false;
        this.marketright = false;
        this.marketbottom = false;
      }

      else {
        this.markettop = false;
        this.marketleft = false;
        this.marketright = false;
        this.marketbottom = false;
        if (this.cartlocmarket == 'maincorider') {
          if (topValue < 3090) {
            this.marketbottom = true;
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (topValue > 3400) {
            this.markettop = true;
            this.marketbottom = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (leftValue < 5000) {
            this.marketright = true;
            this.marketbottom = true;
            this.markettop = true;
            this.marketleft = false;
          }
          else if (leftValue > 11400) {
            this.marketleft = true;
            this.marketbottom = true;
            this.markettop = true;
            this.marketright = false;

          }
        }
        else if (this.cartlocmarket == 'turningcorider') {
          if (topValue < 1005) {
            this.marketbottom = true;
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (topValue > 3240) {
            this.markettop = true;
            this.marketbottom = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (leftValue < 11250) {
            this.marketright = true;
            this.markettop = true;
            this.marketbottom = true;
            this.marketleft = false;
          }
          else if (leftValue > 11450) {
            this.marketleft = true;
            this.marketright = false;
            this.markettop = true;
            this.marketbottom = true;
          }
        }
        else if (this.cartlocmarket == 'othercorider') {
          if (topValue < 1020) {
            this.marketbottom = true;
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (topValue > 1270) {
            this.markettop = true;
            this.marketbottom = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (leftValue < 6050) {
            this.marketright = true;
            this.markettop = true;
            this.marketbottom = true;
            this.marketleft = false;
          }
          else if (leftValue > 11450) {
            this.marketleft = true;
            this.marketright = false;
            this.markettop = true;
            this.marketbottom = true;
          }
        }
        else if (this.cartlocmarket == 'cameout') {
          if (topValue < 1020) {
            this.marketbottom = true;
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (topValue > 1270) {
            this.markettop = true;
            this.marketbottom = false;
            this.marketleft = true;
            this.marketright = true;
          }
          else if (leftValue < 5700 && leftValue > 1000) {
            this.marketright = false;
            this.markettop = true;
            this.marketbottom = true;
            this.marketleft = true;
          }
          else if (leftValue < 900) {
            this.marketright = false;
            this.markettop = false;
            this.marketbottom = false;
            this.marketleft = false;
          }

        }
      }
    }
  }

  switchrole() {
    this.currentrole = this.currentUserRole;
    this.dopanzoom(-3341, -2150, '1');
    $(".cart").hide();
  }
  switchcustomerrole() {
    this.currentrole = 'Customer';
    this.loadinginitialState();
    $(".cart").show();
  }
  movetomaincity() {
    this.opensuperflag = 0;
    let where = this;
    setTimeout(function () { where.dopanzoom(-4853, -2622, '1'); }, 100);
    $(".cart").css({ 'left': '5291px', 'top': '2894px' })
  }

  updateDragged: any = {
    'dragged': false,
    'purchased': false,
    'location': '',
    'currentbottle': ''
  };
  payamount() {
    if (this.billpaid == false) {


      if (this.currentwallet > this.netamount) {
        alert("User has Succifient amount for Payment");
        this.currentwallet = this.currentwallet - this.netamount;
        this.logser.currentuser.wallet = this.currentwallet;


        this.logser.updatewallet().subscribe(
          data => {
            data = this.currentwallet;
            this.paymentreceived.nativeElement.play();
            $(".displaymoniter").html("Payment Received");
            $(".tick").show();
            this.logser.gettransactions().subscribe(data => {
              this.transactioncount = '0000' + (data.length + 1);
            });

            this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_01';
            this.transaction['Amount'] = String(this.totalsupermarketbill);
            this.transaction['CreditFacility'] = 'Supermarket Owner';
            this.transaction['Purpose'] = 'Purchasing Shampoo from Supermarket';
            this.logser.createtransaction(this.transaction).subscribe(
              data => {
                this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_02';
                this.transaction['Amount'] = String(this.totalenv);
                this.transaction['CreditFacility'] = 'Municipality Office';
                this.transaction['Purpose'] = 'Environment tax for Shampoo purchase';
                this.logser.createtransaction(this.transaction).subscribe(
                  data => {
                    data = this.transaction;

                    this.updatebottleasset['bottlestatus'] = 'InUse';
                    this.updatebottleasset['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount
                    this.updatebottleasset['fromfacility'] = 'Supermarket Owner'
                    this.updatebottleasset['tofacility'] = this.currentUserRole;
                    this.updatebottleasset['transactiondate'] = String(this.citytiming['CurrentDay']);
                    this.updatebottleasset['purchased'] = true;
                    this.updatebottleasset['Bottleloc'] = this.currentUserCartId;
                    for (let i = 0; i < this.bottletaken.length; i++) {
                      this.updatebottleasset['currentitem'] = this.bottletaken[i].split("at")[0].split('City')[1];
                      this.logser.updatethisAssets(this.updatebottleasset).subscribe((data) => {
                        $(".pay").hide();
                        $(".close").show();
                        this.transactioncomplete.nativeElement.play();
                        this.billpaid = true;
                      });
                    }
                  },
                  error => {
                    console.log(error);
                  });
              },
              error => {
                console.log(error);
              });




            this.logser.getcashboxmunicipality().subscribe(data => {
              (data[0]['Cashbox'] == '') ? this.municipalcashbox = 0 : this.municipalcashbox = parseInt(data[0]['Cashbox']);
              this.municipalcashbox += this.totalenv;
              this.logser.updatecashboxmunicipality(String(this.municipalcashbox)).subscribe(data => { });
            });
            this.logser.getsupermarketcashbox().subscribe(data => {
              (data[0]['Cashbox'] == '') ? this.supermarketcashbox = 0 : this.supermarketcashbox = parseInt(data[0]['Cashbox']);
              this.supermarketcashbox += this.totalsupermarketbill;
              this.logser.updatesupermarketcashbox(String(this.supermarketcashbox)).subscribe(data => { });
            });


          },
          error => {
            console.log(error);
          }
        );
      }
      else {
        this.billpaid = true;
        alert("You have insufficient balance.Your cart is going to be empty");

        this.updateDragged['dragged'] = false;
        this.updateDragged['purchased'] = false;
        this.updateDragged['Bottleloc'] = 'Supermarket shelf';
        for (let i = 0; i < this.bottletaken.length; i++) {
          this.updateDragged['currentbottle'] = this.bottletaken[i].split("at")[0].split('City')[1];
          this.logser.updatedragged(this.updateDragged).subscribe((data) => {
            console.log(data);
            $(".pay").hide();
            $(".close").show();
            this.bottletaken.length = 0;
          });
        }
      }
    }

  }



  startbilling() {
    this.doneshopping.nativeElement.play();
    $(".cartid_highlight").addClass('highlight');
    $(".beam").show();
    $(".displaymoniter").html("Scanning");
    $(".scanneranimation").animate({ 'left': '6918px' }, 2000, () => {
      $(".scanneranimation").animate({ 'left': '6656px' }, 2000, () => {
        $(".beam").hide();
        let that = this;

        if (this.billpaid == false) {
          setTimeout(function () { that.docalculation(); }, 500);
        }
        this.cartdisplay.nativeElement.play();
        $(".displaymoniter").html("Check and pay by clicking the cart display panel");
        $(".displaycallout").show();
      });
    });
  }
  updateTime(k: any) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }

  ngAfterViewInit(): void {
    if (this.logser.currentuser.Username != '') {
      this.instance = panzoom(this.scene.nativeElement, {
        maxZoom: 3,
        minZoom: 0.3,
        bounds: true,
        boundsPadding: 1,
        smoothScroll: false,
        filterKey: function () {
          return true;
        },
        beforeWheel: function (e) {
          var shouldIgnore = !e.shiftKey;
          return shouldIgnore;
        },
        beforeMouseDown: function (e) {
          var shouldIgnore = !e.shiftKey;
          return shouldIgnore;
        }


      });

      this.loadinginitialState();
    }
  }
  loadinginitialState() {
    let a = this.currentUserRole.split(" ")[0];
    let x = this.positionObject[a as keyof typeof this.positionObject][0][0];
    let y = this.positionObject[a as keyof typeof this.positionObject][0][1];
    let x1 = this.positionObject[a as keyof typeof this.positionObject][1][0];
    let y1 = this.positionObject[a as keyof typeof this.positionObject][1][1];
    let x2 = this.positionObject[a as keyof typeof this.positionObject][2][0];
    let y2 = this.positionObject[a as keyof typeof this.positionObject][2][1];
    this.dopanzoom(x, y, '1');
    $(".cart").css({ 'left': x1 + 'px', 'top': y1 + 'px' });
    $(".housedisplay").css({ 'left': x2 + 'px', 'top': y2 + 'px' });
    $(".houselite").hide();
    //  alert(this.logser.currentuser.avatar+','+this.logser.currentuser.Username)
    //$(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
    $(".cartid").html(this.currentUserCartId);
  }

  dopanzoom(x: number, y: number, zoomlevel: string) {
    this.instance.smoothMoveTo(x, y);
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
  }

  checkrefillcondition(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('refilled')) { return false; }
    else { return true; }

  }
  checkrefilledbottle(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('refilldone')) { return false; }
    else { return true; }
  }
  checkcondition(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('B1')) { return true; }
    else { return false; }

  }
  checkshinyuniver(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('UB1')) { return true; }
    else { return false; }
  }
  checkconditionrefill(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('_SB_UB1') || item.element.nativeElement.classList.contains('_SB_B1')) { return true; }
    else { return false; }
  }
  checkspikyrpn(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('B2')) { return true; }
    else { return false; }
  }
  checkbouncyrpn(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('B3')) { return true; }
    else { return false; }
  }
  checkbouncyrpnrefill(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('_SB_B3') || item.element.nativeElement.classList.contains('_SB_UB3')) { return true; }
    else {
      return false;
    }
  }
  checkbouncyurpn(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('UB3')) { return true; }
    else { return false; }

  }
  checkwavyurpn(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('U0B4')) { return true; }
    else { return false; }
  }
  checkwavyurpr(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('U1B4')) { return true; }
    else { return false; }
  }
  checksilkyvpn(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('B5')) { return true; }
    else { return false; }
  }
  bottleclass = '';
  exit() {
    this.router.navigate(["login"]);
  }
  leavecity() {
    this.logser.leavefacility().subscribe(
      (data) => {
        this.logser.leavescity().subscribe(
          (data) => {
            this.router.navigate(["home"]);
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
  logout() {
    this.userobj.login = '0';
    this.logser.updateloggeduser(this.userobj).subscribe(
      (data) => {
        this.userobj = data;
        this.router.navigate(["login"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  junctionposition = {
    'supermarket': [1632, 2752],
    'dustbin': [3529, 3690],
    'junction_1': [2755, 4117],
    'junction_2': [2755, 3690],
    'junction_3': [2755, 3101],
    'junction_4': [5268, 4117],
    'junction_5': [5268, 3598],
    'junction_6': [5268, 3101],
    'junction_7': [1632, 3101],
    'junction_8': [],

  }
  dopanzoomsupermarket(x: number, y: number, zoomlevel: string) {
    this.instance1.zoomTo(x, y, 0.2);
    this.instance1.smoothMoveTo(x, y);
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }
  totalenv = 0;
  totalsupermarketbill = 0;
  opencart(cartcontent: any, event: any) {
    $(".displaycallout").hide();
    $("body").removeClass('frontpage').addClass('cartcontent');
    if (this.opensuperflag == 1) {
      this.altertab = 1;
    }
    this.modalService.open(cartcontent);

  }
  presentitem: any[] = []
  docalculation() {
    this.boughtbottledata = [];
    this.netamount = 0;
    this.totalenv = 0;
    this.totalsupermarketbill = 0;

    if (this.bottletaken.length > 0) {
      this.billpaid = false;
      //this.pleasecheck.nativeElement.play();
      for (let i = 0; i < this.bottletaken.length; i++) {
        //City2_SB_UBidV_00004atUB1 
        alert(this.bottletaken[i] + 'len: ' + this.bottletaken.length + 'i :' + i);
        let existingItem = this.commonobj.findIndex(item => item.id === this.bottletaken[i]);
        console.log(existingItem, this.commonobj[existingItem]['location'], this.commonobj[existingItem]['location'] == 'In' + this.currentUserCartId)
        if (this.commonobj[existingItem]['location'] == 'In' + this.currentUserCartId) {
          let getcurrent = this.bottletaken[i].split("at")[0].split('City')[1];
          this.logser.getthisAssets(getcurrent).subscribe((data) => {
            let calc = parseInt(data[0]['Content_Price']) + parseInt(data[0]['Bottle_Price']);
            let discount = calc * (parseInt(data[0]['Discount_RefillB']) / 100);
            let env = calc * (parseInt(data[0]['Env_Tax']) / 100);
            this.totalenv += env;
            let totalvalue = (calc + env) - discount;
            data[0]['Totalvalue'] = totalvalue;
            this.totalsupermarketbill += totalvalue - env;
            this.netamount += totalvalue;
            this.boughtbottledata.push(data[0]);
            //console.log(this.boughtbottledata);
          })
        }
        else {
          alert(this.bottletaken[i] + ' This Item has been picked by someone Else.');
          this.presentitem.push(this.bottletaken[i])

        }
      }
      for (let r = 0; r < this.presentitem.length; r++) {
        let existingItem = this.bottletaken.findIndex(item => item === this.presentitem[r]);
        this.bottletaken.splice(existingItem, 1);
      }
    }
    else {
      this.billpaid = true;
    }


  }
  objectKeys(obj: any) {
    return Object.keys(obj)[0];
  }
  opensticker(bottlesticker: any, event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id.split("at")[0].split("City")[1];
    let elementClass = element.className;
    this.logser.getthisAssets(elementId).subscribe((data) => {
      this.assetdata = data;
      this.frontclass = elementClass.split(" ")[1] + "_big";
      let checkuniversal = this.assetdata[0]['Bottle_Code'].split(".")[0];
      this.shapooprice = parseFloat(this.assetdata[0]['Content_Price']) / parseFloat(this.assetdata[0]['Quantity']);
      this.totalamount = parseFloat(this.assetdata[0]['Bottle_Price']) + parseFloat(this.assetdata[0]['Content_Price']) + parseFloat(this.assetdata[0]['Env_Tax'])
      if (checkuniversal == 'UB') {
        this.leblfound = true;
        this.bottleclass = "universal";
        this.frontlabel = this.assetdata[0]['Content_Code'].split(".")[1].toString().toLowerCase() + "_label";
      }
      else {
        this.leblfound = false;
        this.bottleclass = this.assetdata[0]['Content_Code'].split(".")[1];
      }

      this.modalService.open(bottlesticker);
    });




  }
  selectphoto(ind: any) {
    $(".pics").css('border', '4px solid #fff');
    $(".pic_" + ind).css('border', '4px solid #333');
    this.currentuseravatar = String(ind);
    this.logser.currentuser.avatar = String(ind);


  }
  saveavatar() {
    if (this.currentuseravatar == '') {
      alert("kindly select your Avatar")
    }
    else {
      this.logser.updateuseravatar(this.currentuseravatar).subscribe(
        (data) => {
          this.userobj = data;
          $(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
        },
        (error) => {
          //console.log(error);
        }
      );
    }
  }

  openrefillingstation() {
    this.cityrail.nativeElement.play();
    this.resetanimation = true;
    $("#refillcart").css({ 'left': '50px', 'top': '262px' });
    setTimeout(function () {
      that.welcome.nativeElement.play();
    }, 2000)
    let that = this;
    setTimeout(function () {
      that.placebottle.nativeElement.play();
    }, 5000)
  }

  initiateanimation() {
    if ($(".refilllist").children('div').length > 0 && this.droppedbottle == true) {
      this.selectbrand.nativeElement.play();
      this.refillbrandselected = '';
      $(".displaylight").removeClass('off').addClass('on');
      let getbrand = $(".refilllist").children('div')[0].classList[1];
      if (getbrand == 'UB1' || getbrand == 'B1') {
        this.getcurrentplacedbrand = 'shiny';
      }
      else if (getbrand == 'UB2' || getbrand == 'B2') {
        this.getcurrentplacedbrand = 'spiky';
      }
      else if (getbrand == 'UB3' || getbrand == 'B3') {
        this.getcurrentplacedbrand = 'bouncy';
      }
      else if (getbrand == 'UB4' || getbrand == 'B4') {
        this.getcurrentplacedbrand = 'wavy';
      }
      else if (getbrand == 'UB5' || getbrand == 'B5') {
        this.getcurrentplacedbrand = 'silky';
      }

      $(".displayboard").html("Your bottle's brand =" + this.getcurrentplacedbrand + "<br/>Select shampoo brand for refill.")
      this.brandselected = true;

    }
  }

  increament() {
    if (this.refillbrandselected != '') {
      if (this.selectquantity < 500) {
        this.selectquantity += 100;
      }
      $(".displayboard").html("Selected Quantity :" + this.selectquantity);
      let that = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () { $(".displaylight").removeClass('off').addClass('on'); that.checkprice.nativeElement.play(); that.quantityselected = true; $(".displayboard").html("Brand =" + that.refillbrandselected + "<br/>Quantity = " + that.selectquantity + "ml<br/>Price/ml = ₹…..<br/>Discount = x%<br/>Net Amount = ₹…........<br/> Please confirm the order."); }, 6000);
    }
    else {
      alert("please select the brand")
    }
  }
  decrement() {
    if (this.refillbrandselected != '') {
      if (this.selectquantity > 100) {
        this.selectquantity -= 100;
      }
      $(".displayboard").html("Selected Quantity :" + this.selectquantity);
      let that = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () { $(".displaylight").removeClass('off').addClass('on'); that.checkprice.nativeElement.play(); that.quantityselected = true; $(".displayboard").html("Brand =" + that.refillbrandselected + "<br/>Quantity = " + that.selectquantity + "ml<br/>Price/ml = ₹…..<br/>Discount = x%<br/>Net Amount = ₹…........<br/> Please confirm the order."); }, 6000);
    }
    else {
      alert("please select the brand")
    }
  }
  checkrefillselect(currentbrand: any) {
    if (this.droppedbottle == true && this.resetanimation == true) {
      this.refillbrandselected = currentbrand;
      if (this.refillbrandselected == this.getcurrentplacedbrand) {
        this.useplusminus.nativeElement.play();
        $(".displaylight").removeClass('off').addClass('on');
        $(".displayboard").html("Bottle's brand = " + this.getcurrentplacedbrand + " <br/> Shampoo brand = " + this.refillbrandselected + "<br/>Use +/- keys to specify quantity.")
      }
      else {
        this.bottledifferent.nativeElement.play();
        $(".displaylight").removeClass('off').addClass('on');
        $(".displayboard").html("Bottle's brand = " + this.getcurrentplacedbrand + " <br/> Shampoo brand = " + this.refillbrandselected + "<br/> Bottle and shampoo are of different brands. If OK,  specify quantity using  +/- keys. Else,  re-select sampoo brand.")
      }
    }
  }
  startanimation() {
    $(".displaylight").removeClass('on').addClass('off');
    $(".displayboard").html("Brand =" + this.refillbrandselected + "<br/>Quantity = " + this.selectquantity + "ml<br/>Price/ml = ₹…..<br/>Discount = x%<br/>Net Amount = ₹…........<br/> Order Confirmed. Please wait till we refill your bottle.");
    $("#pressor").animate({ 'top': '1px' }, 2000, () => {
      $("#pressor").animate({ 'top': '-10px' });
      $(".gear").addClass('icon');
      let getbrand = $(".refilllist").children('div')[0].classList[1];
      $("." + getbrand).addClass('removedcap');
      if (this.refillbrandselected == 'shiny') {
        $(".refilldropper").animate({ 'left': '44px' }, 2000, () => {
          $(".shinyfiller").show();
          $(".gear").removeClass('icon');
          let that = this; setTimeout(function () {
            $(".gear").addClass('icon');
            $(".shinyfiller").hide(); that.closecap();
          }, 2000);
        });
      }
      if (this.refillbrandselected == 'spiky') {
        $(".refilldropper").animate({ 'left': '94px' }, 2000, () => {
          $(".spikyfiller").show(); $(".gear").removeClass('icon');
          let that = this;
          setTimeout(function () {
            $(".gear").addClass('icon');
            $(".spikyfiller").hide();
            that.closecap();
          }, 2000);
        });
      }
      if (this.refillbrandselected == 'wavy') {
        $(".refilldropper").animate({ 'left': '196px' }, 2000, () => {
          $(".wavyfiller").show();
          $(".gear").removeClass('icon');
          let that = this;
          setTimeout(function () {
            $(".gear").addClass('icon');
            $(".wavyfiller").hide();
            that.closecap();
          }, 2000);
        });
      }
      if (this.refillbrandselected == 'silky') {
        $(".refilldropper").animate({ 'left': '247px' }, 2000, () => {
          $(".silkyfiller").show();
          $(".gear").removeClass('icon');
          let that = this;
          setTimeout(function () {
            $(".gear").addClass('icon');
            $(".silkyfiller").hide();
            that.closecap();
          }, 2000);
        });
      }
      if (this.refillbrandselected == 'bouncy') {
        $(".refilldropper").animate({ 'left': '145px' }, 2000, () => {
          $(".bouncyfiller").show();
          $(".gear").removeClass('icon');
          let that = this;
          setTimeout(function () {
            $(".gear").addClass('icon');
            $(".bouncyfiller").hide();
            that.closecap();
          }, 2000);
        });
      }

    })
  }
  resetrefilling() {
    this.resetanimation = true;
    this.droppedbottle = false;
    this.brandselected = false;
    this.quantityselected = false;
    this.confirmpressed = false;
    this.selectquantity = 0;
    this.refillbrandselected = '';
    this.placebottle.nativeElement.play();
    $(".refilldropper").css({ 'left': '8px' }).show();
    $(".displaylight").removeClass('off').addClass('on');
    $(".displayboard").html(' Please place your empty bottle on the conveyor.');
  }

  closecap() {
    let that = this;
    setTimeout(function () {
      $(".refilldropper").animate({ 'left': '333px' }, 3000, () => {
        $(".gear").removeClass('icon');
        $("#cappressor ").animate({ 'top': '1px' }, 2000, () => {
          $("#cappressor ").animate({ 'top': '-10px' }, 1000, () => {
            $(".displaylight").removeClass('off').addClass('on');
            $(".displayboard").html('Please collect your bottle.');
            that.collectbottle.nativeElement.play();

          });
          $(".refilldropper .refillbtl").addClass('refilled');
          let getbrand = $(".refilllist").children('div')[0].classList[1];
          $("." + getbrand).removeClass('removedcap');

        });
      });
    }, 1000);

  }
  updateonlyloc: any = {
    'currentbottle': '',
    'Bottleloc': ''
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, event.previousIndex, event.currentIndex,);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (this.opensuperflag == 1) {
        let currentlyDroped = event.item.element.nativeElement.id;
        let currentDropzone = event.container.element.nativeElement.classList;
        if (currentDropzone.contains('newbottle_list')) {
          this.billpaid = false;
          let itemid = currentlyDroped.split("at")[0].split('City')[1];
          this.logser.getthisAssets(itemid).subscribe((data) => {
            if (data[0]['dragged'] == false && data[0]['purchased'] == false) {
              this.logser.lockthisAsset(itemid).subscribe(
                response => {
                  if (response['success'] == true) {
                    this.updateonlyloc['currentbottle'] = itemid;
                    this.updateonlyloc['Bottleloc'] = 'In' + this.currentUserCartId;
                    this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
                      this.updateStatus(currentlyDroped, 'blocked', this.currentUserCartId);
                    });
                  }
                },
                error => {
                  console.error(error);
                }
              );
            }
          });
        }
        if (currentDropzone.contains('shinyuvpn_list') || currentDropzone.contains('shinyvpn_list') || currentDropzone.contains('spikyrpr_list') ||
          currentDropzone.contains('spikyrpn_list') || currentDropzone.contains('bouncyrpn_list') || currentDropzone.contains('bouncyurpn_list') ||
          currentDropzone.contains('wavyurpr_list') || currentDropzone.contains('wavyurpn_list') || currentDropzone.contains('silkyvpn_list')) {

          let itemid = currentlyDroped.split("at")[0].split('City')[1];
          this.logser.getthisAssets(itemid).subscribe((data) => {
            alert("return")
            this.updateDragged['currentbottle'] = itemid;
            this.updateDragged['Bottleloc'] = 'Supermarket shelf';
            this.updateDragged['dragged'] = false;
            this.logser.updatedragged(this.updateDragged).subscribe((data) => {
              this.updateStatus(currentlyDroped, 'available', 'Supermarket shelf');
            });
          });
        }

      }
      let that = this;
      if (this.opensuperflag == 2) {
        setTimeout(function () {
          if (($(".refilllist").children('div').length) > 0) {
            that.droppedbottle = true;
            if (that.resetanimation == true) {
              that.initiateanimation();
              that.bottledroppeded.nativeElement.play();
            }
          }
        }, 100);
        setTimeout(function () {
          if (($(".refilllist").children('div').length) == 0) {
            $(".displayboard").html('Thank you. Visit again. Please press Continue button to refill another bottle');
            that.thankyou.nativeElement.play();
            that.refillbrandselected = '';
            $(".refilldropper").css({ 'left': '8px' }).hide();
            that.resetanimation = false;
            $(".continue").show();
          }
        }, 150);
      }
    }


  }

  updateStatus(itemid: any, status: any, loc: any) {

    const existingIdIndex = this.commonobj.findIndex(item => item.id === itemid);
    console.log(existingIdIndex)
    if (existingIdIndex > 0) {
      this.commonobj[existingIdIndex]['status'] = status;
      this.commonobj[existingIdIndex]['location'] = loc;

    }
    console.log(this.commonobj)
  }
  opensupermarket() {
    this.instance1 = panzoom(this.supermarket.nativeElement, {
      maxZoom: 2,
      minZoom: 0.4,
      initialZoom: 0.4,
      bounds: true,
      boundsPadding: 1,
      smoothScroll: false,
      autocenter: true,
      filterKey: function () {
        return true;
      },
      beforeMouseDown: function (e) {
        // allow mouse-down panning only if altKey is down. Otherwise - ignore
        var shouldIgnore = !e.shiftKey;
        return shouldIgnore;
      },
      beforeWheel: function (e) {
        var shouldIgnore = !e.shiftKey;
        return shouldIgnore;
      },
      onDoubleClick: function (e) {
        return true; // tells the library to not preventDefault, and not stop propagation
      },
      onTouch: function (e) {
        return false; // tells the library to not preventDefault.
      }
    });
    let that = this;
    setTimeout(function () {
      $(".supermarketcart").css({ 'left': '927px', 'top': '3209px' });
      that.dopanzoomsupermarket(-317, -835, '0.4');
      that.setflag = 0;
    }, 300);
    $(".displaymoniter").html("");


  }
  closesupermarket() {
    $('#innerdoor3').animate({ 'height': '100px' }, 300);
    let that = this;
    setTimeout(function () {
      $(".supermarketcart").animate({ 'left': '400px' }, 1000, () => {
        that.opensuperflag = 0;
        let w = that;
        setTimeout(function () {
          w.dopanzoom(-885, -2343, '1');
          $(".maincity .cart").css({ 'top': '2900px', 'left': '1499px' });

          console.log(that.currentusertransaction);
        }, 1000);

      });

    }, 300);


  }
  currentusertransaction: any[] = [];
  loadledgerdata() {
    ////console.log(this.boughtbottledata);
    this.currentusertransaction = [];
    for (let i = 0; i < this.assetdataset.length; i++) {

      if (this.assetdataset[i]['Bottle_loc'] == this.currentUserCartId && this.assetdataset[i]['purchased'] == true) {
        this.currentusertransaction.push(this.assetdataset[i]);
      }
      else if (this.assetdataset[i]['Bottle_loc'] == 'In' + this.currentUserCartId && this.assetdataset[i]['purchased'] == false && this.assetdataset[i]['dragged'] == true) {
        this.updateDragged['dragged'] = false;
        this.updateDragged['purchased'] = false;
        this.updateDragged['Bottleloc'] = 'Supermarket shelf';
        for (let i = 0; i < this.bottletaken.length; i++) {
          this.updateDragged['currentbottle'] = this.bottletaken[i].split("at")[0].split('City')[1];
          this.logser.updatethisAssets(this.updateDragged).subscribe((data) => { });
        }
      }
    }
  }
  showbutton = false;
  selectedbottle = '';
  loadbottledata() {
    this.loadledgerdata();
    for (let i = 0; i < this.currentusertransaction.length; i++) {
      if (this.currentusertransaction[i]['Content_Code'] == "B1.Shiny" && this.currentusertransaction[i]['Bottle_Code'] == "UB.V" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'atU' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B1.Shiny" && this.currentusertransaction[i]['Bottle_Code'] == "B1.V" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'at' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B2.Spiky" && this.currentusertransaction[i]['Bottle_Code'] == "B2.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'at' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B2.Spiky" && this.currentusertransaction[i]['Bottle_Code'] == "B2.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'at' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B3.Bouncy" && this.currentusertransaction[i]['Bottle_Code'] == "B3.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'at' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B3.Bouncy" && this.currentusertransaction[i]['Bottle_Code'] == "UB.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'atU' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B4.Wavy" && this.currentusertransaction[i]['Bottle_Code'] == "UB.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'atU' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B4.Wavy" && this.currentusertransaction[i]['Bottle_Code'] == "UB.R" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'atU' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
      else if (this.currentusertransaction[i]['Content_Code'] == "B5.Silky" && this.currentusertransaction[i]['Bottle_Code'] == "B5.V" && this.currentusertransaction[i]['Bottle_Status'] == 'InUse') {
        this.currentusertransaction[i]['value'] = this.currentusertransaction[i]['AssetId'] + 'at' + this.currentusertransaction[i]['Content_Code'].split('.')[0];
      }
    }

  }
  openwhyshorter(whyshorter: any) {
    $("body").removeClass('cartcontent').addClass('frontpage');
    this.modalService.open(whyshorter);
  }
  openaboutshorter(aboutshorter: any) {
    $("body").removeClass('cartcontent').addClass('frontpage');
    this.modalService.open(aboutshorter);
  }
  opennavshorter(navigation: any) {
    $("body").removeClass('cartcontent').addClass('frontpage');
    this.modalService.open(navigation);
  }
  private intervalId: any;
  private isMoving = false;

  ngOnDestroy(): void {
    this.clearMovement();
  }


  onMouseUp(event: MouseEvent): void {
    this.clearMovement();
  }

  @HostListener('window:mouseup', ['$event'])
  onWindowMouseUp(event: MouseEvent): void {
    this.clearMovement();
  }

  moveUpbtn(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clearMovement();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveTop) {
        let leftval = $(".cart").css('top');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.checkCartPosition();
          if (this.isMoving && this.canMoveTop) {
            leftval = parseInt(leftval) - 20 + "px";
            $(".cart").css({ 'top': leftval })
          }
        }, 50);

      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.markettop == true) {
        let leftval = $(".supermarketcart").css('top');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.supercartposition();
          if (this.isMoving && this.markettop) {
            leftval = parseInt(leftval) - 20 + "px";
            $(".supermarketcart").css({ 'top': leftval })
          }
        }, 50);
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refilltop == true) {
        this.isMoving = true;
        let leftval = $("#refillcart").css('top');
        this.intervalId = setInterval(() => {
          this.refillcartposition();
          if (this.isMoving && this.refilltop) {
            leftval = parseInt(leftval) - 20 + "px";
            $("#refillcart").css({ 'top': leftval })
          }
        }, 50);
      }
    }

  }


  moveDownbtn(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clearMovement();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveBottom) {
        let leftval = $(".cart").css('top');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.checkCartPosition();
          if (this.isMoving && this.canMoveBottom) {
            leftval = parseInt(leftval) + 20 + "px";
            $(".cart").css({ 'top': leftval })
          }
        },50);

      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketbottom == true) {
        let leftval = $(".supermarketcart").css('top');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.supercartposition();
          if (this.isMoving && this.marketbottom) {
            leftval = parseInt(leftval) + 20 + "px";
            $(".supermarketcart").css({ 'top': leftval })
          }
        }, 50);
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillbottom == true) {
        this.isMoving = true;
        let leftval = $("#refillcart").css('top');
        this.intervalId = setInterval(() => {
          this.refillcartposition();
          if (this.isMoving && this.refillbottom) {
            leftval = parseInt(leftval) + 20 + "px";
            $("#refillcart").css({ 'top': leftval })
          }
        }, 50);
      }
    }

  }
  moveLeftbtn(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clearMovement();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveLeft) {
        let leftval = $(".cart").css('left');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.checkCartPosition();
          if (this.isMoving && this.canMoveLeft) {
            leftval = parseInt(leftval) - 20 + "px";
            $(".cart").css({ 'left': leftval })
          }
        }, 50);

      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketleft == true) {
        let leftval = $(".supermarketcart").css('left');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.supercartposition();
          if (this.isMoving && this.marketleft) {
            leftval = parseInt(leftval) - 20 + "px";
            $(".supermarketcart").css({ 'left': leftval })
          }
        }, 50);
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillleft == true) {
        this.isMoving = true;
        let leftval = $("#refillcart").css('left');
        this.intervalId = setInterval(() => {
          this.refillcartposition();
          if (this.isMoving && this.refillleft) {
            leftval = parseInt(leftval) - 20 + "px";
            $("#refillcart").css({ 'left': leftval })
          }
        }, 50);
      }
    }

  }
  moveRightbtn(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clearMovement();
    if (this.opensuperflag == 0) {
      this.checkCartPosition();
      if (this.canMoveRight) {
        let leftval = $(".cart").css('left');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.checkCartPosition();
          if (this.isMoving && this.canMoveRight) {
            leftval = parseInt(leftval) + 20 + "px";
            $(".cart").css({ 'left': leftval })
          }
        }, 50);

      }
    }
    else if (this.opensuperflag == 1) {
      this.supercartposition();
      if (this.marketright == true) {
        let leftval = $(".supermarketcart").css('left');
        this.isMoving = true;
        this.intervalId = setInterval(() => {
          this.supercartposition();
          if (this.isMoving && this.marketright) {
            leftval = parseInt(leftval) + 20 + "px";
            $(".supermarketcart").css({ 'left': leftval })
          }
        }, 50);
      }
    }
    else if (this.opensuperflag == 2) {
      this.refillcartposition();
      if (this.refillright == true) {
        this.isMoving = true;
        let leftval = $("#refillcart").css('left');
        this.intervalId = setInterval(() => {
          this.refillcartposition();
          if (this.isMoving && this.refillright) {
            leftval = parseInt(leftval) + 20 + "px";
            $("#refillcart").css({ 'left': leftval })
          }
        }, 50);
      }
    }

  }




  clearMovement(): void {
    this.isMoving = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}



