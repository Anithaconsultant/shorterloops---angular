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
  currentUserRole:string='';
  currentUserCartId='';
  positionObject = {
    'House6':  [[ -199, -3525],[712, 3965],[665, 3887],[628, 3811]],
    'House7':  [[ -443, -3538],[1049, 3965],[1003, 3887],[967, 3811]],
    'House8':  [[ -744, -3475],[1384, 3965],[1337, 3887],[1303, 3811]],
    'House9':  [[-1053, -3468],[1718, 3965],[1674, 3887],[1638, 3811]],
    'House10': [[-1282, -3537],[2061, 3965],[2009, 3887],[1978, 3811]],
    'House1':  [[ -277, -3247],[712, 3584],[665, 3459],[628, 3385]],
    'House2':  [[ -443, -3154],[1049, 3584],[1003, 3459],[967, 3385]],
    'House3':  [[ -744, -3154],[1384, 3584],[1337, 3459],[1303, 3385]],
    'House4':  [[-1053, -3154],[1718, 3584],[1674, 3459],[1638, 3385]],
    'House5': [[-1282,-3154],[2061, 3584],[2009, 3459],[1978, 3385]],
    'Recycling truck': [[-5641, -3623],[5930, 3965],[5898, 3887],[6023, 3811]],
    'Supermarket': [[ -5651, -3616],[6268, 3965],[6235, 3887],[6361, 3811]],
    'Grocery shop': [[-6011, -3608],[6602, 3965],[6576, 3887],[6698, 3811]],
    'Ubottle': [[-6360, -3606],[6945, 3965],[6910, 3887],[7034, 3811]],
    'Making plant': [[-6613, -3622],[7282, 3975],[7246, 3887],[7371, 3811]],
    'Reverse Vending Machine': [[-6635, -3154],[7295, 3584],[7246, 3459],[7371, 3385]],
    'Plastic Recycling plant': [[-6254, -3154],[6958, 3584],[6910, 3459],[7034, 3385]],
    'Refilling Van': [[-6158, -3154],[6617, 3584],[6576, 3459],[6698, 3385]],
    'Bottle collection truck': [[-5762, -3154],[6279, 3584],[6235, 3459],[6361, 3385]],
    'Mayor': [[-5762, -3154],[6268, 3584],[6235, 3459],[6361, 3385]]
  }
  constructor(private logser: LoginserviceService,private router:Router) {
    this.currentUserRole=this.logser.currentuser.Role;
    this.currentUserCartId=this.logser.currentuser.cartId;
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
  dopanzoom(x: number, y: number, zoomlevel: string) {
    //console.log(this.instance)
    this.instance.zoomTo(x, y, parseFloat(zoomlevel));
    this.instance.smoothMoveTo(x, y);

  }


  ngOnInit(): void {
   if(this.logser.currentuser.Username==''){
    this.router.navigate(["login"])
   }
  }
  @ViewChild('maincity', { static: false })
  private scene!: ElementRef;
  ngAfterViewInit(): void {
    this.instance = panzoom(this.scene.nativeElement, {
      maxZoom: 2,
      minZoom: 0.3,
      transformOrigin: { x: 0, y: 0 },
      bounds: true,
      boundsPadding: 1,
      filterKey: function () {
        return true;
      },
    });
  
    let a=this.currentUserRole;
    console.log(a);
    let x=this.positionObject[a as keyof typeof this.positionObject][0][0];
    let y=this.positionObject[a as keyof typeof this.positionObject][0][1];
    let x1=this.positionObject[a as keyof typeof this.positionObject][1][0];
    let y1=this.positionObject[a as keyof typeof this.positionObject][1][1];
    let x2=this.positionObject[a as keyof typeof this.positionObject][2][0];
    let y2=this.positionObject[a as keyof typeof this.positionObject][2][1];
    let x3=this.positionObject[a as keyof typeof this.positionObject][3][0];
    let y3=this.positionObject[a as keyof typeof this.positionObject][3][1];
    this.dopanzoom(x, y, '1');
    $(".cart").css({ 'left': x1+'px', 'top':y1+'px' });
    $(".housedisplay").css({ 'left': x2+'px', 'top':y2+'px' }).html(a+'<br/>cart ID : '+this.currentUserCartId);
    $(".displaypanel").css({ 'left': x3+'px', 'top':y3+'px' }).html('2000');
  }
  userobj={
    'login':'1'
  }
  logout(){
    this.userobj.login='0';
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

