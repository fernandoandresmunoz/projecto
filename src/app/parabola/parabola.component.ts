import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parabola } from '../geometry/parabola';
import { Point } from 'point';
import { ParabolaConcreta } from '../clases-concretas/parabola-concreta';
import { TransformadorDePuntosConcretos } from '../clases-concretas/transformador-de-puntos-concretos';
import { ConcretePoint } from 'concrete-point';
import { ConcreteLine } from 'concrete-line';
import { Line } from 'line';

@Component({
  selector: 'app-parabola',
  templateUrl: './parabola.component.html',
  styleUrls: ['./parabola.component.styl']
})
export class ParabolaComponent implements OnInit , Parabola{


  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;


  public context: CanvasRenderingContext2D;


  usuarioX: number = 0
  pendiente: number = 0;
  

  ANCHO_PUNTO_DERIVADA = 5;

  derivada : Line ; 

  avanceXUsuario = 0.05

  parabola = new ParabolaConcreta();
  transformadorDePuntos = new TransformadorDePuntosConcretos(800, 800, 6 )
  distanciaPuntosDerivada = 0.001

  constructor() { }

  aumentarX() {
    this.usuarioX += this.avanceXUsuario;
    this.draw();
  }

  disminuirX() {
    this.usuarioX -= this.avanceXUsuario;
    this.draw();
  }



  abrir(): void {
    this.parabola.abrir();
  }
  cerrar(): void {
    throw new Error('Method not implemented.');
  }
  getPoints(desde: number, hasta: number): Point[] {
    return this.parabola.getPoints(desde, hasta);
  }
  calcularDerivada(valorEnX: number): number {
    return this.parabola.calcularDerivada(valorEnX);
  }
  calcularIntegral(desde: number, hasta: number): number {
    throw new Error('Method not implemented.');
  }
  funcion(x: number): number {
    return this.parabola.funcion(x);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();
  }

  draw(): void {

    // this.context.beginPath();

    this.context.clearRect(0, 0, 800, 800);

    // const p1 = new ConcretePoint(0, 400);
    // const p2 = new ConcretePoint(800, 400);

    // this.drawLine(p1, p2, 'gray' , 1)

    // const q1 = new ConcretePoint(400, 0);
    // const q2 = new ConcretePoint(400, 800);

    // this.drawLine(q1, q2, 'gray' , 1)

    const punto1 =  new ConcretePoint(this.usuarioX, this.funcion(this.usuarioX)) 
    const punto2 = new ConcretePoint(this.usuarioX + this.distanciaPuntosDerivada,
      this.funcion(this.usuarioX + this.distanciaPuntosDerivada)) 


    const linea = new ConcreteLine(punto1, punto2);

    this.derivada = linea;
    this.pendiente = linea.calcularPendiente()


    this.context.fillRect(

      this.transformadorDePuntos.transformarPunto(punto1).getX() - this.ANCHO_PUNTO_DERIVADA / 2, 
      this.transformadorDePuntos.transformarPunto(punto1).getY() -  this.ANCHO_PUNTO_DERIVADA / 2,
      this.ANCHO_PUNTO_DERIVADA,
      this.ANCHO_PUNTO_DERIVADA,
    )

    this.context.fillRect(

      this.transformadorDePuntos.transformarPunto(punto2).getX()- this.ANCHO_PUNTO_DERIVADA / 2,
      this.transformadorDePuntos.transformarPunto(punto2).getY()- this.ANCHO_PUNTO_DERIVADA / 2,
      this.ANCHO_PUNTO_DERIVADA,
      this.ANCHO_PUNTO_DERIVADA,
    )

    this.context.stroke()

    this.drawLine(this.transformadorDePuntos.transformarPunto( new ConcretePoint(-3,this.derivada.funcion(-3)) ),
    
    this.transformadorDePuntos.transformarPunto( new ConcretePoint(3, this.derivada.funcion(3)) ) ,
    'black',
    1 );

    this.context.stroke()


    const puntos = this.getPoints(-this.transformadorDePuntos.getAnchoCalculadora() / 2 ,
    this.transformadorDePuntos.getAnchoCalculadora() / 2);
    for (let i = 0; i < puntos.length; i++) {
      const p = puntos[i];
      const q = puntos[i + 1]
      const x1 = this.transformadorDePuntos.transformarPunto(p).getX();
      const y1 = this.transformadorDePuntos.transformarPunto(p).getY();

      const x2 = this.transformadorDePuntos.transformarPunto(q).getX();
      const y2 = this.transformadorDePuntos.transformarPunto(q).getY();

      this.drawLine(new ConcretePoint(x1, y1), new ConcretePoint(x2, y2), 'blue', 3)

    }


    

  }

drawLine(pointA: Point, pointB: Point, color: string, width: number): void {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = width;

    this.context.moveTo(pointA.getX() , pointA.getY() );
    this.context.lineTo(pointB.getX() , pointB.getY() );
    this.context.stroke();
  }


}
