import { Component, Input, OnInit } from '@angular/core';
import { Line, Point } from 'src/modelo';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.styl']
})
export class PointComponent implements OnInit, Point {

  @Input() point: Point;
  // @Input() name: string;

  constructor() {

   }
  getScaledX(): number {
    throw new Error('Method not implemented.');
  }
  getScaledY(): number {
    throw new Error('Method not implemented.');
  }
  setScale(scale: number): void {
    throw new Error('Method not implemented.');
  }
  getScale(): number {
    throw new Error('Method not implemented.');
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
  }
  disminuirX(): void {
    this.point.disminuirX();
  }
  aumentarY(): void {
    this.point.aumentarY();
  }
  disminuirY(): void {
    this.point.disminuirY();
  }
  draw(): void {
    this.point.draw();
  }

  ngOnInit(): void {
  }

}
