import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})

export class MaincityComponent implements AfterViewInit, OnInit {

  public instance: any;
  currentUserRole: string = '';
  currentUserCartId = '';
  currentusername = '';
  currentusergender = '';
  currentuseravatar = '';
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
    'Grocery': [[-6011, -3608], [6602, 4010], [6576, 3898], [6683, 3806]],
    'Ubottle': [[-6360, -3606], [6945, 4010], [6910, 3898], [7020, 3806]],
    'Making': [[-6613, -3622], [7282, 4010], [7246, 3898], [7357, 3806]],
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
  hasMayor = false;
  cityname: any;
  constructor(private logser: LoginserviceService, private router: Router, private modalService: NgbModal) {
    this.currentUserRole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;
    this.currentusername = this.logser.currentuser.Username;
    this.currentusergender = this.logser.currentuser.gender;

  }
  topval = 0;
  @HostListener('document:keydown.arrowdown', ['$event'])
  movedown($event: any) {
    $event.stopPropagation();
    let leftval = $(".cart").css('top');
    this.topval = parseInt(leftval);
    console.log(leftval);
    leftval = parseInt(leftval) + 5 + "px";

    $(".cart").css({ 'top': leftval })
  }
  @HostListener('document:keydown.arrowup', ['$event'])
  moveup($event: any) {
    $event.stopPropagation();
    let leftval = $(".cart").css('top');
    console.log(leftval);
    leftval = parseInt(leftval) - 5 + "px";
    $(".cart").css({ 'top': leftval })
  }
  @HostListener('document:keydown.arrowleft', ['$event'])
  moveleft($event: any) {
    $event.stopPropagation();
    let leftval = $(".cart").css('left');
    console.log(leftval);
    leftval = parseInt(leftval) - 5 + "px";
    $(".cart").css({ 'left': leftval })
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  moveright($event: any) {
    $event.stopPropagation();
    let leftval = $(".cart").css('left');
    console.log(leftval);
    leftval = parseInt(leftval) + 5 + "px";
    $(".cart").css({ 'left': leftval })
  }

  ngOnInit(): void {


    if (this.logser.currentuser.Username == '') {
      this.router.navigate(["login"])
    }
    this.logser.getcitynames().subscribe((data) => {
      setTimeout(() => {
        if (data[0].MayorId != 0) {
          $(".mayorflag").show();
        }
      }, 500)
      this.logser.currentuser.cityname = data[0].CityName;
      this.cityname = this.logser.currentuser.cityname;

    });

    this.logser.getAllUsers().subscribe((data) => {
      this.user = data;
      for (var t = 0; t < this.user.length; t++) {
        console.log(this.user[t])
        if (this.user[t].login == 1 && this.user[t].CityId == this.logser.currentuser.CityId) {
          $("." + this.user[t].Role.split(" ")[0]).show();
        }
        if (this.user[t].Role !== '') {
          let word = this.user[t].Role.split(" ")[0];
          let xpos = this.positionObject[word as keyof typeof this.positionObject][3][0];
          let ypos = this.positionObject[word as keyof typeof this.positionObject][3][1];
          $(".displaypanel." + word).css({ 'left': xpos + 'px', 'top': ypos + 'px' }).html(this.user[t].Role);
          if (word == 'Supermarket' || word == 'Recycling' || word == 'Ubottle' || word == 'Making' || word == 'Reverse' || word == 'Refilling') {
            $(".commoncls." + word).html('OPEN');
          }
          else {
            $(".commoncls." + word).html('CLOSE');
          }
        }
        if (this.user[t].User_cityid == this.logser.currentuser.CityId) {
          let avatarnumber = this.user[t].avatar;
          for (var j = 0; j < this.maleset.length; j++) {
            console.log(this.maleset[j].toString(), avatarnumber)
            if (this.maleset[j].toString() == avatarnumber) {
              this.maleset.splice(j, 1);
            }
          }

          console.log(this.maleset);
          for (var j = 0; j < this.femaleset.length; j++) {
            console.log(this.femaleset[j].toString(), avatarnumber)
            if (this.femaleset[j].toString() == avatarnumber) {
              this.femaleset.splice(j, 1);
            }
          }
        }

      }
      this.newmale = this.maleset.slice(0);
      this.newfemale = this.femaleset.slice(0);
      console.log(this.newmale);

    });
  }
  @ViewChild('maincity', { static: false })
  private scene!: ElementRef;
  @ViewChild('content', { static: false })
  private content!: ElementRef;
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
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        var shouldIgnore = !e.altKey;
        return shouldIgnore;
      }
    });
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
    $(".displayrole").html(this.logser.currentuser.Role);
    $(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
    $(".cartid").html(this.currentUserCartId)
    if (this.logser.currentuser.avatar == '') {
      this.open(this.content)
    }

  }
  userobj = {
    'login': '1'
  }
  dopanzoom(x: number, y: number, zoomlevel: string) {
    //console.log(this.instance)
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
    this.instance.smoothMoveTo(x, y);
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

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
}

