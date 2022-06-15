import { Component, Input, OnInit } from '@angular/core';
import { Line, Point } from 'src/modelo';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.styl']
})
export class LineComponent implements OnInit, Line {

  @Input() line: Line;

  variable: number = 0;

  constructor() { }
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
  draw(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
