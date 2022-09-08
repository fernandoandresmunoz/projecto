import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'line';
import { Point } from 'point';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.styl']
})
export class LineComponent implements OnInit, Line {

  @Input() line: Line;

  variable: number = 0;



  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;


  public context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw(): void {
    // this.context.fillRect(10,10,100,100);

    this.context.clearRect(0, 0, 400, 400);
    this.context.fillRect(this.line.getPointA().getScaledX(), this.line.getPointA().getScaledY(), this.getScale(), this.getScale());
    this.context.fillRect(this.line.getPointB().getScaledX(), this.line.getPointB().getScaledY(), this.getScale(), this.getScale());
    // this.context.moveTo(this.line.getPointA().getX(), this.line.getPointA().getY());
    // this.context.lineTo(this.line.getPointB().getX(), this.line.getPointB().getY());
    this.context.beginPath();
    this.context.moveTo(this.line.getPointA().getScaledX(), this.line.getPointA().getScaledY());
    this.context.lineTo(this.line.getPointB().getScaledX(), this.line.getPointB().getScaledY());
    this.context.stroke();

  }




  constructor() { }
  getSplitPoints(quantity: number): Point[] {
    throw new Error('Method not implemented.');
  }
  getScale(): number {
    return this.line.getScale();
  }
  setScale(scale: number): void {
    this.line.setScale(scale);
  }
  getPoints(min: number, max: number, step: number): Point[] {
    throw new Error('Method not implemented.');
  }

  ecuacionRecta(): string {
    return this.line.ecuacionRecta();
  }
  intereseccionEnEjeY(): Point {
    return this.line.intereseccionEnEjeY();
  }

  calcularInterseccionRecta(line: Line): Point {
    throw new Error('Method not implemented.');
  }

  getValueY(): number {
    return this.line.getValueY();
  }
  getValueX(): number {
    return this.line.getValueX();
  }
  aumentarX(): void {
    this.line.aumentarX();
  }
  disminuirX(): void {
    this.line.disminuirX();
  }
  calcularPendiente(): number {
    return this.line.calcularPendiente();
  }
  setPointA(point: Point): void {

    this.line.setPointA(point);
  }
  setPointB(point: Point): void {
    this.line.setPointB(point);
  }
  getPointA(): Point {
    return this.line.getPointA();
  }
  getPointB(): Point {
    return this.line.getPointB();
  }
  calcularDistancia(): number {
    return this.line.calcularDistancia();
  }
  

  ngOnInit(): void {
  }

}
