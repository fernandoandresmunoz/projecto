import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'line';
import { Point } from 'point';
@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.styl']
})
export class PointComponent implements OnInit, Point  {


  x: number;
  y: number;
  id: number;
  lienzo: number;
  etiqueta: string;

  getLine(pointB: Point): Line {
    throw new Error('Method not implemented.');
  }

  @Input() point: Point;

  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;

  public context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw(): void {
    this.context.clearRect(0, 0, 400, 400);
    this.context.fillRect(this.point.getScaledX(), this.point.getScaledY(), this.point.getScale(), this.point.getScale());
  }

  getScaledX(): number {
    return this.point.getScaledX();
  }
  getScaledY(): number {
    return this.point.getScaledY();
  }
  setScale(scale: number): void {
    this.point.setScale(scale);
    this.draw();
  }
  getScale(): number {
    return this.point.getScale();
  }
  calularInterseccionPerpendicular(line: Line): Point {
    return this.point.calularInterseccionPerpendicular(line);
  }
  ecuacionRectaPerpendicular(line: Line): string {
    return this.point.ecuacionRectaPerpendicular(line);
  }
  rectaPerpendicular(): Line {
    throw new Error('Method not implemented.');
  }
  puntoPerpendicular(line: Line): Point {
    throw new Error('Method not implemented.');
  }
  getName(): string {
    throw new Error('Method not implemented.');
  }
  setName(name: string): void {
    throw new Error('Method not implemented.');
  }

  getX(): number {
    return this.point.getX();
  }
  setX(x: number): void {
    this.point.setX(x);
  }
  getY(): number {
    return this.point.getY();
  }
  setY(y: number): void {
    this.point.setY(y);
  }
  aumentarX(): void {
    this.point.aumentarX();
    this.draw();
  }
  disminuirX(): void {
    this.point.disminuirX();
    this.draw();
  }
  aumentarY(): void {
    this.point.aumentarY();
    this.draw();
  }
  disminuirY(): void {
    this.point.disminuirY();
    this.draw();
  }

  ngOnInit(): void {
  }

}
