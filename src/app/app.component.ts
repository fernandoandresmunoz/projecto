import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConcreteShapeFactory } from 'concreteShapeFactory';
import { Cube } from 'cube';
import { Line } from 'line';
import { Point } from 'point';
import { ShapeFactory } from 'shapeFactory';
import { App,      COneLineAndPointApp,    OneLineAndPointApp  } from 'src/modelo';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit  {
  cube: Cube;
  shapeFactory: ShapeFactory = new ConcreteShapeFactory();
  generacion = 0;

  constructor() {
    this.cube = this.shapeFactory.createMilitaryCube();


  }


  ngOnInit(): void {


  }



}

