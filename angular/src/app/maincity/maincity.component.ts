import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})

export class MaincityComponent implements AfterViewInit, OnInit {

  public instance: any;
  currentUserRole: string = '';
  currentUserCartId = '';
  objkey = Object.keys;
  positionObject = {
    'House6': [[-199, -3525], [712, 3965], [665, 3898], [614, 3807]],
    'House7': [[-443, -3538], [1049, 3965], [1003, 3898], [951, 3807]],
    'House8': [[-744, -3475], [1384, 3965], [1337, 3898], [1288, 3807]],
    'House9': [[-1053, -3468], [1718, 3965], [1674, 3898], [1626, 3807]],
    'House10': [[-1282, -3537], [2061, 3965], [2009, 3898], [1962, 3807]],
    'House1': [[-277, -3247], [712, 3584], [665, 3472], [614, 3382]],
    'House2': [[-443, -3154], [1049, 3584], [1003, 3472], [951, 3382]],
    'House3': [[-744, -3154], [1384, 3584], [1337, 3472], [1288, 3382]],
    'House4': [[-1053, -3154], [1718, 3584], [1674, 3472], [1626, 3382]],
    'House5': [[-1282, -3154], [2061, 3584], [2009, 3472], [1962, 3382]],
    'Recycling': [[-5641, -3623], [5930, 3965], [5898, 3898], [6009, 3806]],
    'Supermarket': [[-5651, -3616], [6268, 3965], [6235, 3898], [6346, 3806]],
    'Grocery': [[-6011, -3608], [6602, 3965], [6576, 3898], [6683, 3806]],
    'Ubottle': [[-6360, -3606], [6945, 3965], [6910, 3898], [7020, 3806]],
    'Making': [[-6613, -3622], [7282, 3975], [7246, 3898], [7357, 3806]],
    'Reverse': [[-6635, -3154], [7295, 3584], [7246, 3473], [7357, 3382]],
    'Plastic': [[-6254, -3154], [6958, 3584], [6910, 3473], [7020, 3382]],
    'Refilling': [[-6158, -3154], [6617, 3584], [6576, 3473], [6683, 3382]],
    'Bottle': [[-5762, -3154], [6279, 3584], [6235, 3473], [6346, 3382]],
    'Mayor': [[-5762, -3154], [5931, 3584], [5898, 3473], [6009, 3382]]
  }
  user: any;
  hasMayor = false;
  cityname: any;
  constructor(private logser: LoginserviceService, private router: Router) {
    this.currentUserRole = this.logser.currentuser.Role;
    this.currentUserCartId = this.logser.currentuser.cartId;

  }
  @HostListener('document:keydown.arrowdown', ['$event'])
  movedown($event: any) {
    $event.stopPropagation();
    let leftval = $(".cart").css('top');
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
        if (this.user[t].login == 1) {
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
      }
    });
  }
  @ViewChild('maincity', { static: false })
  private scene!: ElementRef;
  ngAfterViewInit(): void {
    this.instance = panzoom(this.scene.nativeElement, {
      maxZoom: 3,
      minZoom: 0.3,
      initialZoom: 1,
      transformOrigin: {x: 0.5, y: 0.5},
      bounds: true,
      boundsPadding: 1,
      smoothScroll: false,
      filterKey: function () {
        return true;
      },
    });
    let a = this.currentUserRole.split(" ")[0];
    let x = this.positionObject[a as keyof typeof this.positionObject][0][0];
    let y = this.positionObject[a as keyof typeof this.positionObject][0][1];
    let x1 = this.positionObject[a as keyof typeof this.positionObject][1][0];
    let y1 = this.positionObject[a as keyof typeof this.positionObject][1][1];
    let x2 = this.positionObject[a as keyof typeof this.positionObject][2][0];
    let y2 = this.positionObject[a as keyof typeof this.positionObject][2][1];
    let x3 = this.positionObject[a as keyof typeof this.positionObject][3][0];
    let y3 = this.positionObject[a as keyof typeof this.positionObject][3][1];
    this.dopanzoom(x, y, '1');
    $(".cart").css({ 'left': x1 + 'px', 'top': y1 + 'px' });
    $(".housedisplay").css({ 'left': x2 + 'px', 'top': y2 + 'px' }).html('cart ID : ' + this.currentUserCartId);
    $(".houselite").hide();
    $(".displayrole").html(this.logser.currentuser.Role);
    $(".displaypic,.cartavatar").addClass('pic_' + this.logser.currentuser.avatar);
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
}

