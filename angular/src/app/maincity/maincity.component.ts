import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';
import panzoom from "panzoom";
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-maincity',
  templateUrl: './maincity.component.html',
  styleUrls: ['./maincity.component.scss']
})

export class MaincityComponent implements AfterViewInit, OnInit {
  public instance: any;
  currentUserRole:string='';
  positionObject = {
    'House6': [[-529, -3505],[707, 3897]],
    'Recycling truck': [[-5762, -3505],[707, 3897]],
    'Supermarket': [[-529, -3505],[707, 3897]],
  }
  constructor(private logser: LoginserviceService) {
    this.currentUserRole=this.logser.currentuser.Role;
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
    let x=this.positionObject[a as keyof typeof this.positionObject][0][0];
    let y=this.positionObject[a as keyof typeof this.positionObject][0][1];
    let x1=this.positionObject[a as keyof typeof this.positionObject][1][0];
    let y1=this.positionObject[a as keyof typeof this.positionObject][1][1];
    this.dopanzoom(x, y, '1');
    $(".cart").css({ 'left': x1+'px', 'top':y1+'px' });
  }

}

