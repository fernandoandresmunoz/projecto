import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Parabola } from '../geometry/parabola';
import { Point } from 'point';
import { ParabolaConcreta } from '../clases-concretas/parabola-concreta';
import { TransformadorDePuntosConcretos } from '../clases-concretas/transformador-de-puntos-concretos';
import { ConcretePoint } from 'concrete-point';
import { ConcreteLine } from 'concrete-line';
import { Line } from 'line';
import { TransformadorDePuntos } from '../geometry/transformador-de-puntos';
import { ControladorCalculadora } from '../calculadora/controlador-calculadora';

@Component({
  selector: 'app-parabola',
  templateUrl: './parabola.component.html',
  styleUrls: ['./parabola.component.styl']
})
export class ParabolaComponent implements OnInit, Parabola, ControladorCalculadora {


  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;


  public context: CanvasRenderingContext2D;

  @Input() tipo: string;

  usuarioX: number = 0
  pendiente: number = 0;


  ANCHO_PUNTO_DERIVADA = 5;

  derivada: Line;

  // esto es lo que avanza el punto que calcula la derivada
  avanceXUsuario = 0.5
  parabola: Parabola;
  transformadorDePuntos: TransformadorDePuntos;
  distanciaPuntosDerivada: number;
  ANCHO_EJE_X = 10  ;
  inicio = -3;
  fin = 2.2
  dibujarEjes = true;

  anchoRectangulo = 0.01
  cantidadRectangulos = 600

  colorIntegral: string = '#0159cb';
  colorCurva: string = '#d71d77';
  anchoCurva: number = 2;
  anchoDerivada: number = 4;
  colorDerivada: string = 'green';
  tamanoFuenteEjeX: number = 12;
  tamanoFuenteEjeY: number = 12;
  colorFondoLienzo: string = '#e3f0b2';
  mostrarNumeronEjeX: boolean = true;
  mostrarNumerosEjeY: boolean = true;
  mostrarTicksEjeX : boolean = true;
  mostrarTicksEjeY: boolean = true;
  intervaloNumerosEjeX: number = 1;
  intervaloNumerosEjeY: number = 1;
  posicionNumerosEjeX: number[] ;

  posicionNumerosEjeY: number[] ;
  anchoEjeX: number = 1;
  anchoEjeY : number = 1;
  colorEjeX: string = 'black'
  colorEjeY: string = 'black';
  colorNumerosEjeX: string = 'black'
  colorNumerosEjeY: string = 'black'
  altoTickEjeX: number;
  anchoTickEjeY: number;

  anchoLienzo =800;
  largoLienzo = 800;

  centerX = this.anchoLienzo / 2;
  centerY = this.largoLienzo / 2;

  mostrarDerivada = true;


  centrar(): void { 
    this.centerX = this.anchoLienzo/2;
    this.centerY = this.largoLienzo/2;
    this.draw()
  }

  aumentarCenterX() {
    this.centerX += 10
    this.draw()

  }

  disminuirCenterX() {
    this.centerX -= 10
    this.draw()
  }
  aumentarCenterY() {
    this.centerY += 10
    this.draw()
  }

  disminuirCenterY() {
    this.centerY -= 10
    this.draw()
  }


  aumentarAnchoLienzo() {
    this.anchoLienzo += 10;
    this.draw()
  }
  disminuirAnchoLienzo() {
    this.anchoLienzo -= 10;
    this.draw()
  }

  aumentarLargoLienzo() {
    this.largoLienzo += 10;
    this.draw()
  }
  disminuirLargoLienzo() {
    this.largoLienzo -= 10;
    this.draw()
  }




  selectedValue: string;

  constructor() {

  }
  cambiarMostrarDerivada(mostrar: boolean): void {
    this.mostrarDerivada = Boolean( mostrar );
    this.draw()
  }


  cambiandoColor(asd: string) {
    console.log('camdiando color ', asd)
  }
  subirPantalla(): void {
    throw new Error('Method not implemented.');
  }
  bajarPantalla(): void {
    throw new Error('Method not implemented.');
  }
  moverPantallaIzquierda(): void {
    throw new Error('Method not implemented.');
  }
  moverPantallaDerecha(): void {
    throw new Error('Method not implemented.');
  }
  cambiarColorIntegral(color: string): void {
    this.colorIntegral = color;
    this.draw();
  }
  cambiarColorCurva(color: string): void {
    this.colorCurva = color;
    this.draw();
  }
  cambiarAnchoCurva(ancho: number): void {
    this.anchoCurva =  ancho ;
    this.draw();
  }
  cambiarAnchoDerivada(ancho: number): void {
    this.anchoDerivada = ancho;
    this.draw();
  }
  cambiarColorDerivada(color: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarTamanoFuenteEjeX(tamano: number): void {
    throw new Error('Method not implemented.');
  }
  cambiarTamanoFuenteEjeY(tamano: number): void {
    throw new Error('Method not implemented.');
  }
  cambiarColorFondoLienzo(color: string): void {
    console.log(color)
    this.colorFondoLienzo = color;
    this.draw();

  }
  mostrarNumerosEnEjeX(mostrar: boolean): void {
    throw new Error('Method not implemented.');
  }
  mostrarNumerosEnEjeY(mostrar: boolean): void {
    throw new Error('Method not implemented.');
  }
  mostrarTicksEnEjeX(mostrar: boolean): void {
    throw new Error('Method not implemented.');
  }
  mostrarTicksEnEjeY(mostrar: boolean): void {
    throw new Error('Method not implemented.');
  }
  setIntervaloNumeroEjeX(intervalo: number): void {
    throw new Error('Method not implemented.');
  }
  setIntervaloNumeroEjeY(intervalo: number): void {
    throw new Error('Method not implemented.');
  }
  setAnchoEjeX(ancho: number): void {
    throw new Error('Method not implemented.');
  }
  setAnchoEjeY(ancho: number): void {
    throw new Error('Method not implemented.');
  }
  setColorEjeX(color: string): void {
    throw new Error('Method not implemented.');
  }
  setColorEjeY(color: string): void {
    throw new Error('Method not implemented.');
  }
  setColorNumerosEjeX(color: string): void {
    throw new Error('Method not implemented.');
  }
  setColorNumerosEjeY(color: string): void {
    throw new Error('Method not implemented.');
  }
  setAltoTicketEjeX(alto: number): void {
    throw new Error('Method not implemented.');
  }
  setAnchoTicketEjeY(ancho: number): void {
    throw new Error('Method not implemented.');
  }
  setPosicionNumerosEjeX(left: number, right: number): void {
    throw new Error('Method not implemented.');
  }
  setPosicionNumerosEjeY(left: number, right: number): void {
    throw new Error('Method not implemented.');
  }


  alejar(): void {
    this.ANCHO_EJE_X += 2;
    this.draw();
  }

  acercar(): void {
    this.ANCHO_EJE_X -= 2;
    this.draw();
  }

  disminuirCantidadRectangulos() {
    this.cantidadRectangulos -= 5;
    this.draw()

  }

  aumentarCantidadRectangulos() {
    this.cantidadRectangulos += 5;
    this.draw()

  }

  aumentarX() {
    this.usuarioX += this.avanceXUsuario;
    this.draw();
  }

  disminuirX() {
    this.usuarioX -= this.avanceXUsuario;
    this.draw();
  }

  aumentarInicio() {
    this.inicio += 0.2
    this.draw()
  }
  aumentarFin() {
    this.fin += 0.2
    this.draw()
  }

  disminuirInicio() {
    this.inicio -= 0.2
    this.draw()
  }
  disminuirFin() {
    this.fin -= 0.2
    this.draw()
  }

  aumentarAnchoRectangulo() {

    this.anchoRectangulo += 0.02;
    this.draw();

  }

  disminuirAnchoRectangulo() {
    if (this.anchoRectangulo >= 0.02) {
      this.anchoRectangulo -= 0.02;
      this.draw();
    }
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

  dibujarDerivada(): void {
    const punto1 = new ConcretePoint(this.usuarioX, this.funcion(this.usuarioX))
    const punto2 = new ConcretePoint(this.usuarioX + this.distanciaPuntosDerivada,
      this.funcion(this.usuarioX + this.distanciaPuntosDerivada))


    const linea = new ConcreteLine(punto1, punto2);

    this.derivada = linea;
    this.pendiente = linea.calcularPendiente()


    this.drawLine(
      this.transformadorDePuntos.transformarPunto(new ConcretePoint(-this.ANCHO_EJE_X / 2, this.derivada.funcion(-this.ANCHO_EJE_X / 2)), this.centerX, this.centerY),

      this.transformadorDePuntos.transformarPunto(new ConcretePoint(this.ANCHO_EJE_X / 2, this.derivada.funcion(this.ANCHO_EJE_X / 2)), this.centerX, this.centerY),
      'green',
      this.anchoDerivada);




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

  dibujarEjesXY(): void {

    // // eje x
    const p1 = new ConcretePoint(0, this.centerY);
    const p2 = new ConcretePoint(this.anchoLienzo, this.centerY);


    this.drawLine(p1, p2, 'gray', 1)


    // eje y 
    // const q1 = new ConcretePoint(400, 0);
    // const q2 = new ConcretePoint(400, 800);
    // this.drawLine(q1, q2, 'gray', 1)
  }


  dibujarCurva(): void {
    const puntos = this.getPoints(-this.transformadorDePuntos.getAnchoCalculadora() / 2,
      this.transformadorDePuntos.getAnchoCalculadora() / 2);
    for (let i = 0; i < puntos.length; i++) {
      const p = puntos[i];
      const q = puntos[i + 1]
      const x1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getX();
      const y1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getY();

      const x2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getX();
      const y2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getY();

      this.drawLine(new ConcretePoint(x1, y1), new ConcretePoint(x2, y2), this.colorCurva, this.anchoCurva)

    }


  }

  dibujarRangoIntegral(): void {

  }


  dibujarFillRectangulo(point1: Point, point2: Point, point3: Point, point4: Point): void {

    let newPoint1 = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY);
    let newPoint2 = this.transformadorDePuntos.transformarPunto(point2, this.centerX, this.centerY);
    let newPoint3 = this.transformadorDePuntos.transformarPunto(point3, this.centerX, this.centerY);
    let newPoint4 = this.transformadorDePuntos.transformarPunto(point4, this.centerX, this.centerY);

    this.context.fillStyle = this.colorIntegral;
    this.context.fillRect(newPoint4.getX(), newPoint4.getY(), newPoint3.getX() - newPoint4.getX(), newPoint2.getY() - newPoint3.getY())


  }


  dibujarIntegral(): void {


    // al final solo me importa el valor en x del inicio y el fin de los rangos que voy a utilizar 
    const point1 = new ConcretePoint(this.inicio, 0)
    const point2 = new ConcretePoint(this.inicio, this.funcion(this.inicio))
    const point3 = new ConcretePoint(this.fin, 0)
    const point4 = new ConcretePoint(this.fin, this.funcion(this.fin))



    // que todo se calcule en funcion del punto A
    const puntoA = new ConcretePoint(this.inicio, 0);
    // const puntoB = new ConcretePoint(puntoA.getX() + this.anchoRectangulo, 0)
    // const puntoC = new ConcretePoint(puntoA.getX() + this.anchoRectangulo, this.funcion(puntoA.getX()))
    // const puntoD = new ConcretePoint(puntoA.getX(), this.funcion(puntoA.getX()))

    // this.dibujarRectangulo(puntoA, puntoB, puntoC, puntoD)


    for (let i = 0; i < this.cantidadRectangulos; i++) {
      let puntoE = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, 0) // es igual al punto b 
      let puntoF = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, 0)
      let puntoG = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, this.funcion(puntoA.getX() + i * this.anchoRectangulo))
      let puntoH = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, this.funcion(puntoA.getX() + i * this.anchoRectangulo))
      // this.dibujarRectangulo(puntoE, puntoF, puntoG, puntoH);
      this.dibujarFillRectangulo(puntoE, puntoF, puntoG, puntoH);



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


  dibujarNumerosEjes() {

    for (let i = -this.ANCHO_EJE_X / 2; i < (this.ANCHO_EJE_X / 2) + 1; i = i + this.intervaloNumerosEjeX) {
      this.dibujarTexto(i.toString(), i - 0.1, -0.4, 'black')
      this.dibujarLinea(new ConcretePoint(i, 0.1), new ConcretePoint(i, -0.1), 'black', 1)
    }

  }

  draw(): void {

    // this.context.beginPath();
    this.parabola = new ParabolaConcreta(this.tipo);
    this.transformadorDePuntos = new TransformadorDePuntosConcretos(this.anchoLienzo,
      this.largoLienzo, this.ANCHO_EJE_X)
    this.distanciaPuntosDerivada = 0.001



    this.context.clearRect(0, 0, this.anchoLienzo, this.largoLienzo);

    this.context.fillStyle = this.colorFondoLienzo;
    this.context.fillRect(0, 0, this.anchoLienzo, this.largoLienzo,)


    this.dibujarIntegral()
    if (this.dibujarEjes) {
      this.dibujarEjesXY()
      this.dibujarNumerosEjes()

    }





    try {

      this.dibujarCurva()
    } catch (error) {

    }
    if (this.mostrarDerivada) {

      this.dibujarDerivada()
    }



  }

  drawLine(pointA: Point, pointB: Point, color: string, width: number): void {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.lineWidth = width;

    this.context.moveTo(pointA.getX(), pointA.getY());
    this.context.lineTo(pointB.getX(), pointB.getY());
    this.context.stroke();
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


  dibujarRectangulo2(point1: Point, width: number, height: number) {
    const newPoint1 = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY);

    this.context.fillRect(newPoint1.getX(), newPoint1.getY(),
      width,
      height
    )

  }

  dibujarRectangulo(point1: Point, point2: Point, point3: Point, point4: Point) {
    this.dibujarLinea(point1, point2, 'purple', 1);
    this.dibujarLinea(point2, point3, 'purple', 1);
    this.dibujarLinea(point3, point4, 'purple', 1);
    this.dibujarLinea(point4, point1, 'purple', 1);
  }

  dibujarTexto(texto: string, x: number, y: number, color: string = 'gray') {

    this.context.font = "25px Arial";
    this.context.fillStyle = color;
    const point = new ConcretePoint(x, y)
    const newPoint = this.transformadorDePuntos.transformarPunto(point, this.centerX, this.centerY)
    this.context.fillText(texto, newPoint.getX(), newPoint.getY());
  }

}