import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
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
  public instance: any;
  public instance1: any;
  currentUserRole: string = '';
  currentUserCartId = '';
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
  assetdata:any;
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

  topval = 0;
  @HostListener('document:keydown.arrowdown', ['$event'])
  movedown($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      let leftval = $(".cart").css('top');
      leftval = parseInt(leftval) + 105 + "px";
      $(".cart").css({ 'top': leftval })
    }
    else {
      let leftval = $(".supermarketcart").css('top');
      leftval = parseInt(leftval) + 105 + "px";
      $(".supermarketcart").css({ 'top': leftval })
    }


  }
  @HostListener('document:keydown.arrowup', ['$event'])
  moveup($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      let leftval = $(".cart").css('top');
      leftval = parseInt(leftval) - 105 + "px";
      $(".cart").css({ 'top': leftval })
    }
    else {
      let leftval = $(".supermarketcart").css('top');
      leftval = parseInt(leftval) - 105 + "px";
      $(".supermarketcart").css({ 'top': leftval })
    }
  }
  @HostListener('document:keydown.arrowleft', ['$event'])
  moveleft($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      let leftval = $(".cart").css('left');
      leftval = parseInt(leftval) - 105 + "px";
      $(".cart").css({ 'left': leftval })
    }
    else {
      let leftval = $(".supermarketcart").css('left');
      leftval = parseInt(leftval) - 105 + "px";
      $(".supermarketcart").css({ 'left': leftval })
    }
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  moveright($event: any) {
    $event.stopPropagation();
    if (this.opensuperflag == false) {
      let leftval = $(".cart").css('left');
      leftval = parseInt(leftval) + 105 + "px";
      $(".cart").css({ 'left': leftval })
    }
    else {
      let leftval = $(".supermarketcart").css('left');
      leftval = parseInt(leftval) + 105 + "px";
      $(".supermarketcart").css({ 'left': leftval })
    }
  }

  ngOnInit(): void {

    if (this.logser.currentuser.Username != '') {
      sessionStorage.setItem('currentUser', JSON.stringify(this.logser.currentuser));
    } else {
      let current = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
      this.logser.currentuser = JSON.parse(JSON.stringify(current))
      console.log(this.logser.currentuser)
      this.currentUserRole = this.logser.currentuser.Role;
      this.currentUserCartId = this.logser.currentuser.cartId;
      this.currentusername = this.logser.currentuser.Username;
      this.currentusergender = this.logser.currentuser.gender;
      this.currentuseravatar = this.logser.currentuser.avatar;
      this.currentusercityId = this.logser.currentuser.CityId;
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
        if (this.user[t].login == 1 && this.user[t].User_cityid == this.logser.currentuser.CityId) {
          $("." + this.user[t].Role.split(" ")[0]).show();
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
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
    this.instance.smoothMoveTo(x, y);
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
    console.log(event.previousContainer, event.container)
    if (event.previousContainer === event.container) {
      console.log('inga', event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(
        event.container.data, event.previousIndex, event.currentIndex,);
    } else {
      console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  bottleclass='';
  exit() { }
  leavecity() { }
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
    console.log(this.instance1);
    this.instance1.zoomTo(x, y, 0.2);
    this.instance1.smoothMoveTo(x, y);
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }
  frontclass='';
  leblfound=false;
  frontlabel='';
  opensticker(bottlesticker: any, event: any) {
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let elementClass=element.className;
    this.logser.getthisAssets(elementId).subscribe((data) => {
      this.assetdata=data;
      this.frontclass=elementClass.split(" ")[1]+"_big";
      console.log(this.assetdata);
      let checkuniversal=this.assetdata[0]['Bottle_Code'].split(".")[0];
      if(checkuniversal=='UB'){
        this.leblfound=true;
        this.bottleclass="universal";
        this.frontlabel=this.assetdata[0]['Content_Code'].split(".")[1].toString().toLowerCase()+"_label";
      }
      else{
        this.leblfound=false;
        this.bottleclass=this.assetdata[0]['Content_Code'].split(".")[1];
      }
      
      console.log(this.bottleclass);
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


