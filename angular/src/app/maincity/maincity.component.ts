import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { SharedServiceService } from '../services/shared-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDragEnd, CdkDropList, CdkDragStart } from '@angular/cdk/drag-drop';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})
export class MaincityComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('alertModal') alertModal!: AlertModalComponent;

  noavatar = false;
  userobj = {
    'login': '1'
  }
  currentrole = "";
  @ViewChild('trucksound', { static: true }) public trucksound!: ElementRef;
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
  @ViewChild('StopEntry', { static: false }) private StopEntry!: ElementRef;
  @ViewChild('Supermarket_Return', { static: false }) private Supermarket_Return!: ElementRef;
  @ViewChild('Thanksreturning', { static: false }) private Thanksreturning!: ElementRef;
  @ViewChild('Fine', { static: false }) private Fine!: ElementRef;
  netamount = 0;
  boughtbottledata: any[] = [];
  getcurrentplacedbrand = '';
  refillbrandselected = '';
  selectquantity = 0;
  timeout: any;
  resetanimation = false;
  opensuperflag = 0;
  currentZoomLevel = 1;
  //bottles: string[] = [];
  bottledropped: string[] = [];
  reversedBottles: string[] = [];
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
  BottleInHouseList: string[] = [];
  throwntoTruckList: string[] = [];
  refillbottles: string[] = [];
  dustbinbottles: string[] = [];
  refilledbottles: string[] = [];
  atRefillingMchn: string[] = [];
  spikyrefilling: string[] = [];
  silkyrefilling: string[] = [];
  bouncyrefilling: string[] = [];
  wavyrefilling: string[] = [];
  frontclass = '';
  status = '';
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
    'House6': [[-199, -3525], [694, 4010]],
    'House7': [[-443, -3538], [1031, 4010]],
    'House8': [[-744, -3475], [1369, 4010]],
    'House9': [[-1053, -3468], [1708, 4010]],
    'House10': [[-1282, -3537], [2044, 4010]],
    'House1': [[-277, -3247], [694, 3584]],
    'House2': [[-443, -3154], [1031, 3584]],
    'House3': [[-744, -3154], [1369, 3584]],
    'House4': [[-1053, -3154], [1708, 3584]],
    'House5': [[-1282, -3154], [2044, 3584]],
    'Recycling': [[-5641, -3623], [5931, 4010]],
    'Supermarket': [[-5651, -3616], [6268, 4010]],
    'Universal': [[-6360, -3606], [6604, 4010]],
    'Reverse': [[-6635, -3154], [7279, 3584]],
    'Plastic': [[-6254, -3154], [6943, 3584]],
    'Refilling': [[-6158, -3154], [6604, 3584]],
    'Bottle': [[-5762, -3154], [6268, 3584]],
    'Mayor': [[-5762, -3154], [5931, 3584]]
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
  currentwallet = 0.0;
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
    'DebitFacility': '',
    'CreditFacility': '',
    'Purpose': ''
  }
  municipalcashbox = 0;
  supermarketcashbox = 0;
  getrefillingstationcashbox = 0;
  transactioncount = '00000';
  billpaid = false;
  transactionsubcount = '00';
  updatebottleasset = {
    'currentitem': '',
    'Bottleloc': '',
    'bottlestatus': '',
    'transactionid': '',
    'fromfacility': '',
    'tofacility': '',
    'transactiondate': '',
    'purchased': '',
    'contentCode': '',
    'Latest_Refill_Date': ''
  }
  updatebottlereturn = {
    'currentitem': '',
    'Bottleloc': '',
    'bottlestatus': '',
    'fromfacility': '',
    'tofacility': '',
    'refunded': false,
    'transactionid': '',
    'transactiondate': ''
  }

  userDetails = {
    'currentuser': '',
    'currentCartId': '',
    'CityId': '',
    'CurrentDay': ''

  }
  currentUserPurhcased: any[] = [];

  //houseshelfList: string | CdkDropList<any> ='';
  constructor(private logser: LoginserviceService, private router: Router,
    private modalService: NgbModal, private sharedService: SharedServiceService) {
    this.currentUserRole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
  }
  private subscription!: Subscription;
  switchYesOrNo!: number; // The variable is now a number

  private hasCalledFunction = false;
  ngOnInit(): void {


    interval(1000)
      .pipe(takeWhile(() => !this.hasCalledFunction))
      .subscribe(seconds => {
        this.convertSeconds(seconds);
      });



    // this.subscription = this.sharedService.switchyesorno.subscribe((value: any) => {
    //   this.switchyesorno = value;

    // });

    if (this.logser.currentuser.Username != '') {


      this.userDetails.currentuser = this.logser.currentuser.Username;
      this.userDetails.CityId = this.logser.currentuser.CityId;
      this.userDetails.currentCartId = this.logser.currentuser.cartId;
      this.userDetails.CurrentDay = this.logser.currentuser.currentday.toString();

      this.logser.getAllUsers().subscribe((data) => {
        this.user = data;
        for (var t = 0; t < this.user.length; t++) {
          if (this.user[t].login == 1 && this.user[t].User_cityid == this.logser.currentuser.CityId) {
            $("." + this.user[t].Role.split(" ")[0]).show();
            this.currentUserId = this.user[t].UserId;
          }
          if (this.user[t].Username == this.currentusername) {
            this.currentwallet = parseFloat(this.user[t].wallet);
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
          if (this.user[t].Role !== '' && this.user[t].User_cityid == this.logser.currentuser.CityId) {
            let word = this.user[t].Role.split(" ")[0];

            $("." + word + " .displaypanel").html(this.user[t].Role);
            $("." + word + " .housedisplay").html(this.user[t].Username).show();
            $("." + word + " .houselite").show();
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

        setTimeout(() => {
          if (data[0].MayorId != 0) {
            $(".mayorflag").show();
          }
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
        $(".maincity").addClass("city_" + this.cityavatar)
      });
      //  console.log(this.currentusercityId);
      setInterval(() => { this.loadAvailableAsset() }, 10000);
      setInterval(() => { this.loadtime() }, 1000);

      this.logser.getBottlePrice().subscribe((data: any) => {
        this.bottlePrice = data;
      });
      this.logser.getShampooPrice().subscribe((data: any) => {
        this.shampooPrice = data;
      });


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
  bottlePrice: any[] = [];
  shampooPrice: any[] = [];
  onDragStart(event: DragEvent) {

    event.preventDefault();
  }
  onDragStarted(event: CdkDragStart) {

  }
  onDragEnded(event: CdkDragEnd) {

  }

  currentlydraggingitem: string = '';
  convertSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    let string = hours + ':00';
    if (hours === 6 && !this.hasCalledFunction) {
      this.runtruck();
      this.hasCalledFunction = true; // Set the flag to true
    }
    return string
  }
  runtruck() {
    this.playAudioElement(this.trucksound.nativeElement, 0.8);
    $(".truck").animate({ left: '5210px' }, 1000, () => {
      $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');
      $(".truck").animate({ top: '3680px' }, 5500, () => {
        $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');
        $(".truck").animate({ left: '7390px' }, 25000, () => {
          $(".truck").css({ transform: 'rotate(0deg)' });
          $(".truck").animate({ left: '5210px' }, 25000, () => {
            $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');
            $(".truck").animate({ top: '4070px' }, 2500, () => {
              $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');
              $(".truck").animate({ left: '7390px' }, 25000, () => {
                $(".truck").css({ transform: 'rotate(0deg)' });
                $(".truck").animate({ left: '5210px' }, 25000, () => {
                  $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');
                  $(".truck").animate({ top: '3060px' }, 5500, () => {
                    $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');
                    $(".truck").animate({ left: '2730px' }, 5500, () => {
                      $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');
                      $(".truck").animate({ top: '3680px' }, 2500, () => {
                        $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');
                        $(".truck").animate({ left: '300px' }, 25000, () => {
                          $(".truck").css({ transform: 'scaleX(-1)' });
                          $(".truck").animate({ left: '2730px' }, 25000, () => {
                            $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');
                            $(".truck").animate({ top: '4070px' }, 2500, () => {
                              $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');
                              $(".truck").animate({ left: '300px' }, 25000, () => {
                                $(".truck").css({ transform: 'scaleX(-1)' });
                                $(".truck").animate({ left: '2730px' }, 25000, () => {
                                  $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');
                                  $(".truck").animate({ top: '3060px' }, 5500, () => {
                                    $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');
                                    $(".truck").animate({ left: '5210px' }, 5500, () => {
                                      $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');
                                      $(".truck").animate({ top: '1025px' }, 5500, () => {
                                        $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');
                                        $(".truck").animate({ left: '5933px' }, 5500, () => {
                                          $(".truck").removeClass("side").addClass("cleargarbage")
                                          $(".truck").css({ transform: 'rotate(0deg)' });
                                          $(".truck").animate({ left: '5933px' }, 5500, () => {
                                            $(".truck").addClass("side").removeClass("cleargarbage")
                                          });
                                        });

                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    })


  }
  array_BottleFromConveyor: any[] = [];
  bouncyclean: any[] = [];
  spikeclean: any[] = [];
  shinyclean: any[] = [];
  collectbottlefromreturnconveyor() {
    for (let i = 0; i < this.assetdataset.length; i++) {
      if (this.assetdataset[i]['Bottle_loc'] == 'ReturnConveyor') {
        this.array_BottleFromConveyor.push(this.assetdataset[i]);
      }
    }

    //  console.log(this.array_BottleFromConveyor)
  }
  clearBounceBottles() {
    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Code'].includes('B3') && this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Dirty')) {
        this.bouncyclean.push(this.array_BottleFromConveyor[i]);

        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Bounce_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location updated to Bounce plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    } this.loadGarbageBottles();
  }
  clearSpikeBottles() {
    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Code'].includes('B2') && this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Dirty')) {
        this.spikeclean.push(this.array_BottleFromConveyor[i])
        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Spike_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to Spike plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    } this.loadGarbageBottles();
  }

  clearShinyBottles() {
    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Code'].includes('B1') && this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Dirty')) {
        this.shinyclean.push(this.array_BottleFromConveyor[i]);
        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Shiny_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to shiny plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    } this.loadGarbageBottles();
  }
  universalclean: any[] = [];
  clearUniversalBottles() {
    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Code'].includes('U') && this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Dirty')) {
        this.universalclean.push(this.array_BottleFromConveyor[i]);
        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Universal_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to Universal plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    } this.loadGarbageBottles();
  }
  clearSilkyBottles() {

    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Code'].includes('B5') && this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Dirty')) {
        this.shinyclean.push(this.array_BottleFromConveyor[i]);
        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Silky_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to silky plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    }
    this.loadGarbageBottles();
  }
  damagedclean: any[] = [];
  clearDamagedBottles() {

    for (let i = 0; i < this.array_BottleFromConveyor.length; i++) {
      if (this.array_BottleFromConveyor[i]['Bottle_Status'].includes('Damaged')) {
        this.damagedclean.push(this.array_BottleFromConveyor[i]);
        this.updateonlyloc['currentbottle'] = this.array_BottleFromConveyor[i]['AssetId'];
        this.updateonlyloc['Bottleloc'] = 'Recycling_Plant';
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to Plastic Recycling Plant");

        });
        this.array_BottleFromConveyor.splice(i, 1);
        i--;
      }
    }
    this.loadGarbageBottles();
  }
  loadGarbageBottles() {
    this.bottletoClean = [];
    for (let y = 0; y < this.array_BottleFromConveyor.length; y++) {
      let data = this.array_BottleFromConveyor;

      switch (true) {
        case data[y]['Content_Code'] == "B1.Shiny" && data[y]['Bottle_Code'] == "UB.V":
          this.bottletoClean.push(data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0]);
          break;

        case data[y]['Content_Code'] == "B3.Bouncy" && data[y]['Bottle_Code'] == "UB.R":
          this.bottletoClean.push(data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0]);
          break;
        case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R":
          this.bottletoClean.push(data[y]['AssetId'] + 'atU1' + data[y]['Content_Code'].split('.')[0]);
          break;
        case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R":
          this.bottletoClean.push(data[y]['AssetId'] + 'atU0' + data[y]['Content_Code'].split('.')[0]);
          break;
        default:
          this.bottletoClean.push(data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0]);
          break;


      }


    }
  }
  bottletoClean: any[] = [];
  callUniversalBottleClean() {
    let that = this;
    this.loadGarbageBottles();
    $(".bottleWrapper").animate({ 'width': '100%' }, 1000, () => {
      $(".bottleWrapper").animate({ 'left': '-5px', 'top': '-202px' }, 5000, () => {
        $(".bottleWrapper").animate({ 'left': '-135px' }, 2000, () => {
          for (let i = 0; i < this.bottletoClean.length; i++) {
            $("#" + this.bottletoClean[i]).removeClass().addClass('universalbottleimg bottle');
          }
          $(".bottleWrapper").animate({ 'left': '-498px' }, 2000, () => {
            $(".bottleWrapper").animate({ 'left': '80px', 'top': '-23px' }, 2000, () => {
              $(".bottleWrapper").animate({ 'width': '65%' }, 1000, () => {
                $(".bottletruck").css({ transform: 'scaleX(-1)' }).animate({ 'left': '5150px' }, 2500, () => {
                  $(".bottletruck").css({ transform: 'rotate(90deg)' }).addClass('garbagetop').removeClass('garbageside');
                  $(".bottletruck").animate({ top: '501px' }, 5000, () => {
                    $(".bottletruck").css({ transform: 'rotate(0deg)' });
                    $(".bottletruck").css({ transform: 'scaleX(-1)' }).addClass('garbageside').removeClass('garbagetop');

                    $(".bottletruck").animate({ left: '5683px' }, 5000, () => {
                      that.clearUniversalBottles();
                      const timeoutId6 = setTimeout(() => {
                        clearTimeout(timeoutId6);
                        $(".bottletruck").css({ transform: 'scaleX(1)' }).animate({ 'left': '5152px' }, 2500, () => {
                          $(".bottletruck").css({ transform: 'rotate(-90deg)' }).addClass('garbagetop').removeClass('garbageside');
                          $(".bottletruck").animate({ 'top': '935px' }, 1000, () => {
                            $(".bottletruck").css({ transform: 'scaleX(1)' }).css({ transform: 'rotate(0deg)' }).removeClass('garbagetop').addClass('garbageside');
                            $(".bottletruck").animate({ 'left': '2635px' }, 5000, () => {
                              $(".bottletruck").css({ transform: 'rotate(-90deg)' }).addClass('garbagetop').removeClass('garbageside');
                              $(".bottletruck").animate({ 'top': '3031px' }, 5000, () => {
                                $(".bottletruck").css({ transform: 'scaleX(1)' }).css({ transform: 'rotate(0deg)' }).removeClass('garbagetop').addClass('garbageside');

                                $(".bottletruck").animate({ 'left': '1462px' }, 5000, () => {
                                  $(".bottletruck").css({ transform: 'rotate(90deg)' }).addClass('garbagetop').removeClass('garbageside');
                                  $(".bottletruck").animate({ 'top': '2768px' }, 5000, () => {
                                    $(".bottletruck").css({ transform: 'scaleX( 1)' }).css({ transform: 'rotate(0deg)' }).removeClass('garbagetop').addClass('garbageside');
                                    $(".bottletruck").animate({ 'left': '1934px' }, 5000, () => { });
                                  });
                                });

                              });
                            });

                          })
                        });

                      }, 5000);
                    });

                  })
                })
              });
            });
          });
        });
      });
    })

  }
  rungarbagetruck() {

    this.playAudioElement(this.trucksound.nativeElement, 0.8);
    this.collectbottlefromreturnconveyor();
    //console.log(this.array_BottleFromConveyor)
    this.loadGarbageBottles();
    let that = this;
    $(".bottletruck").animate({ left: '1490px' }, 1500, () => {
      $(".bottletruck").addClass('garbagetop').removeClass('garbageside');
      let angle = 0;
      angle += 90; // Increase angle by 45 degrees
      $('.bottletruck').animate({ deg: angle }, {
        duration: 1000,
        step: function (now) {
          $(this).css({ transform: 'rotate(' + -now + 'deg)' });
        },
        complete: function () {
          $(".bottletruck").animate({ top: '3052px' }, 1000, () => {
            $(".bottletruck").css({ transform: 'rotate(0deg)' });
            $(".bottletruck").css({ transform: 'scaleX(-1)' }).addClass('garbageside').removeClass('garbagetop');
            $(".bottletruck").animate({ left: '2657px' }, 2000, () => {
              $(".bottletruck").css({ transform: 'rotate(90deg)' }).addClass('garbagetop').removeClass('garbageside');
              $(".bottletruck").animate({ top: '982px' }, 5000, () => {
                $(".bottletruck").css({ transform: 'rotate(0deg)' });
                $(".bottletruck").css({ transform: 'scaleX(1)' }).addClass('garbageside').removeClass('garbagetop');
                $(".bottletruck").animate({ left: '1857px' }, 2000, () => {
                  that.clearDamagedBottles();
                  const timeoutId7 = setTimeout(() => {
                    clearTimeout(timeoutId7);
                    $(".bottletruck").css({ transform: 'scaleX(-1)' }).addClass('garbageside').removeClass('garbagetop');
                    $(".bottletruck").animate({ left: '2657px' }, 2000, () => {
                      $(".bottletruck").css({ transform: 'rotate(90deg)' }).addClass('garbagetop').removeClass('garbageside');
                      $(".bottletruck").animate({ top: '482px' }, 5000, () => {
                        $(".bottletruck").css({ transform: 'rotate(0deg)' });
                        $(".bottletruck").css({ transform: 'scaleX(1)' }).addClass('garbageside').removeClass('garbagetop');
                        $(".bottletruck").animate({ left: '1897px' }, 5000, () => {

                          const timeoutId1 = setTimeout(() => {
                            that.clearBounceBottles();
                            $(".bottletruck").animate({ left: '1390px' }, 2000, () => {

                              clearTimeout(timeoutId1);
                              const timeoutId2 = setTimeout(() => {
                                that.clearSpikeBottles();
                                $(".bottletruck").animate({ left: '411px' }, 3000, () => {
                                  clearTimeout(timeoutId2);
                                  const timeoutId3 = setTimeout(() => {
                                    that.clearShinyBottles();

                                    $(".bottletruck").animate({ left: '350px' }, 500, () => {
                                      $(".bottletruck").css({ transform: 'scaleX(-1)' });
                                      clearTimeout(timeoutId3);
                                      $(".bottletruck").animate({ left: '2657px' }, 5000, () => {
                                        $(".bottletruck").css({ transform: 'rotate(-90deg)' }).addClass('garbagetop').removeClass('garbageside');
                                        $(".bottletruck").animate({ top: '959px' }, 2000, () => {
                                          $(".bottletruck").css({ transform: 'scaleX(-1)' }).addClass('garbageside').removeClass('garbagetop');
                                          $(".bottletruck").animate({ left: '5150px' }, 5000, () => {
                                            $(".bottletruck").css({ transform: 'rotate(90deg)' }).addClass('garbagetop').removeClass('garbageside');
                                            $(".bottletruck").animate({ top: '501px' }, 5000, () => {
                                              $(".bottletruck").css({ transform: 'rotate(0deg)' }).css({ transform: 'scaleX(-1)' }).addClass('garbageside').removeClass('garbagetop');
                                              $(".bottletruck").animate({ left: '6367px' }, 5000, () => {
                                                const timeoutId4 = setTimeout(() => {
                                                  that.clearSilkyBottles();
                                                  clearTimeout(timeoutId4);
                                                  $(".bottletruck").animate({ left: '7292px' }, 5000, () => {

                                                    const timeoutId5 = setTimeout(() => {

                                                      clearTimeout(timeoutId5);
                                                      $(".bottletruck").css({ transform: 'scaleX(1)' });
                                                      $(".bottletruck").animate({ left: '5150px' }, 5000, () => {
                                                        $(".bottletruck").css({ transform: 'rotate(-90deg)' }).addClass('garbagetop').removeClass('garbageside');
                                                        $(".bottletruck").animate({ top: '1556px' }, 2000, () => {
                                                          $(".bottletruck").css({ transform: 'rotate(0deg)' }).css({ transform: 'scaleX(1)' }).addClass('garbageside').removeClass('garbagetop');
                                                          $(".bottletruck").animate({ left: '4020px' }, 5000, () => {
                                                            that.callUniversalBottleClean();
                                                          });
                                                        });
                                                      });
                                                    }, 5000);
                                                  })
                                                }, 5000);

                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  }, 5000);
                                });
                              }, 5000);
                            });
                          }, 5000);
                        });

                      });
                    });

                  }, 2000);

                });

              });

            });
          });

        }
      });
    });


  }
  maxRefill: string = '';
  loadAvailableAsset() {
    if (this.logser.currentuser.Username != '') {
      $(".loadinglogo").hide();
      this.logser.getAllAssets().subscribe((data) => {
        //  console.log("Check the city elements:")
        //  console.log(data)
        this.assetdataset = [];
        this.shinyvpn = [];
        this.shinyuvpn = [];
        this.spikyrpn = [];
        this.throwntoTruckList = [];
        this.spikyrpr = [];
        this.bouncyrpn = [];
        this.bouncyurpn = [];
        this.wavyurpn = [];
        this.dustbinbottles = [];
        this.refillbottles = [];
        this.wavyurpr = [];
        this.silkyvpn = [];
        this.BottleInHouseList = [];
        this.currentUserPurhcased = [];
        for (let y = 0; y < data.length; y++) {
          this.assetdataset.push(data[y]);
          let isDragged = data[y]['dragged'];
          let bottleloc = data[y]['Bottle_loc'];
          let isPurchased = data[y]['purchased'];
          let bottle_status = data[y]['Bottle_Status'];
          let bottle_remquantity = data[y]['remQuantity'];


          switch (true) {
            case data[y]['Content_Code'] == "B1.Shiny" && data[y]['Bottle_Code'] == "UB.V":
              let cat1 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.shinyuvpn.push(cat1);
              }
              this.updateobjects(cat1, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B1.Shiny" && data[y]['Bottle_Code'] == "B1.V":
              let cat2 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.shinyvpn.push(cat2);
              }
              this.updateobjects(cat2, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B2.Spiky" && data[y]['Bottle_Code'] == "B2.R" && data[y]['Current_Refill_Count'] > 1:
              let cat3 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.spikyrpr.push(cat3);
              }
              this.updateobjects(cat3, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B2.Spiky" && data[y]['Bottle_Code'] == "B2.R" && data[y]['Current_Refill_Count'] == 0:
              let cat4 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.spikyrpn.push(cat4);
              }
              this.updateobjects(cat4, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B3.Bouncy" && data[y]['Bottle_Code'] == "B3.R":
              let cat5 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.bouncyrpn.push(cat5);
              }
              this.updateobjects(cat5, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B3.Bouncy" && data[y]['Bottle_Code'] == "UB.R":
              let cat6 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.bouncyurpn.push(cat6);
              }
              this.updateobjects(cat6, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R" && data[y]['Current_Refill_Count'] > 0:
              let cat7 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.wavyurpr.push(cat7);
              }
              this.updateobjects(cat7, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B4.Wavy" && data[y]['Bottle_Code'] == "UB.R" && data[y]['Current_Refill_Count'] == 0:
              let cat8 = "City" + data[y]['AssetId'] + 'atU' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.wavyurpn.push(cat8);
              }
              this.updateobjects(cat8, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            case data[y]['Content_Code'] == "B5.Silky" && data[y]['Bottle_Code'] == "B5.V":

              let cat9 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              if (isDragged == false && bottleloc == 'Supermarket shelf') {
                this.silkyvpn.push(cat9);
              }
              this.updateobjects(cat9, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
              break;
            default:
              let cat10 = "City" + data[y]['AssetId'] + 'at' + data[y]['Content_Code'].split('.')[0];
              this.updateobjects(cat10, isDragged, isPurchased, bottleloc, bottle_status, bottle_remquantity);
          }

        }
      });
    }

  }

  loadtime() {
    if (this.logser.currentuser.Username != '') {
      this.logser.updatecurrenttime().subscribe(
        data => {
          this.citytiming['CurrentTime'] = this.convertSeconds(data[0]['CurrentTime']);
          this.citytiming['CurrentDay'] = data[0].CurrentDay;

        },
        error => {
          console.log(error);
        }
      );
    }
  }
  updateobjects(cat: any, isDragged: any, isPurchased: any, bottleloc: any, bottle_status: any, bottle_remquantity: any) {
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
    if (bottleloc == this.currentUserCartId && bottle_remquantity == 0) {
      this.refillbottles.push(cat);
    }
    else if (bottleloc == this.currentUserCartId && bottle_remquantity > 0) {
      this.currentUserPurhcased.push(cat);
    }
    if (bottleloc == "City Dustbin") {
      this.dustbinbottles.push(cat);
    }
    if (bottleloc == "Landfill") {
      this.throwntoTruckList.push(cat);
    }
    if (bottleloc == 'House@' + this.currentUserCartId) {
      this.BottleInHouseList.push(cat);
    }
    if (bottleloc == 'House@' + this.currentUserCartId) {
      if (bottle_status == 'Empty-Dirty' && bottle_remquantity == 0) {
        $(".Inhouseshelf_bottles #" + cat).addClass('zero-empty');
      }
      if (bottle_status == 'Damaged-Empty' && bottle_remquantity == 0) {
        $(".Inhouseshelf_bottles #" + cat).addClass('Damaged-Empty');
      }
      if (bottle_status == 'Damaged-InUse' && bottle_remquantity > 0) {
        $(".Inhouseshelf_bottles #" + cat).addClass('Damaged-InUse');
      }
      this.workonflags();
      // if (bottleloc == 'Street') {
      //   $(".Inhouseshelf_bottles #" + cat).addClass('Street');
      // }
    }



  }
  checkCartPosition() {
    const topValue = parseInt($(".cart").css('top').split("px")[0]);
    const leftValue = parseInt($(".cart").css('left').split("px")[0]);
    const isWithinRange = (value: number, min: number, max: number) => value > min && value < max;

    if (isWithinRange(topValue, 2800, 2850) && isWithinRange(leftValue, 5290, 5891)) {
      this.whichRoad = "refillingstation";
      this.setTrue();
      if (this.currentUserPurhcased.length > 0) {
        this.playAudioElement(this.StopEntry.nativeElement, 0.8);
        this.alertModal.openModal("Sorry!  You are allowed to take only empty shampoo bottles inside this facility.     Please leave your non-empty bottles on the shelf at your house and come. You may also empty the bottle or throw the bottle if you wish, before entering.  Mind you! You may have to pay a fine if you throw the bottle.");

      }
      else {
        this.opensuperflag = 2;
        this.refilledbottles.length = 0;
        this.openrefillingstation();
      }
    }
    else if (isWithinRange(topValue, 2200, 2300) && isWithinRange(leftValue, 5290, 6891)) {
      this.whichRoad = "reverseVendingMachine";
      this.setTrue();
      if (this.currentUserPurhcased.length > 0) {
        this.playAudioElement(this.StopEntry.nativeElement, 0.8);
        this.alertModal.openModal("Sorry!  You are allowed to take only empty shampoo bottles inside this facility.     Please leave your non-empty bottles on the shelf at your house and come. You may also empty the bottle or throw the bottle if you wish, before entering.  Mind you! You may have to pay a fine if you throw the bottle.");

      }
      else {
        this.dopanzoom(-5250, -1862, '1');
        this.reverseVendingOperation();
      }


    } else if (isWithinRange(topValue, 3524, 3640) && isWithinRange(leftValue, 300, 7390)) {
      this.whichRoad = "mayorhouseroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 2640, 3000) && isWithinRange(leftValue, 1500, 1700)) {
      this.whichRoad = "Supermarketroad";
      this.setTrue();
      if (topValue < 2720) {
        if (this.currentUserPurhcased.length > 0) {
          this.playAudioElement(this.StopEntry.nativeElement, 0.8);
          this.alertModal.openModal("Sorry!  You are allowed to take only empty shampoo bottles inside this facility.     Please leave your non-empty bottles on the shelf at your house and come. You may also empty the bottle or throw the bottle if you wish, before entering.  Mind you! You may have to pay a fine if you throw the bottle.");

        }
        else {
          this.playAudioElement(this.Supermarket_Return.nativeElement, 0.8);
          this.opensuperflag = 1;

          this.opensupermarket();
        }

      }
    } else if (isWithinRange(topValue, 4000, 4065) && isWithinRange(leftValue, 5300, 7390)) {
      this.whichRoad = "lowercolonyrightroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 0, 4395) && isWithinRange(leftValue, 2700, 2800)) {
      this.whichRoad = "lefthorizontalroad";
      this.setTrue();
    } else if (isWithinRange(topValue, 0, 4395) && isWithinRange(leftValue, 5190, 5300)) {

      if (isWithinRange(topValue, 2800, 2850) && isWithinRange(leftValue, 5300, 5891)) {
        if (this.opensuperflag != 2) {
          this.opensuperflag = 2;
          this.openrefillingstation();
        }
        this.setTrue(); this.whichRoad = "refillingstation";
      }
      else if (isWithinRange(topValue, 2200, 2300) && isWithinRange(leftValue, 5300, 5891)) {
        this.dopanzoom(-5250, -1862, '1');
        this.setTrue(); this.whichRoad = "reverseVendingMachine";
        this.reverseVendingOperation();
      }
      else {
        this.whichRoad = "rightroad";
        this.setTrue();
      }
    } else if (isWithinRange(topValue, 4000, 4065) && isWithinRange(leftValue, 300, 2800)) {
      this.whichRoad = "leftcolonybottom";
      this.setTrue();
    } else if (isWithinRange(topValue, 2950, 3050) && isWithinRange(leftValue, 0, 5400)) {
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

      else if (this.whichRoad == 'reverseVendingMachine') {
        if (leftValue <= 5290) {
          this.canMoveBottom = true;
          this.canMoveTop = true;
          this.canMoveLeft = false;
          this.canMoveRight = true;
        }
        if (leftValue >= 6891) {
          this.canMoveTop = true;
          this.canMoveBottom = true;
          this.canMoveLeft = true;
          this.canMoveRight = false;
        }
        if (topValue <= 2300) {
          this.canMoveRight = true;
          this.canMoveLeft = true;
          this.canMoveTop = false;
          this.canMoveBottom = true;
        }
        if (topValue >= 2200) {
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
        if (leftValue <= 300) {
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
        if (leftValue <= 2700) {
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
        if (leftValue >= 5400) {
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
    // console.log(this.whichRoad)
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
    if (this.opensuperflag == 0) {
      this.dopanzoom((parseInt($(".cart").css('left').split('px')[0]) - 650) * -1, (parseInt($(".cart").css('top').split('px')[0]) - 300) * -1, '1');
    }
    if (this.opensuperflag == 1) {
      this.dopanzoomsupermarket((parseInt($(".supermarketcart").css('left').split('px')[0]) - 500) * -1, (parseInt($(".supermarketcart").css('top').split('px')[0]) - 300) * -1, '1');
    }

  }

  zoomIn(event: any) {

    event.preventDefault();
    event.stopPropagation();
    if (this.opensuperflag == 0) {
      let c = this.instance.getTransform();
      let r = c.scale;
      if (r < 2.5 && r > 0.25) {

        let s = r + 0.1;
        this.instance.zoomTo(0, 0, s);
        this.instance.getTransform().scale = s;
      }
    }
    else if (this.opensuperflag == 1) {
      let c = this.instance1.getTransform();
      let r = c.scale;
      if (r < 2.5 && r > 0.25) {

        let s = r + 0.1;
        this.instance1.zoomTo(0, 0, s);
        this.instance1.getTransform().scale = s;
      }
    }
  }
  zoomOut(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.opensuperflag == 0) {
      let c = this.instance.getTransform();
      let r = c.scale;
      if (r > 0.4 && r < 2.5) {

        let z = r - 0.1;
        this.instance.zoomTo(0, 0, z);
        this.instance.getTransform().scale = z;
      }
    }
    else if (this.opensuperflag == 1) {
      let c = this.instance1.getTransform();
      let r = c.scale;
      if (r > 0.4 && r < 2.5) {

        let z = r - 0.1;
        this.instance1.zoomTo(0, 0, z);
        this.instance1.getTransform().scale = z;
      }
    }
  }

  refillcartposition() {
    let topValue = parseInt($("#refillcart").css('top').split("px")[0]);
    let leftValue = parseInt($("#refillcart").css('left').split("px")[0]);

    if (leftValue <= 40 && leftValue >= 15 && topValue > 242 && topValue < 292) {
      this.movetomaincity();
    }
    if (topValue < 350 && topValue > 310 && leftValue > 10 && leftValue < 1060) {
      this.cartlocrefill = "enterpoint";
      this.resetrefilling();
      this.setrefilltrue();
    }
    else if (topValue > 242 && topValue < 292 && leftValue > 30 && leftValue < 1060) {
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
        if (topValue >= 310) {
          this.refillbottom = true;
          this.refilltop = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (topValue <= 350) {
          this.refilltop = true;
          this.refillbottom = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (leftValue >= 10) {
          this.refillright = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillleft = false;
        }
        else if (leftValue <= 1060) {
          this.refillleft = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillright = false;
        }

      }

      else if (this.cartlocrefill == 'exitpoint') {
        if (topValue <= 242) {
          this.refillbottom = true;
          this.refilltop = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (topValue >= 292) {
          this.refilltop = true;
          this.refillbottom = false;
          this.refillleft = true;
          this.refillright = true;
        }
        else if (leftValue >= 10) {
          this.refillright = true;
          this.refillbottom = true;
          this.refilltop = true;
          this.refillleft = false;
        }
        else if (leftValue <= 1060) {
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
      else if ((topValue < 3089 && topValue > 1040 && leftValue > 930 && leftValue < 1130)) {
        this.cartlocmarket = "exiting";
        this.setmarkettrue();
        if (leftValue < 1120 && topValue < 1100) {
          this.closesupermarket()

        }
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
        if (this.cartlocmarket == "exiting") {
          if (topValue > 3089) {
            this.markettop = true;
            this.marketleft = true;
            this.marketright = true;
            this.marketbottom = false;
          }
          if (topValue < 1040) {
            this.markettop = false;
            this.marketleft = true;
            this.marketright = true;
            this.marketbottom = true;
          }
          if (leftValue < 930) {
            this.markettop = true;
            this.marketleft = false;
            this.marketright = true;
            this.marketbottom = true;
          }
          if (leftValue > 1130) {
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
        // if ($(".cart_bottle_list").children('div').length > 0 || $(".newbottle_list").children('div').length > 0) {
        if ($(".cart_bottle_list").children('div').length > 0) {
          this.marketright = false;
          $("#checklight2").removeClass('green')
          $("#checklight1").addClass('red');
          $("#innerdoor1").css('background-color', '#bc0000');

          if (this.setflag == 0) {
            this.alertModal.openModal("Please place all items you intend to return at the mouth of the conveyor");
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
        $("#innerdoor1").css('background-color', '#00ba00');
        this.setmarkettrue();
        this.playAudioElement(this.cityrail.nativeElement, 0.3);

        $('#innerdoor1').animate({ 'height': '100px' }, 300);
        this.setflag = 3;
      }


    }
    if (this.setflag == 3 || this.setflag == 4) {

      if (topValue > 3090 && topValue < 3533 && leftValue > 5000 && leftValue < 11400) {
        if (this.setflag == 3) {
          if (leftValue > 5700 && leftValue < 5800) {
            this.playAudioElement(this.welcomemarket.nativeElement, 0.8);
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
          this.playAudioElement(this.cityrail.nativeElement, 0.3);
        }
      }
      else if (topValue > 1005 && topValue < 1270 && leftValue > 5600 && leftValue < 6050 && this.billpaid == true) {

        this.playAudioElement(this.thankyousuper.nativeElement, 0.8);
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
        if (leftValue <= 1070) {
          this.closesupermarket()

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
    //console.log(this.cartlocmarket)
  }


  movetomaincity() {
    this.opensuperflag = 0;
    let where = this;
    setTimeout(function () {
      where.dopanzoom(-4853, -2622, '1');
      where.resetrefilling();
      where.setrefilltrue();
    }, 100);
    $(".cart").css({ 'left': '5310px', 'top': '2760px' })
  }

  updateDragged: any = {
    'dragged': false,
    'purchased': false,
    'location': '',
    'currentbottle': ''
  };
  payamount() {
    if (this.billpaid == false && this.opensuperflag == 1) {


      if (this.currentwallet > this.netamount) {

        this.currentwallet = this.currentwallet - this.netamount;
        this.logser.currentuser.wallet = this.currentwallet;


        this.logser.updatewallet().subscribe(
          data => {
            data = this.currentwallet;
            this.playAudioElement(this.paymentreceived.nativeElement, 0.8);
            $(".displaymoniter").html("Payment Received");
            $(".tick").show();
            this.logser.gettransactions().subscribe(data => {
              this.transactioncount = '0000' + (data.length + 1);


              this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_01';
              this.transaction['Amount'] = String(this.totalsupermarketbill);
              this.transaction['CreditFacility'] = 'Supermarket Owner';
              this.transaction['DebitFacility'] = this.currentUserRole;
              this.transaction['Purpose'] = 'Purchasing Shampoo from Supermarket';
              this.logser.createtransaction(this.transaction).subscribe(
                data => {
                  this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_02';
                  this.transaction['Amount'] = String(this.totalenv);
                  this.transaction['CreditFacility'] = 'Municipality Office';
                  this.transaction['DebitFacility'] = this.currentUserRole;
                  this.transaction['Purpose'] = 'Environment tax for Shampoo purchase';
                  this.logser.createtransaction(this.transaction).subscribe(
                    data => {
                      data = this.transaction;

                      this.updatebottleasset['bottlestatus'] = 'InUse';
                      this.updatebottleasset['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_01';;
                      this.updatebottleasset['fromfacility'] = 'Supermarket Owner'
                      this.updatebottleasset['tofacility'] = this.currentUserRole;
                      this.updatebottleasset['transactiondate'] = String(this.citytiming['CurrentDay']);
                      this.updatebottleasset['purchased'] = 'true';
                      this.updatebottleasset['Bottleloc'] = this.currentUserCartId;
                      for (let i = 0; i < this.bottletaken.length; i++) {
                        this.updatebottleasset['currentitem'] = this.bottletaken[i].split("at")[0].split('City')[1];
                        this.logser.updatethisAssets(this.updatebottleasset).subscribe((data) => {
                          // $(".pay").hide();
                          $(".close").show();
                          this.playAudioElement(this.transactioncomplete.nativeElement, 0.8);
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
        this.alertModal.openModal("Your Balance is : Rs." + this.currentwallet.toFixed(2) + "You have insufficient balance.Return some bottles as per your Balance");
        //this.billpaid = true;
        // alert("You have insufficient balance.Your cart is going to be empty");

        // this.updateDragged['dragged'] = false;
        // this.updateDragged['purchased'] = false;
        // this.updateDragged['Bottleloc'] = 'Supermarket shelf';
        // for (let i = 0; i < this.bottletaken.length; i++) {
        //   this.updateDragged['currentbottle'] = this.bottletaken[i].split("at")[0].split('City')[1];
        //   this.logser.updatedragged(this.updateDragged).subscribe((data) => {
        //     $(".pay").hide();
        //     $(".close").show();
        //     this.bottletaken.length = 0;
        //   });
        // }
      }
    }

  }



  startbilling() {
    this.playAudioElement(this.doneshopping.nativeElement, 0.8);
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
        this.playAudioElement(this.cartdisplay.nativeElement, 0.8);
        $(".displaymoniter").html("Check and pay by clicking the cart display panel");
        $(".displaycallout").show();
      });
    });
  }


  ngAfterViewInit(): void {
    if (this.logser.currentuser.Username != '') {
      this.instance = panzoom(this.scene.nativeElement, {
        maxZoom: 3,
        minZoom: 0.3,
        bounds: true,
        boundsPadding: 1,
        smoothScroll: true,
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
        },
        onDoubleClick: function (e) {
          return false; // tells the library to not preventDefault, and not stop propagation
        }


      });
      this.subscription = this.sharedService.switchYesOrNo$.subscribe(value => {
        this.switchYesOrNo = value;
        if (this.switchYesOrNo == 2) {
          this.dopanzoom(-3341, -2150, '1');
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
    this.dopanzoom(x, y, '1');
    //this.dopanzoom(-1057.16, -2306.8, '1');
    $("." + a + ".bottleStore").css({ 'left': (x1 - 31) + 'px', 'top': (y1 - 87) + 'px' });
    $(".cart").css({ 'left': x1 + 'px', 'top': y1 + 'px' });
    $(".houselite").hide();
    $(".cartid").html(this.currentUserCartId);
    let that = this;



  }



  dopanzoom(x: number, y: number, zoomlevel: string) {

    this.instance.smoothMoveTo(x, y);
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
  }

  checkrefillcondition(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('refilled')) { return false; }
    else { return true; }

  }
  checkrefilledcondition(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('refilled')) { return true; }
    else { return false; }

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
  checkamountdetect(item: CdkDrag<string>) {
    if (!item.element.nativeElement.classList.contains('Amountcredited')) { return true; }
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
  stepheight = 0.0;
  totalheight = 0.0;
  totalsupermarketbill = 0;
  opencart(cartcontent: any, event: any) {
    this.altertab = 0;
    $(".displaycallout").hide();
    $('.btncont,.shampoolevel').show();
    if (this.opensuperflag == 1) {
      this.altertab = 1;
    }

    this.calculatenetfine();
    this.loadledgerdata();
    this.checkthebottlestatusfordisplay();
    this.modalService.open(cartcontent, { windowClass: 'cartcontent' });

  }
  cashflowdata: any = [];
  showcashflow() {
    this.cashflowdata = [];
    this.logser.gettransactions().subscribe(data => {
      for (let t = 0; t < data.length; t++) {
        let getcityId = data[t]['TransactionId'].split("_")[0];

        if (getcityId == this.currentusercityId && (data[t]['DebitFacility'] == this.currentUserRole || data[t]['CreditFacility'] == this.currentUserRole && data[t]['DebitFacility'] == 'Return Conveyor' || data[t]['CreditFacility'] == this.currentUserRole && data[t]['DebitFacility'] == 'Reverse Vending ')) {
          this.cashflowdata.push(data[t]);
        }


      }
      // console.log("Cashflow data");
      // console.log(this.cashflowdata)
    });
  }
  presentitem: any[] = []
  docalculation() {
    this.boughtbottledata = [];
    this.netamount = 0;
    this.totalenv = 0;
    this.totalsupermarketbill = 0;

    if (this.bottletaken.length > 0) {
      this.billpaid = false;
      for (let i = 0; i < this.bottletaken.length; i++) {
        let existingItem = this.commonobj.findIndex(item => item.id === this.bottletaken[i]);
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
          })
        }
        else {
          this.alertModal.openModal(this.bottletaken[i] + ' This Item has been picked by someone Else.');
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
      this.alertModal.openModal("kindly select your Avatar")
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
    this.playAudioElement(this.cityrail.nativeElement, 0.8);
    this.resetanimation = true;
    $("#refillcart").css({ 'left': '50px', 'top': '332px' });
    setTimeout(function () {
      that.playAudioElement(that.welcome.nativeElement, 0.8);

    }, 2000)
    let that = this;
    setTimeout(function () {
      that.playAudioElement(that.placebottle.nativeElement, 0.8);
    }, 5000)
  }

  initiateanimation(placedBottle: string) {
    if (this.droppedbottle == true) {
      this.playAudioElement(this.selectbrand.nativeElement, 0.8);
      this.refillbrandselected = '';
      $(".displaylight").removeClass('off').addClass('on');
      this.getbrandfunction(placedBottle);
      $(".displayboard").html("Your bottle's brand =" + this.getcurrentplacedbrand + "<br/>Select shampoo brand for refill.")
      this.brandselected = true;

    }
  }
  getdetailbrandfunction(placedBottle: string) {

    let getbrand = placedBottle.split("at")[1];
    if (getbrand == 'B1') {
      this.getcurrentplacedbrand = 'B1.Shiny';
    }
    else if (getbrand == 'B2') {
      this.getcurrentplacedbrand = 'B2.Spiky';
    }
    else if (getbrand == 'B3') {
      this.getcurrentplacedbrand = 'B3.Bouncy';
    }
    else if (getbrand == 'B4') {
      this.getcurrentplacedbrand = 'B4.Wavy';
    }
    else if (getbrand == 'B5') {
      this.getcurrentplacedbrand = 'B5.Silky';
    }
    else if (getbrand == 'UB1' || getbrand == 'UB2' || getbrand == 'UB3' || getbrand == 'UB4' || getbrand == 'UB5') {
      this.getcurrentplacedbrand = 'Universal';
    }

  }
  getbrandfunction(placedBottle: string) {
    let getbrand = placedBottle.split("at")[1];
    if (getbrand == 'UB1' || getbrand == 'B1') {
      this.getcurrentplacedbrand = 'B1.Shiny';
    }
    else if (getbrand == 'UB2' || getbrand == 'B2') {
      this.getcurrentplacedbrand = 'B2.Spiky';
    }
    else if (getbrand == 'UB3' || getbrand == 'B3') {
      this.getcurrentplacedbrand = 'B3.Bouncy';
    }
    else if (getbrand == 'UB4' || getbrand == 'B4') {
      this.getcurrentplacedbrand = 'B4.Wavy';
    }
    else if (getbrand == 'UB5' || getbrand == 'B5') {
      this.getcurrentplacedbrand = 'B5.Silky';
    }

  }
  increament() {
    if (this.refillbrandselected != '') {
      if (this.selectquantity < 500) {
        this.selectquantity += 100;
      }
      $(".displayboard").html("Selected Quantity :" + this.selectquantity);
      let that = this;
      this.calculaterefillAmount();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {

        $(".displaylight").removeClass('off').addClass('on'); that.playAudioElement(that.checkprice.nativeElement, 0.8); that.quantityselected = true; $(".displayboard").html("Brand =" + that.refillbrandselected + "<br/>Quantity = " + that.selectquantity + "ml<br/>Price/ml = ₹" + that.unitprice + "<br/>Discount = " + that.currentDiscount + "%<br/>Net Amount = ₹ " + that.refill_amount_topay + "<br/> Please confirm the order.");
      }, 6000);
    }
    else {
      this.alertModal.openModal("please select the brand")
    }
  }
  calculaterefillAmount() {

    for (let r = 0; r < this.shampooPrice.length; r++) {
      if (this.shampooPrice[r]['BottleContent'] == this.refillbrandselected) {
        this.refill_amount_topay = this.selectquantity * this.shampooPrice[r]['UnitPrice'] * (this.shampooPrice[r]['Discount'] / 100)
        this.unitprice = this.shampooPrice[r]['UnitPrice'];
        this.currentDiscount = this.shampooPrice[r]['Discount'];
      }

    }
  }
  decrement() {
    if (this.refillbrandselected != '') {
      if (this.selectquantity > 100) {
        this.selectquantity -= 100;
      }
      $(".displayboard").html("Selected Quantity :" + this.selectquantity);
      let that = this;
      this.calculaterefillAmount();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        $(".displaylight").removeClass('off').addClass('on');
        that.playAudioElement(that.checkprice.nativeElement, 0.8); that.quantityselected = true; $(".displayboard").html("Brand =" + that.refillbrandselected + "<br/>Quantity = " + that.selectquantity + "ml<br/>Price/ml = ₹" + that.unitprice + "<br/>Discount = " + that.currentDiscount + "%<br/>Net Amount = ₹" + that.refill_amount_topay + "<br/> Please confirm the order.");
      }, 6000);
    }
    else {
      this.alertModal.openModal("please select the brand")
    }
  }
  unitprice = 0;
  currentDiscount = 0;
  checkrefillselect(currentbrand: any) {


    if (this.droppedbottle == true && this.resetanimation == true) {
      this.refillbrandselected = currentbrand;
      if (this.refillbrandselected == this.getcurrentplacedbrand) {
        this.playAudioElement(this.useplusminus.nativeElement, 0.8);
        $(".displaylight").removeClass('off').addClass('on');
        $(".displayboard").html("Bottle's brand = " + this.getcurrentplacedbrand + " <br/> Shampoo brand = " + this.refillbrandselected + "<br/>Use +/- keys to specify quantity.")
      }
      else {
        this.playAudioElement(this.bottledifferent.nativeElement, 0.8);
        $(".displaylight").removeClass('off').addClass('on');
        $(".displayboard").html("Bottle's brand = " + this.getcurrentplacedbrand + " <br/> Shampoo brand = " + this.refillbrandselected + "<br/> Bottle and shampoo are of different brands. If OK,  specify quantity using  +/- keys. Else,  re-select sampoo brand.")
      }
    }
  }
  refill_amount_topay = 0;
  startrefillinganimation() {
    $(".displaylight").removeClass('on').addClass('off');
    if (this.currentwallet > this.refill_amount_topay) {
      this.currentwallet = this.currentwallet - this.refill_amount_topay;
      this.logser.currentuser.wallet = this.currentwallet;

      this.logser.updatewallet().subscribe(
        data => {
          data = this.currentwallet;
          this.playAudioElement(this.paymentreceived.nativeElement, 0.8);
          let transactioncount = '';
          this.logser.gettransactions().subscribe(data => {
            transactioncount = '0000' + (data.length + 1);

            this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_03';
            this.transaction['Amount'] = String(this.refill_amount_topay);
            this.transaction['CreditFacility'] = 'Refilling Station';
            this.transaction['DebitFacility'] = this.currentUserRole;
            this.transaction['Purpose'] = 'Refilling shampoo from the Refilling Station';
            this.logser.createtransaction(this.transaction).subscribe(
              data => {
                data = this.transaction;

                this.updatebottleasset['bottlestatus'] = 'InUse';
                this.updatebottleasset['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + this.transactioncount + '_03';
                this.updatebottleasset['fromfacility'] = 'Refilling Station'
                this.updatebottleasset['tofacility'] = this.currentUserRole;
                this.updatebottleasset['transactiondate'] = String(this.citytiming['CurrentDay']);
                this.updatebottleasset['Latest_Refill_Date'] = String(this.citytiming['CurrentDay']);
                this.updatebottleasset['Bottleloc'] = this.currentUserCartId;
                this.updatebottleasset['contentCode'] = this.refillbrandselected;
                this.updatebottleasset['currentitem'] = this.currentlyrefillingBottle.split("at")[0].split('City')[1];
                this.logser.updatethisAssets(this.updatebottleasset).subscribe((data) => {
                  this.playAudioElement(this.transactioncomplete.nativeElement, 0.8);
                });

              },
              error => {
                console.log(error);
              });
          });


        },
        error => {
          console.log(error);
        });




      this.logser.getrefillingstationcashbox().subscribe(data => {

        (data[0]['Cashbox'] == '') ? this.getrefillingstationcashbox = 0 : this.getrefillingstationcashbox = parseInt(data[0]['Cashbox']);
        this.getrefillingstationcashbox += this.refill_amount_topay;
        this.logser.updaterefillingcashbox(String(this.getrefillingstationcashbox)).subscribe(data => { });
      });



    }
    else {
      this.alertModal.openModal("You have Insuccifient Balance");
    }
    $(".displayboard").html("Brand =" + this.refillbrandselected + "<br/>Quantity = " + this.selectquantity + "ml<br/>Price/ml = ₹" + this.unitprice + "<br/>Discount = "+this.currentDiscount+"%<br/>Net Amount = ₹" + this.refill_amount_topay + "<br/> Order Confirmed. Please wait till we refill your bottle.");
    $("#pressor").animate({ 'top': '1px' }, 2000, () => {
      $("#pressor").animate({ 'top': '-10px' });
      $(".gear").addClass('icon');
      let getbrand = $(".refilllist").children('div')[0].classList[1];
      $("." + getbrand).addClass('removedcap');
      if (this.refillbrandselected == 'B1.Shiny') {
        $(".refilldropper").animate({ 'left': '44px' }, 2000, () => {
          $(".shinyfiller").show();
          $(".gear").removeClass('icon');
          let that = this; setTimeout(function () {
            $(".gear").addClass('icon');
            $(".shinyfiller").hide(); that.closecap();
          }, 2000);
        });
      }
      if (this.refillbrandselected == 'B2.Spiky') {
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
      if (this.refillbrandselected == 'B4.Wavy') {
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
      if (this.refillbrandselected == 'B5.Silky') {
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
      if (this.refillbrandselected == 'B3.Bouncy') {
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
    this.getcurrentplacedbrand = '';
    this.confirmpressed = false;
    this.selectquantity = 0;

    this.refillbrandselected = '';
    this.playAudioElement(this.placebottle.nativeElement, 0.8);
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
            that.playAudioElement(that.collectbottle.nativeElement, 0.8);

          });

          let getbrand = $(".refilllist").children('div')[0].classList[1];
          $("." + getbrand).removeClass('removedcap');
          $(".refilldropper .refillbtl").addClass('refilled');

        });
      });
    }, 1000);

  }
  updateonlyloc: any = {
    'currentbottle': '',
    'Bottleloc': ''
  }

  Inhouseshelf_bottles: string[] = [];
  newbottle_list: string[] = [];
  cart_bottle_list: string[] = [];
  dustbin_bottles: string[] = [];
  truckContList: string[] = [];
  boughtdrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer item between containers
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Get the currently dropped item's ID and dropzone class
      let currentlyDroped = event.item.element.nativeElement.id;
      let currentDropzone = event.container.element.nativeElement.classList;

      // Extract bottle ID from the element ID
      let bottleId = currentlyDroped.split('City')[1].split("at")[0];

      if (currentDropzone.contains('Inhouseshelf_bottles')) {
        // Update bottle location to house
        this.updateonlyloc['currentbottle'] = bottleId;
        this.updateonlyloc['Bottleloc'] = 'House@' + this.currentUserCartId;

        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("Bottle location updated to house");

          // Explicitly update the dropzone list
          this.Inhouseshelf_bottles = [...event.container.data];
        });

      } else if (currentDropzone.contains('newbottle_list') || currentDropzone.contains('cart_bottle_list')) {
        // Update bottle location to the cart
        this.updateonlyloc['currentbottle'] = bottleId;
        this.updateonlyloc['Bottleloc'] = this.currentUserCartId;

        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("Bottle location updated to cart");

          // Explicitly update the relevant dropzone list
          (this as any)[event.container.element.nativeElement.classList[0]] = [...event.container.data];
          console.log('Updated dropzone list:', (this as any)[event.container.element.nativeElement.classList[0]]);

        });

      } else if (currentDropzone.contains('dustbin_bottles')) {
        // Handle the bottle being dropped into the dustbin
        this.logser.getthisAssets(bottleId).subscribe((data) => {
          this.updatebottlereturn['currentitem'] = bottleId;
          this.updatebottlereturn['Bottleloc'] = "City Dustbin";
          this.updatebottlereturn['bottlestatus'] = data[0]['Bottle_Status'];
          this.updatebottlereturn['fromfacility'] = this.currentUserRole;
          this.updatebottlereturn['tofacility'] = 'Municipality Office';


          let amount_fine = 0.0;
          // Calculate the fine
          for (let i = 0; i < this.bottlePrice.length; i++) {
            if (this.bottlePrice[i]['BottleType'] == currentlyDroped.split('id')[0].split('_')[2] + '.' + currentlyDroped.split('id')[1].split('_')[0]) {
              amount_fine = parseFloat(this.bottlePrice[i]['OriginalPrice']) * 0.5;
              break;
            }
          }

          if (this.currentwallet > amount_fine) {
            this.alertModal.openModal("A fine of ₹" + amount_fine + " has been charged for this offense");
            this.currentwallet = this.currentwallet - amount_fine;
            this.logser.currentuser.wallet = this.currentwallet;

            this.logser.updatewallet().subscribe(
              data => {
                data = this.currentwallet;
                this.playAudioElement(this.Fine.nativeElement, 0.8);

                // Handle the transaction for the fine
                this.logser.gettransactions().subscribe(data => {
                  let transactioncount = '0000' + (data.length + 1);
                  this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_04';
                  this.transaction['Amount'] = String(this.refill_amount_topay);
                  this.transaction['CreditFacility'] = 'Municipality Office';
                  this.transaction['DebitFacility'] = this.currentUserRole;
                  this.transaction['Purpose'] = 'Fine for Throwing Bottle to City Dustbin';

                  this.logser.createtransaction(this.transaction).subscribe(
                    data => {
                      data = this.transaction;
                      this.updatebottlereturn['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_04';
                      this.updatebottlereturn['transactiondate'] = String(this.citytiming['CurrentDay']);


                      this.logser.updateConveyorAssets(this.updatebottlereturn).subscribe((data) => {
                        console.log("Bottle location updated to City Dustbin");
                        this.playAudioElement(this.Fine.nativeElement, 0.8);
                      });

                    });
                });


              },
              error => {
                console.log(error);
              });

            // Update the municipality cashbox
            this.logser.getcashboxmunicipality().subscribe(data => {
              (data[0]['Cashbox'] == '') ? this.municipalcashbox = 0 : this.municipalcashbox = parseInt(data[0]['Cashbox']);
              this.municipalcashbox += amount_fine;
              this.logser.updatecashboxmunicipality(String(this.municipalcashbox)).subscribe(data => { });
            });
          }

          // Explicitly update the dustbin list
          this.dustbin_bottles = [...event.container.data];
          console.log('Updated dustbin_bottles:', this.dustbin_bottles);
        });

      } else if (currentDropzone.contains('truckContList')) {
        // Update bottle location to landfill
        this.logser.getthisAssets(bottleId).subscribe((data) => {
          this.updatebottlereturn['currentitem'] = bottleId;
          this.updatebottlereturn['Bottleloc'] = "Garbage Truck";
          this.updatebottlereturn['bottlestatus'] = data[0]['Bottle_Status'];
          this.updatebottlereturn['fromfacility'] = this.currentUserRole;
          this.updatebottlereturn['tofacility'] = 'Municipality Office';


          let amount_fine = 0.0;
          // Calculate the fine
          for (let i = 0; i < this.bottlePrice.length; i++) {
            if (this.bottlePrice[i]['BottleType'] == currentlyDroped.split('id')[0].split('_')[2] + '.' + currentlyDroped.split('id')[1].split('_')[0]) {
              amount_fine = parseFloat(this.bottlePrice[i]['OriginalPrice']) * 0.5;
              break;
            }
          }

          if (this.currentwallet > amount_fine) {
            this.alertModal.openModal("A fine of ₹" + amount_fine + " has been charged for this offense");
            this.currentwallet = this.currentwallet - amount_fine;
            this.logser.currentuser.wallet = this.currentwallet;

            this.logser.updatewallet().subscribe(
              data => {
                data = this.currentwallet;
                this.playAudioElement(this.Fine.nativeElement, 0.8);

                // Handle the transaction for the fine
                this.logser.gettransactions().subscribe(data => {
                  let transactioncount = '0000' + (data.length + 1);
                  this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_05';
                  this.transaction['Amount'] = String(this.refill_amount_topay);
                  this.transaction['CreditFacility'] = 'Municipality Office';
                  this.transaction['DebitFacility'] = this.currentUserRole;
                  this.transaction['Purpose'] = 'Fine for Throwing Bottle to Garbage Truck';

                  this.logser.createtransaction(this.transaction).subscribe(
                    data => {
                      data = this.transaction;
                      this.updatebottlereturn['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_05';
                      this.updatebottlereturn['transactiondate'] = String(this.citytiming['CurrentDay']);


                      this.logser.updateConveyorAssets(this.updatebottlereturn).subscribe((data) => {
                        console.log("Bottle location updated to Garbage Truck");
                        this.playAudioElement(this.Fine.nativeElement, 0.8);
                      });
                    });
                });


              },
              error => {
                console.log(error);
              });

            // Update the municipality cashbox
            this.logser.getcashboxmunicipality().subscribe(data => {
              (data[0]['Cashbox'] == '') ? this.municipalcashbox = 0 : this.municipalcashbox = parseInt(data[0]['Cashbox']);
              this.municipalcashbox += amount_fine;
              this.logser.updatecashboxmunicipality(String(this.municipalcashbox)).subscribe(data => { });
            });
          }
          // Explicitly update the truck container list
          this.truckContList = [...event.container.data];
          console.log('Updated truckContList:', this.truckContList);
        });
      }
    }
  }


  netfine = 0.0;
  netpurchase = 0.0;
  taxpaid = 0.0;
  netrefund = 0.0;
  calculatenetfine() {
    this.logser.gettransactions().subscribe(data => {
      this.netfine = 0.0;
      this.netpurchase = 0.0;
      this.taxpaid = 0.0;
      this.netrefund = 0.0;
      for (let t = 0; t < data.length; t++) {
        let getcityId = data[t]['TransactionId'].split("_")[0];
        if (data[t]['DebitFacility'] == this.currentUserRole && getcityId == this.currentusercityId && data[t]['Purpose'].includes("Fine")) {
          this.netfine += parseFloat(data[t]['Amount']);
        }
        if (data[t]['DebitFacility'] == this.currentUserRole && getcityId == this.currentusercityId && data[t]['Purpose'].includes("Purchasing")) {
          this.netpurchase += parseFloat(data[t]['Amount']);
        }
        if (data[t]['DebitFacility'] == this.currentUserRole && data[t]['CreditFacility'] == 'Municipality Office' && getcityId == this.currentusercityId && data[t]['Purpose'].includes("tax")) {
          this.taxpaid += parseFloat(data[t]['Amount']);
        }

        if (data[t]['CreditFacility'] == this.currentUserRole && getcityId == this.currentusercityId && data[t]['Purpose'].includes("Refund")) {
          this.netrefund += parseFloat(data[t]['Amount']);
        }
      }
    });

  }
  currentItem: string = '';  // To keep track of the currently dragged item

  // This method is called when the dragging starts
  dragStarted(item: string) {
    this.currentItem = item;
  }
  trackByFn(index: number, item: any): any {
    return item.id; // or another unique identifier
  }
  getBottleStatus = '';
  getBottleCode = '';

  returndrop(event: CdkDragDrop<string[]>) {
    const draggedItem = this.currentItem;
    if (event.previousContainer === event.container) {
      // Reordering items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferring items between different lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log('Current container data:', event.container.data);
    let currentlyDroped = event.item.element.nativeElement.id;
    let currentDropzone = event.container.element.nativeElement.classList;
    let amount_refund = 0.0;

    // Explicitly update the bottledropped list with the latest data
    if (event.container.element.nativeElement.classList.contains('bottle_list')) {
      this.bottledropped.length = 0;
      this.bottledropped.push(currentlyDroped);
      console.log('Updated Bottle Dropped List:', this.bottledropped);
    }



    if (currentDropzone.contains('bottle_list')) {
      // Perform refund and other logic related to bottle_list
      this.updatebottlereturn['currentitem'] = currentlyDroped.split('City')[1].split("at")[0];
      this.updatebottlereturn['fromfacility'] = this.currentUserRole;
      this.updatebottlereturn['tofacility'] = "ReturnConveyor";
      this.updatebottlereturn['Bottleloc'] = "ReturnConveyor";


      // Logic to update bottle status, wallet, and perform refund
      this.logser.getthisAssets(this.updatebottlereturn['currentitem']).subscribe((data) => {
        
        this.updatebottlereturn['bottlestatus'] = data[0]['Bottle_Status'];
        this.getBottleCode = data[0]['Bottle_Code'].split('.')[1];
        let getMaxRefillCount, getCurrentRefillCount;
        getMaxRefillCount = data[0]['Max_Refill_Count'];
        getCurrentRefillCount = data[0]['Current_Refill_Count'];
        alert('Max Refill Count :'+getMaxRefillCount+' Current Refill Count: '+getCurrentRefillCount);
        if (getMaxRefillCount == 0) {
          
          amount_refund = 0.0;
         
          this.alertModal.openModal("Thanks for returning the bottle.Unfortunately, producer of this shampoo brand is NOT entertaining empty bottle returns. We will be sending this bottle to the recycling plant. An amount of ₹00.00 has been credited to your wallet. Remember to check the \"Max refill count\" on the bottle lable  next time you buy or return.However, you may refill such bottle at the refilling station if you wish.(next time) ", () => {
            this.bottleStatus_Display['Bottle_Status'] = 'Damaged-Empty';
            this.bottleStatus_Display['currentQuantity'] = 0;
            this.bottleStatus_Display['Location'] = 'Return Conveyor';
            this.bottleStatus_Display['currentbottle'] = this.updatebottlereturn['currentitem'];
            this.getBottleStatus = 'Damaged-Empty'
            this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => {

              this.startreturnanimation(currentlyDroped);
            });
          });

        }
        else if (getCurrentRefillCount >= getMaxRefillCount) {
         
          amount_refund = this.calculateReturnCreditAmount(currentlyDroped, amount_refund);
          this.alertModal.openModal("Thanks for returning the bottle. This bottle has reached the Max-Refill count limit. We will be sending this bottle to the recycling plant. An amount of ₹ " + amount_refund.toFixed(2) + " has been credited to your wallet.", () => {
            this.bottleStatus_Display['Bottle_Status'] = 'Damaged-Empty';
            this.getBottleStatus= 'Damaged-Empty';
            this.bottleStatus_Display['currentQuantity'] = 0;
            this.bottleStatus_Display['currentbottle'] = this.updatebottlereturn['currentitem'];
            this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => {
  
              this.returnCashTransactions(amount_refund, currentlyDroped);
            });

          });

       
        }
        else {
          this.getBottleStatus = data[0]['Bottle_Status'];
          amount_refund = this.calculateReturnCreditAmount(currentlyDroped, amount_refund)
          this.returnCashTransactions(amount_refund, currentlyDroped);
        }




      });


    } else if (currentDropzone.contains('cart_bottle_list')) {
      // Logic for cart_bottle_list
      this.updateonlyloc['currentbottle'] = currentlyDroped.split('City')[1].split("at")[0];
      this.updateonlyloc['Bottleloc'] = this.currentUserCartId;
      this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
        console.log("Bottle location updated back to cart");
      });
    }
  }
  returnCashTransactions(amount_refund: any, currentlyDroped: any) {
    if (amount_refund > 0.0) {
      this.currentwallet += amount_refund;
      this.logser.currentuser.wallet = this.currentwallet;
      this.logser.updatewallet().subscribe(
        data => {
          data = this.currentwallet;
          this.logser.gettransactions().subscribe(data => {
            let transactioncount = '0000' + (data.length + 1);


            this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_06';
            this.transaction['Amount'] = String(amount_refund);
            this.transaction['CreditFacility'] = this.currentUserRole;
            this.transaction['DebitFacility'] = 'Return Conveyor';
            this.transaction['Purpose'] = 'Refund for returning Bottle';
            this.logser.createtransaction(this.transaction).subscribe(
              data => {
                data = this.transaction;
                this.updatebottlereturn['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_06';
                this.updatebottlereturn['transactiondate'] = String(this.citytiming['CurrentDay']);
                this.logser.updateConveyorAssets(this.updatebottlereturn).subscribe((data) => {
                  console.log("Bottle location updated to Return Conveyor");
                  $(".displayconveyor").html("Credited ₹ " + amount_refund.toFixed(2));
                  //alert("Thanks for returning the bottle. ₹ " + amount_refund + " has been credited to your wallet");
                  $("#" + currentlyDroped).addClass('Amountcredited');
                  this.playAudioElement(this.Thanksreturning.nativeElement, 0.8);
                  this.startreturnanimation(currentlyDroped);


                });
              });

          },
            error => {
              console.log(error);
            });
        });
      this.logser.getsupermarketcashbox().subscribe(data => {
        (data[0]['Cashbox'] == '') ? this.supermarketcashbox = 0 : this.supermarketcashbox = parseInt(data[0]['Cashbox']);
        this.supermarketcashbox -= amount_refund;
        this.logser.updatesupermarketcashbox(String(this.supermarketcashbox)).subscribe(data => { });

      });
    }
  }
  calculateReturnCreditAmount(currentlyDroped: any, amount_refund: any) {
    for (let i = 0; i < this.bottlePrice.length; i++) {
      const bottleType = currentlyDroped.split('id')[0].split('_')[2] + '.' + currentlyDroped.split('id')[1].split('_')[0];

      if (this.bottlePrice[i]['BottleType'] === bottleType && this.updatebottlereturn['bottlestatus'] == 'Empty-Dirty') {
        amount_refund = parseFloat(this.bottlePrice[i]['OriginalPrice']) * (this.bottlePrice[i]['percentReturnGood'] / 100);
        return amount_refund;

      }
      else if (this.bottlePrice[i]['BottleType'] === bottleType && this.updatebottlereturn['bottlestatus'] == 'Damaged-Empty') {
        amount_refund = parseFloat(this.bottlePrice[i]['OriginalPrice']) * (this.bottlePrice[i]['percentReturnDamage'] / 100);
        return amount_refund;
      }
    }
  }
  returnreverse(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Reordering items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferring items between different lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    let currentlyDroped = event.item.element.nativeElement.id;
    let currentDropzone = event.container.element.nativeElement.classList;
    let amount_refund = 0.0;

    // Explicitly update the bottledropped list with the latest data
    if (event.container.element.nativeElement.classList.contains('vending_list')) {
      this.reversedBottles.length = 0;
      this.reversedBottles.push(currentlyDroped);
      console.log('Updated Bottle Dropped List:', this.reversedBottles);
    }



    if (currentDropzone.contains('vending_list')) {
      // Perform refund and other logic related to bottle_list
      this.updatebottlereturn['currentitem'] = currentlyDroped.split('City')[1].split("at")[0];
      this.updatebottlereturn['fromfacility'] = this.currentUserRole;
      this.updatebottlereturn['Bottleloc'] = "ReverseVending";
      this.updatebottlereturn['tofacility'] = "ReverseVending";



      // Logic to update bottle status, wallet, and perform refund
      this.logser.getthisAssets(this.updatebottlereturn['currentitem']).subscribe((data) => {
        this.getBottleStatus = data[0]['Bottle_Status'];
        this.updatebottlereturn['bottlestatus'] = data[0]['Bottle_Status'];
        this.getBottleCode = data[0]['Bottle_Code'].split('.')[1];

        for (let i = 0; i < this.bottlePrice.length; i++) {
          const bottleType = currentlyDroped.split('id')[0].split('_')[2] + '.' + currentlyDroped.split('id')[1].split('_')[0];
          if (this.bottlePrice[i]['BottleType'] === bottleType && this.updatebottlereturn['bottlestatus'] == 'Empty-Dirty') {
            amount_refund = parseFloat(this.bottlePrice[i]['OriginalPrice']) * (this.bottlePrice[i]['percentReturnGood'] / 100);
            break;
          }
          else if (this.bottlePrice[i]['BottleType'] === bottleType && this.updatebottlereturn['bottlestatus'] == 'Damaged-Empty') {
            amount_refund = parseFloat(this.bottlePrice[i]['OriginalPrice']) * (this.bottlePrice[i]['percentReturnDamage'] / 100);
            break;
          }
        }

        this.currentwallet += amount_refund;
        this.logser.currentuser.wallet = this.currentwallet;
        this.logser.updatewallet().subscribe(
          data => {
            data = this.currentwallet;
            this.logser.gettransactions().subscribe(data => {
              let transactioncount = '0000' + (data.length + 1);

              this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_07';
              this.transaction['Amount'] = String(amount_refund);
              this.transaction['CreditFacility'] = this.currentUserRole;
              this.transaction['DebitFacility'] = 'Reverse Vending';
              this.transaction['Purpose'] = 'Refund from Reverse Vending Machine';
              this.logser.createtransaction(this.transaction).subscribe(
                data => {
                  data = this.transaction;
                  this.updatebottlereturn['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_07';
                  this.updatebottlereturn['transactiondate'] = String(this.citytiming['CurrentDay']);


                  this.logser.updateConveyorAssets(this.updatebottlereturn).subscribe((data) => {
                    console.log("Bottle location updated to ReverseVending Machine");

                    this.playAudioElement(this.Thanksreturning.nativeElement, 0.8);
                    $(".reverseBoard").html("Credited ₹ " + amount_refund.toFixed(2));
                    let that = this;
                    setTimeout(function () {
                      that.reversedBottles.length = 0;
                      $(".reverseBoard").html("Place your Bottle on the Placeholder");
                    }, 6000)
                  });
                });

            },
              error => {
                console.log(error);
              });

            // this.logser.getsupermarketcashbox().subscribe(data => {
            //   (data[0]['Cashbox'] == '') ? this.supermarketcashbox = 0 : this.supermarketcashbox = parseInt(data[0]['Cashbox']);
            //   this.supermarketcashbox -= amount_refund;
            //   this.logser.updatesupermarketcashbox(String(this.supermarketcashbox)).subscribe(data => { });
            // });
          });
      });


    }
  }


  startreturnanimation(currentlyDropped: string) {
    this.getdetailbrandfunction(currentlyDropped);
    const positions: { [key: string]: { left: string; topR: string; topOther: string; speed: number } } = {
      'B1.Shiny': { left: '1913px', topR: '2960px', topOther: '2260px', speed: 500 },
      'B2.Spiky': { left: '2313px', topR: '2960px', topOther: '2260px', speed: 1000 },
      'B4.Wavy': { left: '3091px', topR: '2960px', topOther: '2260px', speed: 1500 },
      'B5.Silky': { left: '3482px', topR: '2960px', topOther: '2260px', speed: 2500 },
      'B3.Bouncy': { left: '2704px', topR: '2960px', topOther: '2260px', speed: 2000 },
      'Universal': { left: '3873px', topR: '2960px', topOther: '2260px', speed: 3000 },
      'Damaged': { left: '4220px', topR: '2960px', topOther: '2260px', speed: 3000 }
    };
    let dummyvar;
    const defaultPosition = { left: '1694px', top: '2579px' };
    (this.getBottleStatus == 'Damaged-Empty') ? dummyvar = "Damaged" : dummyvar = this.getcurrentplacedbrand;
    const position = positions[dummyvar];
    if (position) {
      alert("Current Status:"+this.getBottleStatus);
      $(".conveyorbottledropper").animate({ 'left': position.left }, position.speed, () => {
        const topPosition = this.getBottleCode == 'R' ? position.topR : position.topOther;
        $(".conveyorbottledropper").animate({ 'top': topPosition }, 2000, () => {
          $(".conveyorbottledropper").css(defaultPosition);
          this.bottledropped.length = 0;
          $(".displayconveyor").html("Return used bottles here");
        });
      });
    }

  }

  currentlyrefillingBottle = '';
  private isProcessingDrop: boolean = false;
  refilldrop(event: CdkDragDrop<string[]>, dropZone: any) {
    const targetDropZone = dropZone.element.nativeElement.classList;

    // Check if the drop target is 'refilllist' and ensure only one item
    if (targetDropZone.contains('refilllist')) {
      // Only allow the drop if the drop zone is empty
      if (dropZone.data.length > 0) {
        this.alertModal.openModal('Cannot drop more than one item in this zone.')
        // console.log('Cannot drop more than one item in this zone.');
        return; // Prevent the drop
      }
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, event.previousIndex, event.currentIndex,);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.currentlyrefillingBottle = event.item.element.nativeElement.id;
      let currentlyDroped = event.item.element.nativeElement.id;
      let currentDropzone = event.container.element.nativeElement.classList;
      let that = this;
      if (currentDropzone.contains('refilllist')) {

        this.atRefillingMchn.length = 0;
        this.atRefillingMchn.push(currentlyDroped);

        this.updateonlyloc['currentbottle'] = currentlyDroped.split('City')[1].split("at")[0];
        this.updateonlyloc['Bottleloc'] = "At Refilling Stage";
        this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
          console.log("bottle location update to Refilling Machine");
        });
        let getMaxRefillCount, getCurrentRefillCount;
        this.logser.getthisAssets(this.updateonlyloc['currentbottle']).subscribe((data) => {
          getMaxRefillCount = data[0]['Max_Refill_Count'];
          getCurrentRefillCount = data[0]['Current_Refill_Count'];
          alert('Max Refill Count :'+getMaxRefillCount+' Current Refill Count: '+getCurrentRefillCount);
          if (getMaxRefillCount == 0 || getCurrentRefillCount >= getMaxRefillCount) {
            this.alertModal.openModal("This bottle has reached/exceeded the recommended Max refill limit. However, you may continue to refill if you wish")
            this.droppedbottle = true;
            if (this.resetanimation == true) {
              this.initiateanimation(currentlyDroped);
              this.playAudioElement(this.bottledroppeded.nativeElement, 0.8);
            }
          }
          else{
            this.droppedbottle = true;
            if (this.resetanimation == true) {
              this.initiateanimation(currentlyDroped);
              this.playAudioElement(this.bottledroppeded.nativeElement, 0.8);
            }
          }

        });
      }

      if (currentDropzone.contains('refill_list') || currentDropzone.contains('refilled_list')) {

        if (currentDropzone.contains('refill_list')) {
          this.updateonlyloc['currentbottle'] = currentlyDroped.split('City')[1].split("at")[0];
          this.updateonlyloc['Bottleloc'] = this.currentUserCartId;
          this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
            console.log("bottle location update to Cart Again!", data);
          });
        }

        if (currentDropzone.contains('refilled_list')) {
          this.updateonlyloc['currentbottle'] = currentlyDroped.split('City')[1].split("at")[0];
          this.updateonlyloc['Bottleloc'] = this.currentUserCartId;
          this.logser.updatelocation(this.updateonlyloc).subscribe((data) => {
            for (let i = 0; i < this.assetdataset.length; i++) {

              if (this.assetdataset[i]['AssetId'] == this.updateonlyloc['currentbottle']) {
                this.bottleDataatRefill['Current_Refill_Count'] = this.assetdataset[i]['Current_Refill_Count'];
                break;
              }
            }

            this.currentUserPurhcased.push(currentlyDroped);
            let index = this.refillbottles.findIndex(item => item === currentlyDroped)
            this.refillbottles.splice(index, 1);
            this.bottleDataatRefill['Current_Refill_Count'] = this.bottleDataatRefill['Current_Refill_Count'] + 1;
            this.bottleDataatRefill['currentQuantity'] = this.selectquantity;
            this.bottleDataatRefill['Bottle_Status'] = 'InUse';
            this.bottleDataatRefill['RefillingBottle'] = currentlyDroped.split('City')[1].split("at")[0];
            this.logser.updateRefillData(this.bottleDataatRefill).subscribe((data) => {
              $(".displayboard").html('Thank you. Visit again. Please press Continue button to refill another bottle');
              this.playAudioElement(this.thankyou.nativeElement, 0.8);
              this.refillbrandselected = '';
              $(".refilldropper").css({ 'left': '8px' }).hide();
              this.resetanimation = false;
              $(".continue").show();
            }
            );
          });

        }
      }

    }
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

      let currentlyDroped = event.item.element.nativeElement.id;
      let currentDropzone = event.container.element.nativeElement.classList;
      let itemid = currentlyDroped.split("at")[0].split('City')[1];
      if (currentDropzone.contains('newbottle_list')) {


        this.logser.getthisAssets(itemid).subscribe((data) => {
          $("#" + currentlyDroped).html(data[0]['Max_Refill_Count']);
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
      else if (currentDropzone.contains('shinyuvpn_list') || currentDropzone.contains('shinyvpn_list') || currentDropzone.contains('spikyrpr_list') ||
        currentDropzone.contains('spikyrpn_list') || currentDropzone.contains('bouncyrpn_list') || currentDropzone.contains('bouncyurpn_list') ||
        currentDropzone.contains('wavyurpr_list') || currentDropzone.contains('wavyurpn_list') || currentDropzone.contains('silkyvpn_list')) {

        this.logser.getthisAssets(itemid).subscribe((data) => {
          this.updateDragged['currentbottle'] = itemid;
          this.updateDragged['Bottleloc'] = 'Supermarket shelf';
          this.updateDragged['dragged'] = false;
          this.logser.updatedragged(this.updateDragged).subscribe((data) => {
            this.updateStatus(currentlyDroped, 'available', 'Supermarket shelf');
          });
        });
      }
    }
  }


  updateStatus(itemid: any, status: any, loc: any) {
    const existingIdIndex = this.commonobj.findIndex(item => item.id === itemid);
    if (existingIdIndex > 0) {
      this.commonobj[existingIdIndex]['status'] = status;
      this.commonobj[existingIdIndex]['location'] = loc;
    }
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
    $(".displayconveyor").html("Return used bottles here");
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
        that.bottletaken.length = 0;
        let w = that;
        $('#innerdoor3').animate({ 'height': '1030px' }, 300);
        setTimeout(function () {
          w.dopanzoom(-885, -2343, '1');
          $(".maincity .cart").css({ 'top': '3019px', 'left': '1557px' });

        }, 1000);

      });

    }, 300);


  }
  currentusertransaction: any[] = [];
  loadledgerdata() {
    this.currentusertransaction = [];
    for (let i = 0; i < this.assetdataset.length; i++) {

      if (this.assetdataset[i]['Bottle_loc'] == this.currentUserCartId || this.assetdataset[i]['Bottle_loc'] == 'House@' + this.currentUserCartId && this.assetdataset[i]['purchased'] == true) {
        this.currentusertransaction.push(this.assetdataset[i]);
      }
      // else if (this.assetdataset[i]['Bottle_loc'] == 'In' + this.currentUserCartId && this.assetdataset[i]['purchased'] == false && this.assetdataset[i]['dragged'] == true) {
      //   this.updateDragged['dragged'] = false;
      //   this.updateDragged['purchased'] = false;
      //   this.updateDragged['Bottleloc'] = 'Supermarket shelf';
      //   for (let i = 0; i < this.bottletaken.length; i++) {
      //     this.updateDragged['currentbottle'] = this.bottletaken[i].split("at")[0].split('City')[1];
      //     this.logser.updatethisAssets(this.updateDragged).subscribe((data) => { });
      //   }
      // }
    }
  }
  showbutton = false;
  selectedbottle = '';

  openwhyshorter(whyshorter: any) {
    this.modalService.open(whyshorter, { windowClass: "frontpage" });
  }

  private intervalId: any;
  private isMoving = false;

  ngOnDestroy(): void {
    this.clearMovement();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
        }, 50);

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

  makeitEmpty() {
    this.isDisabled = true;
    this.bottleStatus_Display['currentQuantity'] = 0;
    $("." + this.selectedBottleatStage.split("at")[1] + ".shampoolevel").css('height', '0px');
    if (this.bottleStatus_Display['Bottle_Status'] == 'InUse') {
      $(".Inhouseshelf_bottles #" + this.selectedBottleatStage).addClass('Empty-Dirty');
      this.bottleStatus_Display['Bottle_Status'] = "Empty-Dirty";
    }
    else if (this.bottleStatus_Display['Bottle_Status'] == 'Damaged-InUse') {
      this.bottleStatus_Display['Bottle_Status'] = "Damaged-Empty";
      $(".Inhouseshelf_bottles #" + this.selectedBottleatStage).addClass('Damaged-Empty');
    }
    this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => {
      if (this.bottleStatus_Display['Bottle_Status'] == 'InUse') {
        let index = this.currentUserPurhcased.findIndex(item => item === this.bottleStatus_Display['currentbottle'])
        this.currentUserPurhcased.splice(index, 1);
        this.refillbottles.push(this.bottleStatus_Display['currentbottle']);
      }
    });
  }
  isDamaged: boolean = false;
  makeitDamaged() {
    this.isDamaged = true;
    if (this.bottleStatus_Display['currentQuantity'] > 0) {
      this.bottleStatus_Display['Bottle_Status'] = "Damaged-InUse"
      $(".Inhouseshelf_bottles #" + this.selectedBottleatStage).addClass('Damaged-InUse');
    }
    else {
      this.bottleStatus_Display['Bottle_Status'] = "Damaged-Empty";
      $(".Inhouseshelf_bottles #" + this.selectedBottleatStage).addClass('Damaged-Empty');
    }
    this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => { });
  }
  isThrown: boolean = false;
  makeitThrown() {
    $('.btncont,.shampoolevel').hide();
    this.isThrown = true;
    let amount_fine = 0.0;
    for (let i = 0; i < this.bottlePrice.length; i++) {
      if (this.bottlePrice[i]['BottleType'] == this.selectedBottleatStage.split('id')[0].split('_')[2] + '.' + this.selectedBottleatStage.split('id')[1].split('_')[0]) {
        amount_fine = parseFloat(this.bottlePrice[i]['OriginalPrice']) * 0.5;
        break;
      }
    }
    this.updatebottlereturn['currentitem'] = this.selectedBottleatStage.split("at")[0].split("City")[1];
    this.updatebottlereturn['Bottleloc'] = 'Street'
    this.updatebottlereturn['bottlestatus'] = this.bottleStatus_Display['Bottle_Status'];
    this.updatebottlereturn['fromfacility'] = this.currentUserRole;
    this.updatebottlereturn['tofacility'] = 'Municipality Office';


    if (this.currentwallet > amount_fine) {
      this.alertModal.openModal("A fine of ₹" + amount_fine + " has been charged for this offense");
      this.currentwallet = this.currentwallet - amount_fine;
      this.logser.currentuser.wallet = this.currentwallet;

      this.logser.updatewallet().subscribe(
        data => {
          data = this.currentwallet;

          this.logser.gettransactions().subscribe(data => {
            let transactioncount = '0000' + (data.length + 1);


            this.transaction['TransactionId'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_08';
            this.transaction['Amount'] = String(amount_fine);
            this.transaction['CreditFacility'] = 'Municipality Office';
            this.transaction['DebitFacility'] = this.currentUserRole;
            this.transaction['Purpose'] = 'Fine for Throwing Bottle';
            this.logser.createtransaction(this.transaction).subscribe(
              data => {
                data = this.transaction;
                this.updatebottlereturn['transactionid'] = this.currentusercityId + '_' + this.citytiming['CurrentDay'] + '_' + this.citytiming['CurrentTime'] + '_' + transactioncount + '_08';
                this.updatebottlereturn['transactiondate'] = String(this.citytiming['CurrentDay']);


                this.logser.updateConveyorAssets(this.updatebottlereturn).subscribe((data) => {
                  console.log("Bottle location updated to Street");
                  this.bottleStatus_Display['Location'] = "Street";
                  this.playAudioElement(this.Fine.nativeElement, 0.8);
                  let index = this.currentUserPurhcased.findIndex(item => item === this.bottleStatus_Display['currentbottle'])
                  this.currentUserPurhcased.splice(index, 1);
                });

              });

          },
            error => {
              console.log(error);
            });


        });

      this.logser.getcashboxmunicipality().subscribe(data => {
        (data[0]['Cashbox'] == '') ? this.municipalcashbox = 0 : this.municipalcashbox = parseInt(data[0]['Cashbox']);
        this.municipalcashbox += amount_fine;
        this.logser.updatecashboxmunicipality(String(this.municipalcashbox)).subscribe(data => { });
      });



    }
    $("#" + this.selectedBottleatStage.split("at")[0].split("City")[1]).addClass('Street');




  }
  reduceCapacity() {
    if (this.bottleStatus_Display['currentQuantity'] >= 20) {
      this.bottleStatus_Display['currentQuantity'] -= 20;
      let getheight = $("." + this.bottleStatus_Display['contentCode'] + ".shampoolevel").css('height').split("px")[0];
      let reducedheight = parseFloat(getheight) - this.stepheight;
      $("." + this.bottleStatus_Display['contentCode'] + ".shampoolevel").css('height', reducedheight + 'px');

      this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => { });
      if (this.bottleStatus_Display['currentQuantity'] == 0) {
        (this.bottleStatus_Display['Bottle_Status'] == 'InUse') ? this.bottleStatus_Display['Bottle_Status'] = "Empty-Dirty" : this.bottleStatus_Display['Bottle_Status'] = "Damaged-Empty";
        this.logser.updatethisAssetQuantity(this.bottleStatus_Display).subscribe((data) => {
          let index = this.currentUserPurhcased.findIndex(item => item === this.bottleStatus_Display['currentbottle'])
          this.currentUserPurhcased.splice(index, 1);
          this.refillbottles.push(this.bottleStatus_Display['currentbottle']);
        });
      }

    }

  }
  bottleDataatRefill = {
    'Current_Refill_Count': 0,
    'currentQuantity': 0,
    'RefillingBottle': '',
    'Bottle_Status': "InUse",
  }
  bottleStatus_Display = {
    'currentbottle': '',
    'currentQuantity': 0,
    'Bottle_Status': "InUse",
    'Location': '',
    'contentCode': ''
  }
  selectedBottleatStage: string = '';
  sldBottleData: any;
  openbottelstages(cartcontent: any, event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    this.selectedBottleatStage = element.id;
    //this.billpaid=true;
    this.bottleStatus_Display['currentbottle'] = element.id.split("at")[0].split("City")[1];
    this.calculatenetfine();
    if (this.opensuperflag == 0) {
      this.billpaid = true;
      this.altertab = 2;

    }
    if (this.opensuperflag == 1 && this.bottletaken.length == 0) {
      this.billpaid = true;
    }
    else if (this.opensuperflag == 1 && this.bottletaken.length > 0) {
      this.billpaid = false;
    }


    this.modalService.open(cartcontent, { windowClass: "cartcontent" });
    this.checkthebottlestatusfordisplay();




  }

  isDisabled: boolean = false;
  checkthebottlestatusfordisplay() {
    if (this.bottleStatus_Display['currentbottle'] != '') {

      this.logser.getthisAssets(this.bottleStatus_Display['currentbottle']).subscribe((data) => {
        this.sldBottleData = data;
        $(".loading").hide();
        if (data[0]['remQuantity'] == '') {
          data[0]['remQuantity'] = 500;
        }
        this.bottleStatus_Display['contentCode'] = data[0]['Current_Content_Code'].split(".")[0];
        this.bottleStatus_Display['currentQuantity'] = data[0]['remQuantity'];
        this.bottleStatus_Display['Bottle_Status'] = data[0]['Bottle_Status'];
        this.bottleStatus_Display['Location'] = data[0]['Bottle_loc'];
        let content = this.sldBottleData[0]['Current_Content_Code'].split(".")[0];
        if (this.bottleStatus_Display['Location'] !== "Street") {
          $(".shampoolevel").addClass(content);
          let getheight = parseFloat($("." + content + ".shampoolevel").css('height').split("px")[0]);
          this.stepheight = getheight / 25;
          let unitreduction = 500 - (this.bottleStatus_Display['currentQuantity']);
          let reductionpropo = unitreduction / 500;
          let heightred = getheight * reductionpropo;
          let reducedheight = getheight - heightred;
          let unitprice = 0;
          $("." + content + ".shampoolevel").css('height', reducedheight + 'px');

          for (let r = 0; r < this.shampooPrice.length; r++) {
            if (this.shampooPrice[r]['BottleContent'] == this.sldBottleData[0]['Current_Content_Code']) {
              unitprice = this.shampooPrice[r]['UnitPrice'];
            }

          }


          let checkuniversal = this.sldBottleData[0]['Bottle_Code'].split(".")[0];
          this.shapooprice = unitprice;
          this.totalamount = parseFloat(this.sldBottleData[0]['Bottle_Price']) + parseFloat(this.sldBottleData[0]['Content_Price']) + parseFloat(this.sldBottleData[0]['Env_Tax'])
          if (checkuniversal == 'UB') {
            this.leblfound = true;
            this.bottleclass = "universal";
            this.frontlabel = this.sldBottleData[0]['Current_Content_Code'].split(".")[1].toString().toLowerCase() + "_label";
          }
          else {
            this.leblfound = false;
            this.bottleclass = this.sldBottleData[0]['Current_Content_Code'].split(".")[1];
          }


        }
        else {
          this.isThrown = true;
          $(".btncont,.shampoolevel").hide();
          $("#" + this.selectedBottleatStage.split("at")[0].split("City")[1]).addClass('Street');
        }
        $(".currentbottleshow").fadeIn(2000);
        this.workonflags();


      });
    }
    else {

    }


  }
  workonflags() {
    this.isThrown = false;
    if (this.bottleStatus_Display['Bottle_Status'] == 'Damaged-Empty') {
      this.isDamaged = true;
      this.isDisabled = true;

    }
    else if (this.bottleStatus_Display['Bottle_Status'] == 'Damaged-InUse') {
      this.isDamaged = true;
      this.isDisabled = false;
    }
    else if (this.bottleStatus_Display['Bottle_Status'] == 'Empty-Dirty') {
      this.isDisabled = true;
      this.isDamaged = false;
    }
    else {
      this.isDamaged = false;
      this.isDisabled = false;
    }

  }
  checksBottleStatus(item: CdkDrag<string>) {
    if (!item.element.nativeElement.classList.contains('Empty-Dirty') && !item.element.nativeElement.classList.contains('Damaged-Empty') && !item.element.nativeElement.classList.contains('Street')) { return true; }
    else { return false; }
  }

  checksBottleempty(item: CdkDrag<string>) {
    if (item.element.nativeElement.classList.contains('Empty-Dirty') || item.element.nativeElement.classList.contains('Damaged-Empty') && !item.element.nativeElement.classList.contains('Street')) { return true; }
    else { return false; }
  }

  playAudioElement(audioElement: HTMLAudioElement, volume: number) {
    audioElement.volume = volume;
    audioElement.muted = false;
    audioElement.play().then(() => {
    }).catch(error => {
      console.error(`Error playing ${audioElement.src}:`, error);
    });
  }

  reverseVendingOperation() {

  }
}
