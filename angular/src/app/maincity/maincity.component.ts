import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { left } from '@popperjs/core';





@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})
export class MaincityComponent implements AfterViewInit, OnInit {


  noavatar = false;
  userobj = {
    'login': '1'
  }
  currentrole = "Customer";

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
  newfemale: any[] = [];
  maleset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  femaleset = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  user: any;
  assetdata: any;
  hasMayor = false;
  cityname: any;
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal) {
    this.currentUserRole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;
    this.currentuseravatar = this.logser.currentuser.avatar;
    this.currentusercityId = this.logser.currentuser.CityId;
  }


  canmovetop = false;
  canmoveleft = false;
  canmoveright = false;
  canmovebottom = false;
  onhorizontallane = false;
  whichroad = '';
  settrue() {
    this.canmovetop = true;
    this.canmovebottom = true;
    this.canmoveright = true;
    this.canmoveleft = true;
  }
  checkcartposition() {
    let topvalue = parseInt($(".cart").css('top').split("px")[0]);
    let leftvalue = parseInt($(".cart").css('left').split("px")[0]);
    console.log(topvalue, leftvalue);
    if (topvalue > 0 && topvalue < 4395 && leftvalue > 5190 && leftvalue < 5300) {
      this.whichroad = "rightroad";
      this.settrue();

    }
    else if (topvalue > 3524 && topvalue < 3640 && leftvalue > 5300 && leftvalue < 7390) {
      this.whichroad = "mayorhouseroad";
      this.settrue();

    }
    else if (topvalue > 2640 && topvalue < 3000 && leftvalue > 1500 && leftvalue < 1700) {
      if (topvalue < 2720) {
        this.opensuperflag = true; this.opensupermarket();
      }
      this.whichroad = "Supermarketroad";
      this.settrue();;

    }
    else if (topvalue > 4010 && topvalue < 4065 && leftvalue > 5300 && leftvalue < 7390) {
      this.whichroad = "lowercolonyrightroad";
      this.settrue();

    }
    else if (topvalue > 0 && topvalue < 4395 && leftvalue > 2700 && leftvalue < 2800) {
      this.whichroad = "lefthorizontalroad";
      this.settrue();

    }
    else if (topvalue > 3524 && topvalue < 3640 && leftvalue > 300 && leftvalue < 2800) {
      this.whichroad = "leftcolonytop";
      this.settrue();

    }
    else if (topvalue > 4010 && topvalue < 4065 && leftvalue > 300 && leftvalue < 2800) {
      this.whichroad = "leftcolonybottom";
      this.settrue();

    }
    else if (topvalue > 2950 && topvalue < 3050 && leftvalue > 0 && leftvalue < 7390) {
      this.whichroad = "municipalityroad";
      this.settrue();
    }
    else {
      this.canmoveleft = false;
      this.canmovetop = false;
      this.canmovebottom = false;
      this.canmoveright = false;
      if (this.whichroad == 'rightroad') {

        if (leftvalue <= 5190) {
          this.canmovebottom = true;
          this.canmovetop = true;
          this.canmoveleft = false;
          this.canmoveright = true;
        }
        if (leftvalue >= 5300) {
          this.canmovetop = true;
          this.canmovebottom = true;
          this.canmoveleft = true;
          this.canmoveright = false;
        }
        if (topvalue <= 0) {
          this.canmoveright = true;
          this.canmoveleft = true;
          this.canmovetop = false;
          this.canmovebottom = true;
        }
        if (topvalue >= 4395) {
          this.canmoveright = true;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = false;
        }
      }
      else if (this.whichroad == 'mayorhouseroad') {
        if (topvalue <= 3524) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 3640) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 5300) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 7390) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "Supermarketroad") {
        if (topvalue <= 2640) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 3000) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 1500) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 1700) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "lowercolonyrightroad") {
        if (topvalue <= 4010) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 4065) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 5300) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 7390) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "lefthorizontalroad") {
        if (topvalue <= 4010) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 4065) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 5300) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 7390) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "leftcolonytop") {
        if (topvalue <= 3524) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 3640) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 300) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 2800) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "leftcolonybottom") {
        if (topvalue <= 4010) {
          this.canmovebottom = true;
          this.canmovetop = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (topvalue >= 4065) {
          this.canmovetop = true;
          this.canmovebottom = false;
          this.canmoveleft = true;
          this.canmoveright = true;
        }
        if (leftvalue <= 300) {
          this.canmoveright = true;
          this.canmoveleft = false;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
        if (leftvalue >= 2800) {
          this.canmoveright = false;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = true;
        }
      }
      else if (this.whichroad == "municipalityroad") {
        if (leftvalue <= 0) {
          this.canmovebottom = true;
          this.canmovetop = true;
          this.canmoveleft = false;
          this.canmoveright = true;
        }
        if (leftvalue >= 7390) {
          this.canmovetop = true;
          this.canmovebottom = true;
          this.canmoveleft = true;
          this.canmoveright = false;
        }
        if (topvalue <= 2950) {
          this.canmoveright = true;
          this.canmoveleft = true;
          this.canmovetop = false;
          this.canmovebottom = true;
        }
        if (topvalue >= 3050) {
          this.canmoveright = true;
          this.canmoveleft = true;
          this.canmovetop = true;
          this.canmovebottom = false;
        }
      }
    }
    console.log('entha road', this.whichroad);
  }
  topval = 0;
  @HostListener('document:keydown.arrowdown', ['$event'])
  movedown($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      this.checkcartposition();
      if (this.canmovebottom) {
        console.log('this.canmovebottom', this.canmovebottom)
        let leftval = $(".cart").css('top');
        leftval = parseInt(leftval) + 10 + "px";
        $(".cart").css({ 'top': leftval })
      }
    }
    else {
      this.supercartposition();
      let leftval = $(".supermarketcart").css('top');
      leftval = parseInt(leftval) + 10 + "px";
      $(".supermarketcart").css({ 'top': leftval })
    }
  }
  @HostListener('document:keydown.arrowup', ['$event'])
  moveup($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      this.checkcartposition();
      console.log('this.canmovetop', this.canmovetop)
      if (this.canmovetop) {
        let leftval = $(".cart").css('top');
        leftval = parseInt(leftval) - 10 + "px";
        $(".cart").css({ 'top': leftval })
      }
    }
    else {
      this.supercartposition();
      let leftval = $(".supermarketcart").css('top');
      leftval = parseInt(leftval) - 10 + "px";
      $(".supermarketcart").css({ 'top': leftval })
    }
  }
  @HostListener('document:keydown.arrowleft', ['$event'])
  moveleft($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      this.checkcartposition();
      console.log('this.canmoveleft', this.canmoveleft)
      if (this.canmoveleft == true) {
        let leftval = $(".cart").css('left');
        leftval = parseInt(leftval) - 10 + "px";
        $(".cart").css({ 'left': leftval })
      }
    }
    else {
      this.supercartposition();
      let leftval = $(".supermarketcart").css('left');
      leftval = parseInt(leftval) - 10 + "px";
      $(".supermarketcart").css({ 'left': leftval })
    }
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  moveright($event: any) {

    $event.stopPropagation();

    if (this.opensuperflag == false) {
      this.checkcartposition();
      console.log('this.canmoveright', this.canmoveright)
      if (this.canmoveright == true) {
        let leftval = $(".cart").css('left');
        leftval = parseInt(leftval) + 10 + "px";
        $(".cart").css({ 'left': leftval })
      }
    }
    else {
      this.supercartposition();
      let leftval = $(".supermarketcart").css('left');
      leftval = parseInt(leftval) + 10 + "px";
      $(".supermarketcart").css({ 'left': leftval })
    }
  }  setflag = 0;
  supercartposition() {
   
    let topvalue = parseInt($(".supermarketcart").css('top').split("px")[0]);
    let leftvalue = parseInt($(".supermarketcart").css('left').split("px")[0]);
    if (topvalue < 3533 && topvalue > 3090 && leftvalue > 4972 && leftvalue < 4980) {

      if ($(".cart_bottle_list").children('div').length > 0) {
        alert("Please place all items you intend to return at the mouth of the conveyor")
        this.setflag = 1;

      }
    }
    if (leftvalue > 4980) {
      if (this.setflag == 0) {
        var $elem = $('#innerdoor');
        $({ deg: 0 }).animate({ deg: 90 }, {
            duration: 600,
            step: function (now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg) '
                });
            }
        });
        this.setflag=2;
      }
    }
    if(leftvalue>6532 && leftvalue<6552 && this.setflag==2){
      var $elem = $('#innerdoor');
        $({ deg: 90 }).animate({ deg: 1 }, {
            duration: 600,
            step: function () {
              this.deg=this.deg-1;
                $elem.css({
                    transform: 'rotate(' + this.deg + 'deg) '
                });
            }
        });
    }
  }
  deg=90;
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
  citycurrentdate = 0;
  citycurrentday = 0;
  ngOnInit(): void {

    if (this.logser.currentuser.Username != '') {
      sessionStorage.setItem('currentUser', JSON.stringify(this.logser.currentuser));
    } else {
      let current = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
      this.logser.currentuser = JSON.parse(JSON.stringify(current))
      this.currentUserRole = this.logser.currentuser.Role;
      this.currentUserCartId = this.logser.currentuser.cartId;
      this.currentusername = this.logser.currentuser.Username;
      this.currentusergender = this.logser.currentuser.gender;
      this.currentuseravatar = this.logser.currentuser.avatar;
      this.currentusercityId = this.logser.currentuser.CityId;
      this.citycurrentdate = this.logser.currentuser.currentdate;
      this.citycurrentday = this.logser.currentuser.currentday;

    }
    this.logser.getcitynames().subscribe((data) => {
      setTimeout(() => {
        if (data[0].MayorId != 0) {
          $(".mayorflag").show();
        }
        this.currentTime();
      }, 500)
      this.logser.currentuser.cityname = data[0].CityName;
      this.logser.currentuser.currentdate = data[0].CurrentDate;
      this.logser.currentuser.currentday = data[0].CurrentDay;
      this.cityname = this.logser.currentuser.cityname;
      this.citycurrentdate = this.logser.currentuser.currentdate;
      this.citycurrentday = this.logser.currentuser.currentday;
      (this.citycurrentday > 0) ? this.sec = (this.citycurrentdate * 3600) + (3600 * 24 * this.citycurrentday) : this.sec = this.citycurrentdate * 3600;
      console.log(this.sec);


    });

    this.logser.getAllUsers().subscribe((data) => {
      this.user = data;
      for (var t = 0; t < this.user.length; t++) {
        if (this.user[t].login == 1 && this.user[t].User_cityid == this.logser.currentuser.CityId) {
          $("." + this.user[t].Role.split(" ")[0]).show();
          this.currentUserId = this.user[t].UserId;
        }
        if (this.user[t].Username == this.currentusername && this.user[t].avatar == '') {
          this.noavatar = true;
          if (this.noavatar == true) {
            this.open(this.content)
          }
        }

        if (this.user[t].Role !== '') {
          let word = this.user[t].Role.split(" ")[0];
          let xpos = this.positionObject[word as keyof typeof this.positionObject][3][0];
          let ypos = this.positionObject[word as keyof typeof this.positionObject][3][1];
          //let x2 = this.positionObject[word as keyof typeof this.positionObject][2][0];
          // let y2 = this.positionObject[word as keyof typeof this.positionObject][2][1];  
          $(".displaypanel." + word).css({ 'left': xpos + 'px', 'top': ypos + 'px' }).html(this.user[t].Role);
          // $(".housedisplay."+word).css({ 'left': x2 + 'px', 'top': y2 + 'px' }).html(this.user[t].Username);
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

          for (var j = 0; j < this.femaleset.length; j++) {
            if (this.femaleset[j].toString() == avatarnumber) {
              this.femaleset.splice(j, 1);
            }
          }
        }

      }
      this.newmale = this.maleset.slice(0);
      this.newfemale = this.femaleset.slice(0);

    });

  }
  @ViewChild('welcome', { static: true }) public welcome!: ElementRef;
  timeupdate = 0;
  citytiming = {
    'CurrentDate': 0,
    'CurrentDay': 0
  }
  canupdatedb = false;
  sec = 0;
  currentTime() {
    let hour = 0;
    let min = 0;
    let day = 0;
    let totalMinutes = 0;
    let totalhour = 0;
    const hR = 3600;
    setInterval(() => {
      this.sec++;
      totalMinutes = Math.floor(this.sec / 60);
      min = totalMinutes % 60;
      totalhour = this.sec / hR;
      hour = totalhour % 24;
      $("#clock").html(Math.floor(hour) + " : " + Math.floor(min));
      day = totalhour / 24
      $("#day").html('Day ' + Math.floor(day));
      if (totalhour % 1 == 0) {
        this.citytiming['CurrentDate'] = Math.round(hour);
        this.citytiming['CurrentDay'] = Math.round(day);
        this.logser.updatecurrenttime(this.citytiming).subscribe(
          data => {
            this.citytiming = data;
            this.timeupdate == hour
          },
          error => {
            console.log(error);
          }
        );
        if (hour == 6 || hour == 19) {
          $(".truck").animate({ left: '5210px' }, 1000, () => {
            $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');
            $(".truck").animate({ top: '3680px' }, 5500, () => {
              $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');
              $(".truck").animate({ left: '7390px' }, 5500, () => {
                $(".truck").css({ transform: 'rotate(0deg)' });
                $(".truck").animate({ left: '5210px' }, 5500, () => {
                  $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');;
                  $(".truck").animate({ top: '4070px' }, 2500, () => {
                    $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');;
                    $(".truck").animate({ left: '7390px' }, 5500, () => {
                      $(".truck").css({ transform: 'rotate(0deg)' });
                      $(".truck").animate({ left: '5210px' }, 5500, () => {
                        $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');;
                        $(".truck").animate({ top: '3060px' }, 5500, () => {
                          $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');;
                          $(".truck").animate({ left: '2730px' }, 5500, () => {
                            $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');;
                            $(".truck").animate({ top: '3680px' }, 2500, () => {
                              $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');;
                              $(".truck").animate({ left: '300px' }, 5500, () => {
                                $(".truck").css({ transform: 'scaleX(-1)' });
                                $(".truck").animate({ left: '2730px' }, 5500, () => {
                                  $(".truck").css({ transform: 'rotate(-90deg)' }).addClass('top').removeClass('side');;
                                  $(".truck").animate({ top: '4070px' }, 2500, () => {
                                    $(".truck").css({ transform: 'rotate(0deg)' }).addClass('side').removeClass('top');;
                                    $(".truck").animate({ left: '300px' }, 5500, () => {
                                      $(".truck").css({ transform: 'scaleX(-1)' });
                                      $(".truck").animate({ left: '2730px' }, 5500, () => {
                                        $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');;
                                        $(".truck").animate({ top: '3060px' }, 5500, () => {
                                          $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');;
                                          $(".truck").animate({ left: '5210px' }, 5500, () => {
                                            $(".truck").css({ transform: 'rotate(90deg)' }).addClass('top').removeClass('side');;
                                            $(".truck").animate({ top: '1025px' }, 5500, () => {
                                              $(".truck").css({ transform: 'scaleX(-1)' }).addClass('side').removeClass('top');;
                                              $(".truck").animate({ left: '5933px' }, 5500);
                                              $(".truck").css({ transform: 'rotate(0deg)' });
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
      }
    }, 1);

  }

  updateTime(k: any) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  @ViewChild('maincity', { static: false })
  private scene!: ElementRef;
  @ViewChild('content', { static: false })
  private content!: ElementRef;
  @ViewChild('bottlesticker', { static: false })
  private bottlesticker!: ElementRef;

  ngAfterViewInit(): void {
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
        var shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
      // beforeMouseDown: function (e) {
      //   // allow mouse-down panning only if altKey is down. Otherwise - ignore
      //   var shouldIgnore = !e.altKey;
      //   return shouldIgnore;
      // }
    });

    this.loadinginitialState();

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
    $(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
    $(".cartid").html(this.currentUserCartId);
  }

  dopanzoom(x: number, y: number, zoomlevel: string) {
    this.instance.smoothMoveTo(x, y);
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
  }
  bottles = ['silky', 'wavy', 'shiny', 'bouncy']
  bottledropped: string[] = [];
  bottletaken: string[] = [];
  newbottles: string[] = ['shiny', 'shiny', 'shiny', 'shiny'];
  wavybottles: string[] = ['wavy', 'wavy', 'wavy', 'wavy'];
  silkybottles: string[] = ['silky', 'silky', 'silky', 'silky'];
  bouncybottles: string[] = ['bouncy', 'bouncy', 'bouncy', 'bouncy'];


  clicked() {
    alert("clicked");
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
    }
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
  frontclass = '';
  leblfound = false;
  frontlabel = '';
  shapooprice = 0.0;
  totalamount = 0.0;
  opensticker(bottlesticker: any, event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
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
          console.log(error);
        }
      );
    }
  }

  opensuperflag = false;
  @ViewChild('supermarket', { static: false })
  private supermarket!: ElementRef;
  opensupermarket() {
    this.welcome.nativeElement.play();
    this.instance1 = panzoom(this.supermarket.nativeElement, {
      maxZoom: 2,
      minZoom: 0.4,
      initialZoom: 0.4,
      bounds: true,
      boundsPadding: 1,
      smoothScroll: false,
      filterKey: function () {
        return true;
      },
      beforeMouseDown: function (e) {
        // allow mouse-down panning only if altKey is down. Otherwise - ignore
        var shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
      beforeWheel: function (e) {
        var shouldIgnore = !e.altKey;
        return shouldIgnore;
      },


    });
    this.dopanzoomsupermarket(-57, -1077, '0.4');
    $(".supermarketcart.cart").css({ 'left': '932px', 'top': '3413px' });

  }

}


