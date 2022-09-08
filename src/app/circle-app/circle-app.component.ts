import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Circle } from '../model/circle';
import { CircleApp } from '../model/CircleApp';
import ConcreteCircleApp from '../model/ConcreteCircleApp';
import { Lienzo } from '../model/lienzo';

@Component({
  selector: 'app-circle-app',
  templateUrl: './circle-app.component.html',
  styleUrls: ['./circle-app.component.css']
})
export class CircleAppComponent implements OnInit, CircleApp {

  circleApp: CircleApp;
  @ViewChild('lienzo')
  lienzo: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.lienzo.nativeElement.getContext('2d');
    this.draw();
  }

  draw(): void {
    this.context.clearRect(0, 0, this.circleApp.getLienzo().getAncho(),
    this.circleApp.getLienzo().getLargo());
    for (const observer of this.getMainCircle().getObservers()) {
      this.context.beginPath();
      this.context.fillStyle = observer.getColor();
      this.context.arc(observer.getCentroX(), observer.getCentroY(), observer.getRadio(), 0, 2 * Math.PI);
      // this.context.font = "30px Arial";
      // this.context.fillText(observer.getCharacter(), observer.getCentroX(), observer.getCentroY());
      this.context.fill();
    }
  }
  mouseMove(evento: any) {
    this.getMainCircle().setCentroX(evento.clientX);
    this.getMainCircle().setCentroY(evento.clientY);

    this.draw();
  }

  constructor() {
    this.circleApp = new ConcreteCircleApp();
  }
  cambiarLienzo(lienzo: Lienzo): void {
    throw new Error('Method not implemented.');
  }
  obtenerLienzo(): Lienzo {
    throw new Error('Method not implemented.');
  }
  moverCircle(nuevoPunto: number): void {
    throw new Error('Method not implemented.');
  }
  setLienzo(lienzo: Lienzo): void {
    throw new Error('Method not implemented.');
  }
  getLienzo(): Lienzo {
    throw new Error('Method not implemented.');
  }



  avanzarX(distancia: number): void {
    this.circleApp.avanzarX(distancia);
  }
  retrocederX(distancia: number): void {
    throw new Error('Method not implemented.');
  }
  avanzarY(distancia: number): void {
    throw new Error('Method not implemented.');
  }
  retrocederY(distancia: number): void {
    throw new Error('Method not implemented.');
  }
  cambiarCentroX(centroX: number): void {
    throw new Error('Method not implemented.');
  }
  cambiarCentroY(centroY: number): void {
    throw new Error('Method not implemented.');
  }
  showObservers(): void {
    throw new Error('Method not implemented.');
  }
  showMainCirclePosition(): void {
    throw new Error('Method not implemented.');
  }
  getMainCircle(): Circle {
    return this.circleApp.getMainCircle();
  }
  setMainCircle(circle: Circle): void {
    throw new Error('Method not implemented.');
  }
  createObservers(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
