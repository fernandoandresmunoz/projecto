import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { JUEGO } from 'src/JUEGO';

@Component({
  selector: 'app-curva',
  templateUrl: './curva.component.html',
  styleUrls: ['./curva.component.styl']
})
export class CurvaComponent implements OnInit, OnChanges {

  @Input() points: [number, number][];
  @Input() azules: [number, number][];
  @Input() verdes: [number, number][];
  @Input() rojos: [number, number][];
  @Input() cafes: [number, number][];
  @Input() grises: [number, number][];

  @Input() generacion: number;
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  puntoAnterior: [number, number];
  anchoLienzo = 500;
  alturaLienzo = 500;

  public context: CanvasRenderingContext2D;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
  }

  ngOnInit(): void {
  }

  getPoints(): [number, number][] {
    if ( this.points.length < 80) {
      return this.points.reverse();
    } 
    return this.points.slice(this.points.length - 80 , this.points.length - 1).reverse()
  }

  parsePoints(points: [number, number][]): [number, number][] {
    if ( points.length < 80) {
      return points.reverse();
    } 
    return points.slice(points.length - 80 , points.length - 1).reverse()

  }

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();

  }

  drawLine(points: [number, number][]): void {
  let puntoAnterior: [number, number];

      points.reverse().map((point, index) => {
      this.context.beginPath();
      const x = index * 10
      const y = this.alturaLienzo - (point[1] * this.alturaLienzo)


      if (puntoAnterior && index !== 0) {
        this.context.moveTo(puntoAnterior[0], puntoAnterior[1])
        this.context.lineTo(x, y)
      }
      puntoAnterior = [index * 10, this.alturaLienzo - (point[1] * this.alturaLienzo)]
      this.context.stroke();
    }) 
  }

  draw() {
    this.context.clearRect(0, 0, this.anchoLienzo, this.alturaLienzo);
    this.context.strokeStyle = 'Black'
    this.context.fillStyle = 'Black';

    this.drawLine(this.parsePoints(this.points));
    this.context.strokeStyle = 'Blue'
    this.drawLine(this.parsePoints(this.azules));
    this.context.strokeStyle = 'Red'
    this.drawLine(this.parsePoints(this.rojos));

    this.context.strokeStyle = 'Green'
    this.drawLine(this.parsePoints(this.verdes));
    this.context.strokeStyle = 'Brown'
    this.drawLine(this.parsePoints(this.cafes));
    this.context.strokeStyle = 'Gray'
    this.drawLine(this.parsePoints(this.grises));
    // this.drawLine(this.azules);

    this.context.strokeStyle = 'Red'
    this.context.beginPath()
    this.context.moveTo(0, this.alturaLienzo - JUEGO.UMBRAL_SUPERIOR * this.alturaLienzo);
    this.context.lineTo(800, this.alturaLienzo - JUEGO.UMBRAL_SUPERIOR * this.alturaLienzo)
    this.context.stroke();
    this.context.beginPath()
    this.context.moveTo(0, this.alturaLienzo - JUEGO.UMBRAL_INFERIOR * this.alturaLienzo);
    this.context.lineTo(800, this.alturaLienzo - JUEGO.UMBRAL_INFERIOR * this.alturaLienzo)
    this.context.stroke();



  }
}
