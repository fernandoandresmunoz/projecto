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
import { Perpendicular } from '../funcion-logaritmica/perpendicular';
import { Geometry } from '../geometry/geometry';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-parabola',
  templateUrl: './parabola.component.html',
  styleUrls: ['./parabola.component.styl']
})
export class ParabolaComponent implements OnInit, Parabola, ControladorCalculadora {


  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;


  public context: CanvasRenderingContext2D;

  @Input() tipo: string;
  // @Input() f: (x: number) => number = x => x**3; // esta es la linea clave de todo .
  @Input() f: (x: number) => number; 

  @Input() integral: boolean = true;
  // @Input() curvas: ((x: number) => number)[] = [ x=> x, x=> 2]
  @Input() curvas: {color: string, f: (x: number) => number }[] = [

    // { f: this.f(), ()color: 'red'}
        // { f: x=> x**2, color: 'red' },
        // { f: x=> 2, color: 'green' },
        // { f: x=> Math.exp(x), color: 'green' }
  ];
  @Input() puntos: {id: number, x: number, y: number}[];
  @Input() rectas: {x1: number, y1: number, x2: number, y2: number}[];
  @Input() circunferencias: {x: number, y: number, radio: number}[];
  @Input() perpendiculares: Perpendicular[];


  K_SIGMOIDE = 8;


  usuarioX: number = 0
  pendiente: number = 0;
 

  ANCHO_PUNTO_DERIVADA = 5;

  derivada: Line;

  // esto es lo que avanza el punto que calcula la derivada
  avanceXUsuario = 0.1
  parabola: Parabola;
  transformadorDePuntos: TransformadorDePuntos;
  distanciaPuntosDerivada: number;
  ANCHO_EJE_X = 16  ;
  ANCHO_EJE_Y= 16;
  inicio = -2;
  fin = 2;   
  dibujarEjes = true;

  anchoRectangulo = 0.01
  // cantidadRectangulos = 50
  cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo

  colorIntegral: string = '#0159cb';
  colorCurva: string = '#d71d77';
  anchoCurva: number = 2;
  anchoDerivada: number = 2;
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

  anchoLienzo =500;
  largoLienzo = 500;

  centerX = this.anchoLienzo / 2;
  centerY = this.largoLienzo / 2;

  fillRectangles = false;
  valorIntegral: number = 0;
  SIGMOIDE_Y = 0;
  K_SENO = 3;
  SIN_FREQUENCY = 1;
  SIN_POS_Y: number = 0;

  SHOW_INTEGRAL: boolean = false;
  SHOW_DERIVADA : boolean = false;

  K_GAUSS = 4;
  K_GAUSS_AMPLITUDE = 0.3;

  CUADRATICA_A = 1;
  CUADRATICA_B = 1;
  CUADRATICA_C = 1

  INTEGRAL = 'INTEGRAL';
  DERIVADA = 'DERIVADA';
  FUNCION = 'FUNCION';
  LIENZO = 'LIENZO';

  PESTANA_ACTIVA = this.FUNCION;

  @Input() mostrarDerivada: boolean  = true ;

  @Input() showOptions: boolean;



  constructor(private geometry: GeometryService) {
    // this.curvas = [
    // ]

    if ( this.tipo === 'SIGMOIDE') {
      this.f = this.sigmoide


      this.curvas =  [
        // { f: x=> x**2, color: 'red' },
        // { f: x=> 2, color: 'green' },
        // { f: x=> Math.exp(x), color: 'green' },
        { f: x =>  this.K_SIGMOIDE * 1 / (1 + Math.exp(-x)) , color: 'red' } 
    ] 


    }
    this.curvas = [
    ]
  }

  incrementSinFrequency(): void {
    if ( this.SIN_FREQUENCY <= 2) {
      this.SIN_FREQUENCY += 0.1
    } else {

      this.SIN_FREQUENCY += 1;
    }
    this.draw();
  }

  decrementSinFrequency(): void {

    if (this.SIN_FREQUENCY <= 2) {
      this.SIN_FREQUENCY -= 0.1
    } else {

      this.SIN_FREQUENCY -= 1;
    }

    this.draw();
  }

  showIntegral(): void {
    this.SHOW_INTEGRAL = !this.SHOW_INTEGRAL;
    this.draw();

  }

  showDerivada(): void { 
    this.SHOW_DERIVADA = !this.SHOW_DERIVADA;
    this.draw();
  }

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


  cambiarMostrarDerivada(mostrar: boolean): void {
    this.mostrarDerivada = !this.mostrarDerivada;
    this.draw()
  }

  cambiarFillRectangles(): void {


    this.fillRectangles = !this.fillRectangles;
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


  aumentarAnchoEjeY() {
    this.ANCHO_EJE_Y -= 2;
    this.draw();
  }

  disminuirAnchoEjeY() {
    this.ANCHO_EJE_Y += 2;
    this.draw();

  }

  alejar(): void {
    this.ANCHO_EJE_X += 2;
    this.ANCHO_EJE_Y += 2;
    this.draw();
  }

  acercar(): void {
    this.ANCHO_EJE_X -= 2;
    this.ANCHO_EJE_Y -= 2;
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

  avanzarIntegral() {
    this.aumentarInicio();
    this.aumentarFin();
  }

  retrocederIntegral() { 
    this.disminuirInicio();
    this.disminuirFin();
  }

  aumentarInicio() {
    // estos son el inicio y el fin de la integral 
    this.inicio += 0.2
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
    this.draw()
  }
  aumentarFin() {
    this.fin += 0.2
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
    this.draw()
  }

  disminuirInicio() {
    this.inicio -= 0.2
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
    this.draw()
  }
  disminuirFin() {
    this.fin -= 0.2
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
    this.draw()
  }

  aumentarAnchoRectangulo() {

    this.anchoRectangulo += 0.02;
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
    this.draw();

  }

  disminuirAnchoRectangulo() {
    if (this.anchoRectangulo >= 0.02) {
      this.anchoRectangulo -= 0.02;
  this.cantidadRectangulos = ( this.fin - this.inicio ) / this.anchoRectangulo
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
    if ( this.tipo === 'SIGMOIDE') {
      return this.sigmoide(x);
    } 
    else if ( this.tipo === 'SENO') {
      return this.seno(x)
    }
    else if ( this.tipo === 'GAUSS') {
      return this.gauss(x)
    }
    else if ( this.tipo === 'CUADRATICA') {
      return this.cuadratica(x)
    }
    return this.f(x)
  }

  cuadratica(x: number) {
    return this.CUADRATICA_A * x**2 + this.CUADRATICA_B * x + this.CUADRATICA_C;
  }

  seno(x: number): number {
    return  this.K_SENO * Math.sin(this.SIN_FREQUENCY * x) + this.SIN_POS_Y;
  }
  gauss(x: number): number {

    return  this.K_GAUSS * Math.exp(-1 * ( this.K_GAUSS_AMPLITUDE*x )**2) ;
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
      this.transformadorDePuntos.transformarPunto(
        new ConcretePoint(-this.ANCHO_EJE_X / 2, this.derivada.funcion(-this.ANCHO_EJE_Y / 2)),
        this.centerX, this.centerY),

      this.transformadorDePuntos.transformarPunto(
        new ConcretePoint(
          this.ANCHO_EJE_X / 2, this.derivada.funcion(this.ANCHO_EJE_Y / 2)),
          this.centerX,
          this.centerY),
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
    const q1 = new ConcretePoint(this.centerX , 0);
    const q2 = new ConcretePoint(this.centerX, this.largoLienzo);
    this.drawLine(q1, q2, 'gray', 1)
  }


  dibujarCurva(parabola: Parabola, color: string): void {
    const puntos = parabola.getPoints(-this.transformadorDePuntos.getAnchoCalculadora() / 2,
      this.transformadorDePuntos.getAnchoCalculadora() / 2);



    for (let i = 0; i < puntos.length - 1; i++) {


      const p = puntos[i];
      const q = puntos[i + 1]
      const x1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getX();
      const y1 = this.transformadorDePuntos.transformarPunto(p, this.centerX, this.centerY).getY();

      const x2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getX();
      const y2 = this.transformadorDePuntos.transformarPunto(q, this.centerX, this.centerY).getY();

      this.drawLine(new ConcretePoint(x1, y1), new ConcretePoint(x2, y2), color, this.anchoCurva)

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

    this.valorIntegral = 0

    for (let i = 0; i < this.cantidadRectangulos; i++) {
      let puntoE = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, 0) // es igual al punto b 
      let puntoF = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, 0)
      let puntoG = new ConcretePoint(puntoA.getX() + (i + 1) * this.anchoRectangulo, this.funcion(puntoA.getX() + i * this.anchoRectangulo))
      let puntoH = new ConcretePoint(puntoA.getX() + i * this.anchoRectangulo, this.funcion(puntoA.getX() + i * this.anchoRectangulo))

      let diffX = puntoF.getX() - puntoE.getX()
      let diffY = puntoG.getY() - puntoF.getY();

      this.valorIntegral += (diffX * diffY);


      if (this.fillRectangles) {

      this.dibujarFillRectangulo(puntoE, puntoF, puntoG, puntoH);
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


  dibujarNumerosEjes() {

    for (let i = -this.ANCHO_EJE_X / 2; i < (this.ANCHO_EJE_X / 2) + 1; i =  i + this.intervaloNumerosEjeX ) {
      this.dibujarTexto(i.toString()  , i - 0.1, -0.4, 'gray')
      this.dibujarLinea(new ConcretePoint(i, 0.1), new ConcretePoint(i, -0.1), 'gray', 1)
    }
    // eje y 
    for (let i = -this.ANCHO_EJE_Y / 2; i < (this.ANCHO_EJE_Y / 2) + 1; i = i + this.intervaloNumerosEjeY) {
      if ( i !== 0 ) {

      this.dibujarTexto(i.toString(),  -0.4,i - 0.1, 'gray'  )
      this.dibujarLinea(new ConcretePoint( 0.1, i), new ConcretePoint( -0.1, i), 'gray', 1)
      }
    }


  }



  pointFactory(point: {x: number, y: number}): Point  {
    return new ConcretePoint(point.x, point.y)
  }

  dibujarRectas() : void { 
    if (!this.rectas) {
      return
    }
    for (let index = 0; index < this.rectas.length; index++) {
      const recta: {x1: number, y1: number, x2: number, y2: number} = this.rectas[index];
      this.dibujarLinea2(recta.x1, recta.y1, recta.x2, recta.y2)
      
    }

  }

  dibujarPuntos(): void {

    // no deberia recibir mas de tres puntos 

    if (!this.puntos) {
      return;
    }

    for (let index = 0; index < this.puntos.length; index++) {
      const punto = this.puntos[index];
      
      this.dibujarTexto("P"+punto.id, punto.x, punto.y - .5, 'black')
      let concretePoint = new ConcretePoint(punto.x, punto.y)
      this.dibujarRectangulo2(concretePoint, 10, 10) 
    }

  }

  dibujarCircunferencias(): void { 

    if (!this.circunferencias) {
      return
    }
    
    for (let index = 0; index < this.circunferencias.length; index++) {
      this.context.beginPath()
      const circunferencia = this.circunferencias[index];
      let point1 = new ConcretePoint(circunferencia.x, circunferencia.y);
      let point2 = new ConcretePoint(circunferencia.radio, 0);

      let newPoint = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY)
      let newPoint2 =this.transformadorDePuntos.transformarPunto(point2, this.centerX, this.centerY)

      this.context.stroke()
      console.log(newPoint2.getX())
      console.log(circunferencia.radio)
      console.log(this.transformadorDePuntos.transformadorDeNumero(circunferencia.radio))
      this.context.arc(newPoint.getX(), newPoint.getY(), 50 , 0, 2 * Math.PI);

      this.context.stroke()
    }

  }

  sigmoide(x : number): number {
    return this.K_SIGMOIDE *  1 / (1 + Math.exp(-x)) + this.SIGMOIDE_Y;

    }

  draw(): void {

    // this.context.beginPath();
    this.parabola = new ParabolaConcreta(this.tipo, this.f);
    let curva2 = new ParabolaConcreta(this.tipo, (x: number) => x**2 - 2.5)


    this.transformadorDePuntos = new TransformadorDePuntosConcretos(this.anchoLienzo,
      this.largoLienzo, this.ANCHO_EJE_X, this.ANCHO_EJE_X)
    this.distanciaPuntosDerivada = 0.001




    this.context.fillStyle = this.colorFondoLienzo;
    this.context.clearRect(0, 0, this.anchoLienzo, this.largoLienzo);
    this.context.fillRect(0, 0, this.anchoLienzo, this.largoLienzo,);
    this.dibujarRectas();
    this.dibujarPuntos();
    this.dibujarCircunferencias();
    this.dibujarPerpendiculares();


    if (this.integral && this.SHOW_INTEGRAL) {

      this.dibujarIntegral()
    }
    if (this.dibujarEjes) {
      this.dibujarEjesXY()
      this.dibujarNumerosEjes()

    }



    if ( this.tipo === 'SIGMOIDE') {
      this.dibujarCurva( new ParabolaConcreta(this.tipo, this.sigmoide ), 'red')
      this.dibujarCurva( new ParabolaConcreta(this.tipo, (x: number) => {return this.sigmoide(x) } ), 'red')
    } 

    else if ( this.tipo === 'SENO'){
      this.dibujarCurva( new ParabolaConcreta(this.tipo, this.seno ), 'red')
      this.dibujarCurva( new ParabolaConcreta(this.tipo, (x: number) => {return this.seno(x) } ), 'red')
    }
    else if ( this.tipo === 'GAUSS'){
      this.dibujarCurva( new ParabolaConcreta(this.tipo, this.gauss ), 'red')
      this.dibujarCurva( new ParabolaConcreta(this.tipo, (x: number) => {return this.gauss(x) } ), 'red')
    }
    else if ( this.tipo === 'CUADRATICA'){
      this.dibujarCurva( new ParabolaConcreta(this.tipo, this.cuadratica ), 'red')
      this.dibujarCurva( new ParabolaConcreta(this.tipo, (x: number) => {return this.cuadratica(x) } ), 'red')
    }
    else {

    this.curvas.map( curva => {
      this.dibujarCurva(new ParabolaConcreta(this.tipo , curva.f), curva.color)
    })


    }
      // this.dibujarCurva(this.parabola)
      // this.dibujarCurva(curva2);



    if (this.mostrarDerivada && this.SHOW_DERIVADA) {

      this.dibujarDerivada()
    }



  }

  dibujarPerpendiculares(): void {

    if ( !this.perpendiculares) {
      return;
    }

    for (let index = 0; index < this.perpendiculares.length; index++) {
      const element = this.perpendiculares[index];
      console.log(element)
      let x1 = this.geometry.puntoPerpendicular(element.x1, element.y1, element.x2, element.y2, element.px, element.py)[0]
      let y1 = this.geometry.puntoPerpendicular(element.x1, element.y1, element.x2, element.y2, element.px, element.py)[1]

      this.dibujarLinea2(x1, y1, element.px, element.py, 'red')
      
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


  dibujarLinea2(x1: number, y1: number, x2: number, y2: number, color: string = 'black', width: number = 2) {

    let point1 = new ConcretePoint(x1, y1);
    let point2 = new ConcretePoint(x2, y2);
    const newPoint1 = this.transformadorDePuntos.transformarPunto(point1, this.centerX, this.centerY);
    const newPoint2 = this.transformadorDePuntos.transformarPunto(point2, this.centerX, this.centerY);
    this.context.beginPath()
    this.context.strokeStyle = color;
    this.context.lineWidth = width;


    this.context.moveTo(newPoint1.getX(), newPoint1.getY());
    this.context.lineTo(newPoint2.getX(), newPoint2.getY());
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

    this.context.fillRect(newPoint1.getX() - width/2, newPoint1.getY() -height/2,
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

function th(x: number): number {
  throw new Error('Function not implemented.');
}
