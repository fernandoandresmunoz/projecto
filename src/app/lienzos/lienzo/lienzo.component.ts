import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Lienzo } from '../lienzo';
import { Function as Funcion } from '../function';
import { FabricaDeLienzos } from '../fabrica-de-lienzos';
import { FabricaDeLienzosConcreta } from '../fabrica-de-lienzos-concreta';
import { TransformadorDePuntos } from 'src/app/geometry/transformador-de-puntos';
import { TransformadorDePuntosConcretos } from 'src/app/clases-concretas/transformador-de-puntos-concretos';
import { Point } from 'point';
import { ConcretePoint } from 'concrete-point';
import { Integral } from '../integral';
import { Derivada } from '../derivada';
import { ConcreteLine } from 'concrete-line';

@Component({
  selector: 'app-lienzo',
  templateUrl: './lienzo.component.html',
  styleUrls: ['./lienzo.component.styl']
})
export class LienzoComponent implements OnInit, Lienzo {

  ANCHO_PUNTO_DERIVADA = 5;
  colorIntegral: string = '#0159cb';
    distanciaPuntosDerivada = 0.001
  intervaloNumerosEjeY: number = 1;
  ANCHO_EJE_X = 20  ;
  DESDE_X=0;
  HASTA_X=250;
  DESDE_Y=-3.5
  HASTA_Y=3.5
  intervaloNumerosEjeX: number = 50;
  transformadorDePuntos: TransformadorDePuntos;

  fabrica: FabricaDeLienzos = new FabricaDeLienzosConcreta()
  @Input() lienzo: Lienzo ;
  // lienzo: Lienzo = this.fabrica.crear();

  centerX : number;
  centerY : number;

  dibujarEjes = true;

  anchoRectangulo = 0.01
  fillRectangles = true;

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() { }
  setDesdeX(desdeX: number): void {
    throw new Error('Method not implemented.');
  }
  setHastaX(hastaX: number): void {
    throw new Error('Method not implemented.');
  }
  setDesdeY(desdeY: number): void {
    throw new Error('Method not implemented.');
  }
  setHastaY(hastaY: number): void {
    throw new Error('Method not implemented.');
  }
  getDesdeX(): number {
    return this.lienzo.getDesdeX()
  }
  getHastaX(): number {
    return this.lienzo.getHastaX()
  }
  getDesdeY(): number {
    return this.lienzo.getDesdeY()
  }
  getHastaY(): number {
    return this.lienzo.getHastaY()
  }
  setBackground(color: string): void {
    throw new Error('Method not implemented.');
  }
  getBackground(): string {
    return this.lienzo.getBackground()
  }
  getTitle(): string {
    return this.lienzo.getTitle()
  }
  setTitle(title: string): void {
    throw new Error('Method not implemented.');
  }
  getAncho(): number {
    return this.lienzo.getAncho();
  }
  getLargo(): number {
    return this.lienzo.getLargo();
  }

  agregarFuncion(funcion: Funcion): void {
    this.lienzo.agregarFuncion(funcion);
  }
  setAncho(ancho: number): void {
    this.lienzo.setAncho(ancho);
  }
  setLargo(largo: number): void {
    this.lienzo.setLargo(largo);
  }
  getFunciones(): Funcion[] {
    return this.lienzo.getFunciones()
  }

  dibujarTexto(texto: string, x: number, y: number, color: string = 'gray') {

    this.context.font = "18px Arial";
    this.context.fillStyle = color;
    const point = new ConcretePoint(x, y)
    const newPoint = this.transformadorDePuntos.transformarPunto(point, this.centerX, this.centerY)
    this.context.fillText(texto, newPoint.getX(), newPoint.getY());
  }

  dibujarLinea(point1: Point, point2: Point, color: string = 'gray', width: number = 1) {
    const newPoint1 = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY);
    const newPoint2 = this.transformadorDePuntos.transformarPunto(point2, this.centerX, this.centerY);
    this.context.beginPath()
    this.context.strokeStyle = color;
    this.context.lineWidth = width;


    this.context.moveTo(newPoint1.getX(), newPoint1.getY());
    this.context.lineTo(newPoint2.getX(), newPoint2.getY());
    this.context.stroke();
  }


  // dibujar integrales
  dibujarIntegral(inicio: number, fin: number, funcion: Funcion, integral: Integral): void {


    const cantidadRectangulos = ( fin - inicio ) / this.anchoRectangulo
    // al final solo me importa el valor en x del inicio y el fin de los rangos que voy a utilizar 
    const point1 = new ConcretePoint(inicio, 0)
    const point2 = new ConcretePoint(inicio, funcion.funcion(inicio)) //(inicio))
    const point3 = new ConcretePoint(fin, 0)
    const point4 = new ConcretePoint(fin, funcion.funcion(fin))



    // que todo se calcule en funcion del punto A
    const puntoA = new ConcretePoint(inicio, 0);
    // const puntoB = new ConcretePoint(puntoA.getX() + this.anchoRectangulo, 0)
    // const puntoC = new ConcretePoint(puntoA.getX() + this.anchoRectangulo, this.funcion(puntoA.getX()))
    // const puntoD = new ConcretePoint(puntoA.getX(), this.funcion(puntoA.getX()))

    // this.dibujarRectangulo(puntoA, puntoB, puntoC, puntoD)

    const valorIntegral = 0

    for (let i = 0; i < cantidadRectangulos; i++) {
      let puntoE = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, 0) // es igual al punto b 
      let puntoF = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, 0)
      let puntoG = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, funcion.funcion(puntoA.getX() + i * this.anchoRectangulo))
      let puntoH = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, funcion.funcion(puntoA.getX() + i * this.anchoRectangulo))

      let diffX = puntoF.getX() - puntoE.getX()
      let diffY = puntoG.getY() - puntoF.getY();

      // this.valorIntegral += (diffX * diffY);


      if (this.fillRectangles) {

        this.dibujarFillRectangulo(puntoE, puntoF, puntoG, puntoH, integral);
      }
      else {

        this.dibujarRectangulo(puntoE, puntoF, puntoG, puntoH);
      }



    }

    // // que todos se calculen en funcion del punto E
    // let puntoE = new ConcretePoint(puntoA.getX() + 1 * this.anchoRectangulo, 0) // es igual al punto b 
    // let puntoF = new ConcretePoint(puntoA.getX() + 2 * this.anchoRectangulo, 0)
    // let puntoG = new ConcretePoint(puntoA.getX() + 2 * this.anchoRectangulo, this.funcion(puntoA.getX() + 1* this.anchoRectangulo) )
    // let puntoH = new ConcretePoint(puntoA.getX() + 1 * this.anchoRectangulo, this.funcion(puntoA.getX() + 1 * this.anchoRectangulo) )
    // this.dibujarRectangulo(puntoE, puntoF, puntoG, puntoH);

    // let puntoI = new ConcretePoint(puntoA.getX() + 2 * this.anchoRectangulo, 0) // es igual al punto b 
    // let puntoJ = new ConcretePoint(puntoA.getX() + 3 * this.anchoRectangulo, 0)
    // let puntoK = new ConcretePoint(puntoA.getX() + 3 * this.anchoRectangulo, this.funcion(puntoA.getX() + 2* this.anchoRectangulo) )
    // let puntoL = new ConcretePoint(puntoA.getX() + 2 * this.anchoRectangulo, this.funcion(puntoA.getX() + 2 * this.anchoRectangulo) )
    // this.dibujarRectangulo(puntoI, puntoJ, puntoK, puntoL);

    // let puntoM = new ConcretePoint(puntoA.getX() + 3 * this.anchoRectangulo, 0) // es igual al punto b 
    // let puntoN = new ConcretePoint(puntoA.getX() + 4 * this.anchoRectangulo, 0)
    // let puntoO = new ConcretePoint(puntoA.getX() + 4 * this.anchoRectangulo, this.funcion(puntoA.getX() + 3* this.anchoRectangulo) )
    // let puntoP = new ConcretePoint(puntoA.getX() + 3 * this.anchoRectangulo, this.funcion(puntoA.getX() + 3 * this.anchoRectangulo) )
    // this.dibujarRectangulo(puntoM, puntoN, puntoO, puntoP);





    // desde
    // this.dibujarLinea(point1, point2, 'red', 3)
    // // hasta
    // this.dibujarLinea(point3, point4, 'red', 3)



    // this.dibujarTexto('c', puntoC.getX(), puntoC.getY() )
    // this.dibujarTexto('d', puntoD.getX(), puntoD.getY())
    // this.dibujarTexto('b', puntoB.getX(), puntoB.getY())
    // this.dibujarTexto('a', puntoA.getX(), puntoA.getY())
    // this.dibujarTexto('e', puntoE.getX(), puntoE.getY() -0.3)
    // this.dibujarTexto('f', puntoF.getX(), puntoF.getY())
    // this.dibujarTexto('g', puntoG.getX(), puntoG.getY())
    // this.dibujarTexto('h', puntoH.getX(), puntoH.getY())


  }


  dibujarRectangulo(point1: Point, point2: Point, point3: Point, point4: Point) {
    this.dibujarLinea(point1, point2, 'purple', 1);
    this.dibujarLinea(point2, point3, 'purple', 1);
    this.dibujarLinea(point3, point4, 'purple', 1);
    this.dibujarLinea(point4, point1, 'purple', 1);
  }

  dibujarNumerosEjes() {

    for (let i = this.getDesdeX(); i < (this.getHastaX() ) + 1; i =  i + this.intervaloNumerosEjeX ) {
      this.dibujarTexto(i.toString(), i - 0.1, -0.4, 'black')
      this.dibujarLinea(new ConcretePoint(i, 0.1), new ConcretePoint(i, -0.1), 'black', 1)
    }

    // eje y 
    // for (let i = this.DESDE_Y ; i < (this.HASTA_Y ) + 1; i = i + this.intervaloNumerosEjeY) {
    //   if ( i !== 0 ) {

    //   this.dibujarTexto(i.toString(),  -0.4,i - 0.1, 'black'  )
    //   this.dibujarLinea(new ConcretePoint( 0.1, i), new ConcretePoint( -0.1, i), 'black', 1)
    //   }
    // }


  }

  draw(): void {
    this.transformadorDePuntos = new TransformadorDePuntosConcretos(this.getAncho(),
      this.getLargo(), this.getHastaX() - this.getDesdeX(), this.getHastaY() - this.getDesdeY())

    if (this.dibujarEjes) {
      this.dibujarEjesXY()
      this.dibujarNumerosEjes()

    }


    this.dibujarCurva()

  }

  dibujarDerivada(funcion: Funcion, derivada: Derivada): void {
    const punto1 = new ConcretePoint(derivada.getPuntoX(), funcion.funcion(derivada.getPuntoX()))
    const punto2 = new ConcretePoint(derivada.getPuntoX() + this.distanciaPuntosDerivada,
      funcion.funcion(derivada.getPuntoX() + this.distanciaPuntosDerivada))


    const linea = new ConcreteLine(punto1, punto2);

    const line = linea;
    const pendiente = linea.calcularPendiente()


    this.drawLine(
      this.transformadorDePuntos.transformarPunto(new ConcretePoint(-this.ANCHO_EJE_X / 2, line.funcion(-this.ANCHO_EJE_X / 2)), this.centerX, this.centerY),

      this.transformadorDePuntos.transformarPunto(new ConcretePoint(this.ANCHO_EJE_X / 2, line.funcion(this.ANCHO_EJE_X / 2)), this.centerX, this.centerY),
      derivada.getColor(),
      2);




      // aqui dibuja los puntos que se usan para calcular la derivada 
    this.context.fillRect(

      this.transformadorDePuntos.transformarPunto(punto1, this.centerX, this.centerY).getX() - this.ANCHO_PUNTO_DERIVADA / 2,
      this.transformadorDePuntos.transformarPunto(punto1, this.centerX, this.centerY).getY() - this.ANCHO_PUNTO_DERIVADA / 2,
      this.ANCHO_PUNTO_DERIVADA,
      this.ANCHO_PUNTO_DERIVADA,
    )

    this.context.fillRect(

      this.transformadorDePuntos.transformarPunto(punto2, this.centerX, this.centerY).getX() - this.ANCHO_PUNTO_DERIVADA / 2,
      this.transformadorDePuntos.transformarPunto(punto2, this.centerX, this.centerY).getY() - this.ANCHO_PUNTO_DERIVADA / 2,
      this.ANCHO_PUNTO_DERIVADA,
      this.ANCHO_PUNTO_DERIVADA,
    )




  }


  dibujarFillRectangulo(point1: Point, point2: Point, point3: Point, point4: Point, integral: Integral): void {

    let newPoint1 = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY);
    let newPoint2 = this.transformadorDePuntos.transformarPunto(point2, this.centerX, this.centerY);
    let newPoint3 = this.transformadorDePuntos.transformarPunto(point3, this.centerX, this.centerY);
    let newPoint4 = this.transformadorDePuntos.transformarPunto(point4, this.centerX, this.centerY);

    this.context.fillStyle = integral.getColor();
    this.context.fillRect(newPoint4.getX(), newPoint4.getY(), newPoint3.getX() - newPoint4.getX(), newPoint2.getY() - newPoint3.getY())


  }

  dibujarEjesXY(): void {

    // // eje x
    const p1 = new ConcretePoint(0, this.centerY);
    const p2 = new ConcretePoint(this.getAncho(), this.centerY);


    this.dibujarLinea(new ConcretePoint(this.getDesdeX(), 0), new ConcretePoint(this.getHastaX(), 0))

    // this.drawLine(this.transformadorDePuntos.transformarPunto(p1, this.centerX, this.centerY),
    // this.transformadorDePuntos.transformarPunto(p2, this.centerX, this.centerY) 
    // , 'gray', 1)


    // eje y 
    // const q1 = new ConcretePoint(this.anchoLienzo / 2, 0);
    // const q2 = new ConcretePoint(this.anchoLienzo/ 2, this.largoLienzo);
    // this.drawLine(q1, q2, 'gray', 1)

  }

  getColor(): string {
    return this.lienzo.getColor()
  }
  setColor(color: string): void {
    this.lienzo.setColor(color);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    // this.centerX = ( this.HASTA_X - this.DESDE_X  )/ 2

    // this.centerX = this.getAncho() / 2;
    this.centerX = 0
  this.centerY = this.getLargo() / 2;
  // this.centerY = this.getLargo() / 2;


    this.draw();
  }

  dibujarCurva(): void {




    this.getFunciones().map(funcion => {
      // const puntos = funcion.getPoints(-this.transformadorDePuntos.getAnchoCalculadora() / 2,
      //   this.transformadorDePuntos.getAnchoCalculadora() / 2, 0.01);
      const puntos = funcion.getPoints(this.getDesdeX(), this.getHastaX(), 0.1)



      for ( const integral of funcion.getIntegrales()) {
        this.dibujarIntegral(integral.getInicioX(), integral.getFinX(), funcion, integral)
      }

      for ( const derivada of funcion.getDerivadas()) {
        this.dibujarDerivada(funcion, derivada);
      }



      for (let i = 0; i < puntos.length; i++) {
        try {

          const p = puntos[i];
          const q = puntos[i + 1]
          const x1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getX();
          const y1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getY();

          const x2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getX();
          const y2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getY();

          this.drawLine(new ConcretePoint(x1, y1), new ConcretePoint(x2, y2), funcion.getColor(), funcion.getAncho())






        } catch {

        }

      }
    })




  }

  drawLine(pointA: Point, pointB: Point, color: string, width: number): void {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = width;

    this.context.moveTo(pointA.getX(), pointA.getY());
    this.context.lineTo(pointB.getX(), pointB.getY());
    this.context.stroke();
  }

}
