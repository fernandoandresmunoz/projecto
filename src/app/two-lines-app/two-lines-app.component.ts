import { ElementRef, Input } from '@angular/core';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Bloque } from 'bloque';
import { ConcreteShapeFactory } from 'concreteShapeFactory';
import { Cube } from 'cube';
import { Line } from 'line';
import { Point } from 'point';
import { Rule } from 'rule';
import { Element } from 'rules/element';
import { ShapeFactory } from 'shapeFactory';

@Component({
  selector: 'app-two-lines-app',
  templateUrl: './two-lines-app.component.html',
  styleUrls: ['./two-lines-app.component.styl']
})
export class TwoLinesAppComponent implements OnInit, Cube {

  ELEMENTS = [
    'GREEN',
    'BLUE',
    'GRAY',
    'BROWN',
    'RED',

  ]


  shapeFactory: ShapeFactory = new ConcreteShapeFactory();
  // cube: Cube;
  @Input() cube: Cube;

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;



  public context: CanvasRenderingContext2D;

  constructor() {
  //  this.cube = this.shapeFactory.createCavalierCube();

 
  //  if ( localStorage.getItem('data') !== null ) {
  //   this.setPuntos( JSON.parse( localStorage.getItem('data') || '').points) 
  //  }
  //  setInterval(() => {
  //    this.dibujarMatriz([
  //       [1,1,0]
      
  //    ])
  //    this.draw();
  //  }, 1000)
  }
  changeRule(element: string, rule: string): void {
    this.cube.changeRule(element, rule);
  }
  getBlueRule(): Rule {
    return this.cube.getBlueRule();
  }
  setBlueRule(rule: Rule): void {
    this.cube.setBlueRule(rule);
  }
  getBrownRule(): Rule {
    return this.cube.getBrownRule();
  }
  setBrownRule(rule: Rule): void {
    this.cube.setBrownRule(rule);
  }
  getGrayRule(): Rule {
    return this.cube.getGrayRule();
  }
  setGrayRule(rule: Rule): void {
    this.cube.setGrayRule(rule);
  }
  getColorSchema(): {} {
    return this.cube.getColorSchema();
  }
  totalAzules(): number {
    return this.cube.totalAzules();
  }
  totalVerdes(): number {
    return this.cube.totalVerdes();
  }
  totalCafes(): number {
    return this.cube.totalCafes();
  }
  totalRojos(): number {
    return this.cube.totalRojos();
  }
  totalGrises(): number {
    return this.cube.totalGrises();
  }
  getElements(): Element[] {
    return this.cube.getElements();
  }
  setElements(elements: Element[]): void {
    throw new Error('Method not implemented.');
  }
  addElement(element: Element): void {
    throw new Error('Method not implemented.');
  }
  calculateAliveNeighbors(matriz: { state: number; color: string; }[][], fila: number, columna: number): { state: number; color: string; }[] {
    throw new Error('Method not implemented.');
  }

  getGreenRule(): Rule {
    return this.cube.getGreenRule();
  }

  getRedRule(): Rule {
    return this.cube.getRedRule();
  }

  setGreenRule(rule: Rule): void {
    this.cube.setGreenRule(rule);
  }

  setRedRule(rule: Rule): void {
    this.cube.setRedRule(rule);
  }

  getPause(): boolean {
    return this.cube.getPause();
  }

  setPause(pause: boolean): void {
    this.cube.setPause(pause);
  }
  crearBloque(data: {state: number, color: string}, altura: number): void {
    this.crearBloque(data, altura);
  }
  getRules(): { name: string; rule: Rule; notation: string; }[] {
    return this.cube.getRules();
  }
  setRules(rules: { name: string; rule: Rule; notation: string; }[]): void {
    this.cube.setRules(rules);
  }
  setActiveRule(rule: Rule): void {
    this.cube.setActiveRule(rule);
  }
  getActiveRule(): Rule {
    return this.cube.getActiveRule();
  }
  setDiamoeba(): void {
    this.setRule(this.shapeFactory.createDiamoebaRule())
  }
  setLife(): void {
    this.setRule(this.shapeFactory.createLifeRule())
  }
  getRule(): Rule {
    return this.cube.getRule();
  }
  setRule(rule: Rule): void {
    this.cube.setRule(rule);
  }
  createRandomMatriz(): {state: number, color: string}[][] {
    return this.cube.createRandomMatriz();
  }
  matrizSiguiente(matriz: {state: number, color: string}[][]): {state: number, color: string}[][] {
    return this.matrizSiguiente(matriz);
  }
  getMatrizActiva(): {state: number, color: string}[][] {
    return this.cube.getMatrizActiva();
  }
  setMatrizActiva(matrizActiva: {state: number, color: string}[][]): void {
    return this.cube.setMatrizActiva(matrizActiva);
  }
  getGeneration(): number {
    return this.cube.getGeneration();
  }
  setGeneration(generation: number): void {
    this.cube.setGeneration(generation);
  }
  dibujarMatriz(matriz: {state: number, color: string}[][]): void {
    this.cube.dibujarMatriz(matriz);
  }
  getAvance(): number {
    throw new Error('Method not implemented.');
  }
  setAvance(avance: number): void {
    throw new Error('Method not implemented.');
  }
  setShowAuxiliaryLines(showAuxiliaryLines: boolean): void {
    this.cube.setShowAuxiliaryLines(showAuxiliaryLines);
  }
  getAnchoLienzo(): number {
    return this.cube.getAnchoLienzo();
  }
  setAnchoLienzo(anchoLienzo: number): void {
    this.cube.setAnchoLienzo(anchoLienzo);
  }
  getAltoLienzo(): number {
    return this.cube.getAltoLienzo();
  }
  setAltoLienzo(altoLienzo: number): void {
    throw new Error('Method not implemented.');
  }
  crearTableroAleatorio(): void {
    this.cube.crearTableroAleatorio();
  }
  upMilitary(): void {
    this.cube.upMilitary();
  }
  downMilitary(): void {
    this.cube.downMilitary();
  }
  showAuxiliaryLines(): boolean {
    return this.cube.showAuxiliaryLines();
  }
  subir(): void {
    this.cube.subir();
    this.draw();
  }
  bajar(): void {
    this.cube.bajar();
    this.draw();
  }
  izquierda(): void {
    this.cube.izquierda();
    this.draw();
  }
  derecha(): void {
    this.cube.derecha();
    this.draw();
  }
  subirCubos(): void {
    this.cube.subirCubos();
  }
  bajarCubos(): void {
    this.cube.bajarCubos();
  }
  izquierdaCubos(): void {
    this.cube.izquierdaCubos();
  }
  derechaCubos(): void {
    this.cube.derechaCubos();
  }
  setAnchoCelula(anchoCelula: number): void {
    this.cube.setAnchoCelula(anchoCelula);
  }
  getAnchoCelula(): number {
    return this.cube.getAnchoCelula();
  }
  setLargoCelula(largoCelula: number): void {
    this.cube.setLargoCelula(largoCelula)
  }
  getLargoCelula(): number {
    return this.cube.getLargoCelula();
  }
  setAltoCelula(altoCelula: number): void {
    this.cube.setAltoCelula(altoCelula);
  }
  getAltoCelula(): number {
    return this.cube.getAltoCelula();
  }
  drawCelula(): void {
    let interseccion = this.puntoCelula();

    // this.

    interseccion = this.puntoCelula();
    if (this.showAuxiliaryLines()) {

      this.context.fillRect(interseccion.getX() * this.getScale(), interseccion.getY() * this.getScale(), 10, 10)
      this.context.fillRect(interseccion.getX() * this.getScale(), interseccion.getY() * this.getScale(), 10, 10)
    }

    this.context.fillStyle = 'Red';
    this.context.strokeStyle= 'Red'
    this.context.fillText(`${ String(interseccion.getX()) }, ${ String(interseccion.getY())} `, 10, 20);

    let lineP4P5 = this.shapeFactory.createLine(this.cube.getPoint4(), this.cube.getPoint5());
    let lineP1P3 = this.shapeFactory.createLine(this.cube.getPoint1(), this.cube.getPoint3());

    let lineP6P7 = this.shapeFactory.createLine(this.cube.getPoint6(), this.cube.getPoint7());
    let lineP0P2 = this.shapeFactory.createLine(this.cube.getPoint(), this.cube.getPoint2());

    let p0 =this.getInterseccion(lineP4P5, lineP1P3);
    let p2 = this.getInterseccion(lineP1P3, lineP0P2);


    // ancho
    let p1 = this.getInterseccion(lineP4P5, lineP6P7);
    let p3 = this.getInterseccion(lineP0P2, lineP6P7);

    let p4 = this.shapeFactory.createPoint(p0.getX(), p0.getY() - this.getAltoCelula())
    let p5 = this.shapeFactory.createPoint(p1.getX(), p1.getY() - this.getAltoCelula())
    let p6 = this.shapeFactory.createPoint(p2.getX(), p2.getY() - this.getAltoCelula())
    let p7 = this.shapeFactory.createPoint(p3.getX(), p3.getY() - this.getAltoCelula())

    // this.context.fillRect(p0.getX() * this.getScale(), p0.getY() * this.getScale(), 5, 5)
    // this.context.fillRect(p1.getX() * this.getScale(), p1.getY() * this.getScale(), 5, 5)
    // this.context.fillRect(p2.getX() * this.getScale(), p2.getY() * this.getScale(), 5, 5)
    // this.context.fillRect(p3.getX() * this.getScale(), p3.getY() * this.getScale(), 5, 5)


    // this.context.strokeStyle = 'Gray'
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p2, p0 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p2, p3 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p1, p3 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p0, p1 ));
    // this.drawLine(p2, this.shapeFactory.createPoint(p2.getX(), 0));
    // this.drawLine(p2, this.shapeFactory.createPoint(p2.getX(), 800));

    // this.drawLine(p2, this.shapeFactory.createPoint(0, p2.getY()));
    // this.drawLine(p2, this.shapeFactory.createPoint(2000, p2.getY()));


    // draw points
    this.context.font = "12px Arial";
    this.context.fillText(`p0 `, p0.getX() * this.getScale(), p0.getY() * this.getScale() + 20);
    this.context.fillText(`p2 `, p2.getX() * this.getScale(), p2.getY() * this.getScale() + 20);
    this.context.fillText(`p1 `, p1.getX() * this.getScale(), p1.getY() * this.getScale() + 20);
    this.context.fillText(`p3 `, p3.getX() * this.getScale(), p3.getY() * this.getScale() - 10);





  //       this.context.fillStyle = 'Blue'
  // this.context.beginPath();
  //   this.context.moveTo(p4.getX() * this.getScale(), p4.getY() * this.getScale());
  //   this.context.lineTo(p5.getX() * this.getScale(), p5.getY() * this.getScale());
  //   this.context.lineTo(p7.getX() * this.getScale(), p7.getY() * this.getScale());
  //   this.context.lineTo(p6.getX() * this.getScale(), p6.getY() * this.getScale());
  //   this.context.closePath()
  //   this.context.fill()

    // this.drawLine(p0, p4);
    // this.drawLine(p1, p5);
    // this.drawLine(p2, p6);

    // this.drawLine(p4, p6);
    // this.drawLine(p4, p5)
    // this.drawLine(p7, p5)
    // this.drawLine(p6, p7)

    this.drawLine(p0, p1)
    this.drawLine(p0, p2)
    this.drawLine(p3, p1)
    this.drawLine(p3, p2)

    // this.context.strokeStyle = 'Gray'
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p2, p0 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p2, p3 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p1, p3 ));
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(p0, p1 ));
  }


  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();

  }

  parseColors(color: string) {
    if (color === "Red") {

    return [ "Crimson", "LightCoral", "DarkRed"]
    } else if ( color === "Green") {
      return ["Green", "DarkseaGreen", "DarkGreen"]
    } else if ( color === "Blue") {

      return [ "CornflowerBlue", "LightBlue","Blue"]
    } else if ( color === "Brown") {

      return ["Brown", "SandyBrown","SaddleBrown"]
    }
 else if( color === "Gray") {

      return [ "DarkGray", "LightGray", "Gray"]
    }
    return ["","",""]
  }
  drawCubes(): void {
    this.getBloques().map(bloque => {
      const a = bloque.getPointP0();
      const b = bloque.getPointP1();
      const c = bloque.getPointP2();
      const d = bloque.getPointP3();

      // this.context.fillRect(a[0] * this.getScale(), a[1] * this.getScale(), 10, 10);

      // this.context.fillStyle = bloque.getData().color;
      // this.drawLine(this.shapeFactory.createPoint(a.getX(), a.getY()), this.shapeFactory.createPoint(b.getX(), b.getY()));
      // this.drawLine(this.shapeFactory.createPoint(c.getX(), c.getY()), this.shapeFactory.createPoint(d.getX(), d.getY()));
      // this.drawLine(this.shapeFactory.createPoint(c.getX(), c.getY()), this.shapeFactory.createPoint(b.getX(), b.getY()));
      // this.drawLine(this.shapeFactory.createPoint(a.getX(), a.getY()), this.shapeFactory.createPoint(d.getX(), d.getY()));

      // this.drawLine(this.shapeFactory.createPoint(a.getX(), a.getY()), this.shapeFactory.createPoint(a.getX(), a.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(c.getX(), c.getY()), this.shapeFactory.createPoint(c.getX(), c.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(b.getX(), b.getY()), this.shapeFactory.createPoint(b.getX(), b.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(d.getX(), d.getY()), this.shapeFactory.createPoint(d.getX(), d.getY() - bloque.getAltura()));

      // this.drawLine(this.shapeFactory.createPoint(a.getX(), a.getY() - bloque.getAltura()), this.shapeFactory.createPoint(b.getX(), b.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(c.getX(), c.getY() - bloque.getAltura()), this.shapeFactory.createPoint(d.getX(), d.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(c.getX(), c.getY() - bloque.getAltura()), this.shapeFactory.createPoint(b.getX(), b.getY() - bloque.getAltura()));
      // this.drawLine(this.shapeFactory.createPoint(a.getX(), a.getY() - bloque.getAltura()), this.shapeFactory.createPoint(d.getX(), d.getY() - bloque.getAltura()));


      // this.context.fillStyle = bloque.getData().color 	;
      this.context.fillStyle = this.parseColors(bloque.getData().color)[0] 	;

      this.context.beginPath();
      this.context.moveTo(a.getX() * this.getScale(), a.getY() * this.getScale());
      this.context.lineTo(b.getX() * this.getScale(), b.getY() * this.getScale());
      this.context.lineTo(b.getX() * this.getScale(), (b.getY() - bloque.getAltura()) * this.getScale())
      this.context.lineTo(a.getX() * this.getScale(), (a.getY() - bloque.getAltura()) * this.getScale());

      this.context.closePath();
      this.context.fill();

      this.context.fillStyle = this.parseColors(bloque.getData().color)[1] ;
      this.context.beginPath();
      this.context.moveTo(a.getX() * this.getScale(), (a.getY() - bloque.getAltura()) * this.getScale());
      this.context.lineTo(b.getX() * this.getScale(), (b.getY() - bloque.getAltura()) * this.getScale());
      this.context.lineTo(c.getX() * this.getScale(), (c.getY() - bloque.getAltura()) * this.getScale())
      this.context.lineTo(d.getX() * this.getScale(), (d.getY() - bloque.getAltura()) * this.getScale());

      this.context.closePath();
      this.context.fill();

      this.context.fillStyle = this.parseColors(bloque.getData().color)[2]; 
      // this.context.fillStyle = bloque.getData().color;

      this.context.beginPath();
      this.context.moveTo(c.getX() * this.getScale(), c.getY() * this.getScale());
      this.context.lineTo(b.getX() * this.getScale(), b.getY() * this.getScale());
      this.context.lineTo(b.getX() * this.getScale(), (b.getY() - bloque.getAltura()) * this.getScale())
      this.context.lineTo(c.getX() * this.getScale(), (c.getY() - bloque.getAltura()) * this.getScale());

      this.context.closePath();
      this.context.fill();




      // this.shapeFactory.createLine(this.shapeFactory.createPoint(a[0], a[1]), this.shapeFactory.createPoint(b[0], b[1]))
      // this.context.fillRect(b[0] * this.getScale(), b[1] * this.getScale(), 10, 10);
      // this.context.fillRect(c[0] * this.getScale(), c[1] * this.getScale(), 10, 10);
      // this.context.fillRect(d[0] * this.getScale(), d[1] * this.getScale(), 10, 10);

      // const a1 = this.shapeFactory.createPoint(obj[0].getX ,  )
      //   const a2 = this.shapeFactory.createPoint(( obj[0] + 10 ) * this.getScale(), obj[1] * this.getScale())
      // // this.context.fillRect(, 10, 10)
      // // this.drawLine(a1, a2)
      // this.context.fillStyle  = 'Blue'

      // this.context.font = "12px Arial";
      // this.context.fillRect(a1.getX() * this.getScale() , a1.getY() * this.getScale(), 10 , 10)
      // this.context.fillText(`${a1.getX() }, ${a1.getY()  }`, a1.getX() * this.getScale() , a1.getY() * this.getScale() )
      // // this.context.fillText(`y   = ${this.getLineAD().calcularPendiente()} x  ${-a1.getX() + a1.getY() } `, a1.getX() * this.getScale() , a1.getY() * this.getScale() + 20 )
      // // this.context.fillText(`y - ${a1.}`, a1.getX() , a1.getY() + 10 )
      // this.context.fillStyle  = 'Green'
      // // this.context.fillRect(a2.getX() + 10, this.getLineAD().calcularPendiente() * (a2.getX() + 10) + -a1.getX() + 10 + a1.getY(), 10 , 10)

      // this.context.fillText(`ecuacion = ${this.shapeFactory.createLine(p0, p2).ecuacionRecta()}`, 10, 30)
      // this.context.fillText(`ecuacion = ${this.shapeFactory.createLine(p0, p1).ecuacionRecta()}`, 10, 50)
    })
  }

  clean(): void {
    this.cube.clean();
    localStorage.clear()
    this.draw()
  }

  setPuntos(puntos: number[][][]): void {
    this.cube.setPuntos(puntos);
  }

  puntoCelula(): Point {
    return this.cube.puntoCelula();
  }
  getPuntos(): number[][][] {
    return this.cube.getPuntos();
  }
  addPunto(punto: number[][]): void {
    this.cube.addPunto(punto);
  }
  getBloques(): Bloque[] {
    return this.cube.getBloques();
  }
  addBloque(bloque: Bloque): void {
    this.cube.addBloque(bloque); 
  }
  getInterseccion(line1: Line, line2: Line): Point {
    return this.cube.getInterseccion(line1, line2);
  }
  getPoint4(): Point {
    throw new Error('Method not implemented.');
  }
  getPoint5(): Point {
    throw new Error('Method not implemented.');
  }
  getPoint6(): Point {
    throw new Error('Method not implemented.');
  }
  getPoint7(): Point {
    throw new Error('Method not implemented.');
  }
  setPoint4(point: Point): void {
    throw new Error('Method not implemented.');
  }
  setPoint5(point: Point): void {
    throw new Error('Method not implemented.');
  }
  setPoint6(point: Point): void {
    throw new Error('Method not implemented.');
  }
  setPoint7(point: Point): void {
    throw new Error('Method not implemented.');
  }
  getPoint1(): Point {
    return this.cube.getPoint1();
  }
  getPoint2(): Point {
    return this.cube.getPoint2();
  }
  getPoint3(): Point {
    return this.cube.getPoint3();
  }
  setPoint1(point: Point): void {
    this.cube.setPoint1(point);
  }
  setPoint2(point: Point): void {
    throw new Error('Method not implemented.');
  }
  setPoint3(point: Point): void {
    throw new Error('Method not implemented.');
  }
  getPoint(): Point {
    return this.cube.getPoint();
  }
  setPoint(point: Point): void {
    this.cube.setPoint(point);
  }
  getRectaAD(): Line {
    return this.cube.getRectaAD();
  }
  getRectaBC(): Line {
    throw new Error('Method not implemented.');
  }
  getRectaAC(): Line {
    throw new Error('Method not implemented.');
  }
  getRectaBD(): Line {
    throw new Error('Method not implemented.');
  }
  setRectaAD(line: Line): void {
    throw new Error('Method not implemented.');
  }
  setRectaBC(line: Line): void {
    throw new Error('Method not implemented.');
  }
  setRectaAC(line: Line): void {
    throw new Error('Method not implemented.');
  }
  setRectaBD(line: Line): void {
    throw new Error('Method not implemented.');
  }

  getFilas(): number {
    return this.cube.getFilas();
  }
  getColumnas(): number {
    return this.cube.getColumnas();
  }
  setFilas(filas: number): void {
    this.cube.setFilas(filas);
  }
  setColumnas(columnas: number): void {
    this.cube.setColumnas(columnas);
  }

  getLineAC(): Line {
    return this.cube.getLineAC();
  }
  getLineBD(): Line {
    return this.cube.getLineBD();
  }
  getLineAD(): Line {
    return this.cube.getLineAD();
  }
  getLineBC(): Line {
    return this.cube.getLineBC();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'h') {
      this.left();
    } else if (event.key === 'j') {
      this.down();
    } else if (event.key === 'k') {
      this.up();
    } else if (event.key === 'l') {
      this.right();
    } else if (event.key === '+') {
      this.setScale(this.getScale() + 1);
    } else if (event.key === '-') {
      if (this.getScale() > 1)
      this.setScale(this.getScale() - 1);
    } else if (event.key === 'a') {
      // this.crearBloque()
      // this.key = event.key;
    }
    this.draw();
}



  draw(): void {
    // this.context.fillRect(10,10,100,100);


    this.context.clearRect(0, 0, this.cube.getAnchoLienzo(), this.cube.getAltoLienzo());

    this.context.strokeStyle = 'Black'
    this.context.fillStyle = '#595447';

    this.context.fillRect(0, 0, this.cube.getAnchoLienzo(), this.cube.getAltoLienzo());

    let puntoA = this.getPointA();
    let puntoB = this.getPointB();
    let puntoC = this.getPointC();
    let puntoD = this.getPointD();

    let pointA = puntoA;
    let pointB = puntoB;
    let pointC = puntoC;
    let pointD = puntoD;


    // linea 1
    // linea 1
    // this.context.stroke()

    if (this.showAuxiliaryLines()) {

      this.drawLine(puntoA, puntoC);
      this.drawLine(puntoA, puntoD);
    }


    if (this.showAuxiliaryLines()) {

      this.drawLine(puntoB, puntoD);
      this.drawLine(puntoB, puntoC);
    }

    // let interseccion = this.cube.getLine1().calcularInterseccionRecta(this.cube.getLine2());
    // this.context.fillStyle='Red'

    // this.context.fillRect(interseccion.getX() * this.getScale() - this.app.getScale() / 2, interseccion.getY() * this.getScale()- this.app.getScale() / 2, this.getScale() , this.getScale() );


    // this.context.beginPath();
    // this.context.moveTo(puntoD_X, puntoD_Y);
    // this.context.lineTo(puntoD_X, puntoC_Y + 30);
    // this.context.stroke();
    // this.drawRoof(puntoA, puntoB, puntoC, puntoD);

    if (this.showAuxiliaryLines()) {


      let pointE = this.shapeFactory.createPoint(puntoA.getX(), puntoA.getY() + this.getHeight())
      let pointF = this.shapeFactory.createPoint(puntoD.getX(), puntoD.getY() + this.getHeight())
      let pointG = this.shapeFactory.createPoint(puntoC.getX(), puntoC.getY() + this.getHeight())

      this.drawLine(puntoA, pointE);
      this.drawLine(puntoD, pointF);
      this.drawLine(puntoC, pointG);
      this.drawLine(pointE, pointF);
      this.drawLine(pointE, pointG);
      // this.context.beginPath()

    }




    // this.paintCube(puntoA, puntoB, puntoC, puntoD)
    this.context.strokeStyle = 'Red';
    // this.drawLine(this.getPointA(), this.getPointC());

    this.context.strokeStyle = 'Black';


    if (this.showAuxiliaryLines()) {


      this.drawSplitLine(this.getLineAC());
      this.drawSplitLine(this.getLineBD());

      this.drawColumnas(this.getLineBC(), this.getLineAD());
      this.drawFilas(this.getLineBD(), this.getLineAC());
      // this.drawFilas(this.getLineBC(), this.getLineAD());

    }
    //



    //   this.context.fillStyle = '#AED6F1'
    // this.context.beginPath();
    //   this.context.moveTo(pointA.getX() * this.getScale(), pointA.getY() * this.getScale());
    //   this.context.lineTo(pointE.getX() * this.getScale(), pointE.getY() * this.getScale());
    //   this.context.lineTo(pointG.getX() * this.getScale(),  pointG.getY() * this.getScale());
    //   this.context.lineTo(pointC.getX() * this.getScale() , pointC.getY() * this.getScale())
    //   this.context.closePath()
    //   this.context.fill()


    //   this.context.fillStyle = '#2E86C1'
    // this.context.beginPath();
    //   this.context.moveTo(pointA.getX() * this.getScale(), pointA.getY() * this.getScale());
    //   this.context.lineTo(pointE.getX() * this.getScale(), pointE.getY() * this.getScale());
    //   this.context.lineTo(pointF.getX() * this.getScale(),  pointF.getY() * this.getScale());
    //   this.context.lineTo(pointD.getX() * this.getScale() , pointD.getY() * this.getScale())
    //   this.context.closePath()
    //   this.context.fill()



    if (this.showAuxiliaryLines()) {

      this.dibujarRectaCompleta(this.cube.getRectaAC());
      this.dibujarRectaCompleta(this.cube.getRectaBC());
      this.dibujarRectaCompleta(this.cube.getRectaBD());
      this.dibujarRectaCompleta(this.cube.getRectaAD());

      this.drawSplitLine(this.getLineBC());
      this.drawSplitLine(this.getLineAD());

    }

    if (this.showAuxiliaryLines()) {

      this.context.fillStyle = 'Red'
      this.context.fillRect(this.getPoint().getX() * this.getScale(), this.getPoint().getY() * this.getScale(), 10, 10)
      this.context.fillRect(this.getPoint1().getX() * this.getScale(), this.getPoint1().getY() * this.getScale(), 10, 10)
      this.context.fillRect(this.cube.getPoint2().getX() * this.getScale(), this.cube.getPoint2().getY() * this.getScale(), 10, 10)
      this.context.fillRect(this.cube.getPoint3().getX() * this.getScale(), this.cube.getPoint3().getY() * this.getScale(), 10, 10)

      this.context.fillRect(this.cube.getPoint4().getX() * this.getScale(), this.cube.getPoint4().getY() * this.getScale(), 10, 10)

      this.context.fillRect(this.cube.getPoint5().getX() * this.getScale(), this.cube.getPoint5().getY() * this.getScale(), 10, 10)

      this.context.fillRect(this.cube.getPoint6().getX() * this.getScale(), this.cube.getPoint6().getY() * this.getScale(), 10, 10)
      this.context.fillRect(this.cube.getPoint7().getX() * this.getScale(), this.cube.getPoint7().getY() * this.getScale(), 10, 10)


    }
    // this.drawLine(this.cube.getPoint(), this.cube.getPoint2())
    // // this.dibujarRectaCompleta(this.shapeFactory.createLine(this.cube.getPoint(), this.cube.getPoint2()))
    // this.dibujarRectaCompleta(this.shapeFactory.createLine(this.cube.getPoint2(), this.cube.getPoint1()))
    // this.drawLine(this.cube.getPoint1(), this.cube.getPoint3())
    // this.drawLine(this.cube.getPoint6(), this.cube.getPoint7())
    // this.drawLine(this.cube.getPoint4(), this.cube.getPoint5())



    // interseccion = this.shapeFactory.createLine(this.cube.getPoint(), this.cube.getPoint2()).calcularInterseccionRecta(this.shapeFactory.createLine(this.cube.getPoint1(), this.cube.getPoint3()));

    this.drawCubes();
    this.drawCelula();


      this.context.font = "20px Arial";
    if (this.showAuxiliaryLines()) {

      this.context.fillText('A', pointA.getX() * this.getScale(), pointA.getY() * this.getScale());
      this.context.fillText('B', pointB.getX() * this.getScale(), pointB.getY() * this.getScale());
      this.context.fillText('C', pointC.getX() * this.getScale(), pointC.getY() * this.getScale());
      this.context.fillText('D', pointD.getX() * this.getScale(), pointD.getY() * this.getScale());
    }


    if ( this.showAuxiliaryLines()) {
      this.context.fillStyle = 'Black'
      this.context.fillText('0', this.getPoint().getX() * this.getScale(), this.getPoint().getY() * this.getScale())
      this.context.fillText('1', this.getPoint1().getX() * this.getScale(), this.getPoint1().getY() * this.getScale())
      this.context.fillText('2', this.getPoint2().getX() * this.getScale(), this.getPoint2().getY() * this.getScale())
      this.context.fillText('3', this.getPoint3().getX() * this.getScale(), this.getPoint3().getY() * this.getScale())
      this.context.fillText('4', this.getPoint4().getX() * this.getScale(), this.getPoint4().getY() * this.getScale())
      this.context.fillText('5', this.getPoint5().getX() * this.getScale(), this.getPoint5().getY() * this.getScale())
      this.context.fillText('6', this.getPoint6().getX() * this.getScale(), this.getPoint6().getY() * this.getScale())
      this.context.fillText('7', this.getPoint7().getX() * this.getScale(), this.getPoint7().getY() * this.getScale())
    }



  }

  dibujarRectaCompleta(line: Line): void {
    this.drawLine(this.shapeFactory.createPoint(0, line.calcularPendiente() * 0 + line.intereseccionEnEjeY().getY()),
    this.shapeFactory.createPoint(2000, line.calcularPendiente() * 2000 + line.intereseccionEnEjeY().getY()))
  }

  paintQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void {
  }


  drawColumnas(line1: Line, line2: Line): void {
    this.context.strokeStyle = 'Gray';



    for ( let i = 0; i < (this.getColumnas()); i ++ ) {
      
       let point1 = line1.getSplitPoints(this.getColumnas())[i];
      
      let point2 = line2.getSplitPoints(this.getColumnas()).reverse()[i + 1]

      if ( i === 0 ) {
      } else {
        this.context.strokeStyle = 'Gray'
      }

      this.drawLine(point1, point2);
      // this.context.fillRect(point.getX() * this.getScale(), point.getY() * this.getScale(), 10, 10) }
    }




  }
  drawFilas(line1: Line, line2: Line): void {
    this.context.beginPath();
    this.context.strokeStyle = 'Gray';
    for ( let i = 0; i < (this.getFilas()); i ++ ) {
      let point1 = line1.getSplitPoints(this.getFilas())[i];
      
      let point2 = line2.getSplitPoints(this.getFilas()).reverse()[i + 1]

      if ( i === 0 ) {
      } else {
        this.context.strokeStyle = 'Gray'
      }

      this.drawLine(point1, point2);

      try {
        
      // this.dibujarRectaCompleta(this.shapeFactory.createLine(point1, point2));
      } catch (error) {

      }
      // this.context.fillRect(point.getX() * this.getScale(), point.getY() * this.getScale(), 10, 10)
    }


    this.context.stroke();


  }
  drawSplitLine(line: Line): void {
    this.context.beginPath();
    this.context.strokeStyle = 'Black';
    for ( let i = 0; i < ( line.getSplitPoints(this.getColumnas()).length ); i ++ ) {
      let point = line.getSplitPoints(this.getColumnas())[i];

      // this.context.fillRect(point.getX() * this.getScale(), point.getY() * this.getScale(), 2, 2)
    }
    this.context.stroke();


  }
  


  setPointA(point: Point): void {
    this.cube.setPointA(point);
  }
  setPointB(point: Point): void {
    this.cube.setPointB(point);
  }
  setPointC(point: Point): void {
    this.cube.setPointC(point);
  }
  setPointD(point: Point): void {
    this.cube.setPointD(point);
  }



  paintCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void {
    this.context.fillStyle = '#2E86C1';

    this.context.beginPath();
    this.context.moveTo(pointD.getScaledX(), pointD.getScaledY());
    this.context.lineTo(pointA.getScaledX(), pointA.getScaledY());
    this.context.lineTo(pointA.getScaledX(), pointA.getScaledY() + this.getAltoCelula() * this.getScale());
    this.context.lineTo(pointD.getScaledX(), pointD.getScaledY() + this.getAltoCelula() * this.getScale())

    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = 'Green'

    // parte superior
    this.context.fillStyle = '#AED6F1'
    this.context.beginPath();
    this.context.moveTo(pointD.getScaledX(), pointD.getScaledY() );
    this.context.lineTo(pointA.getScaledX(), pointA.getScaledY() );
    this.context.lineTo(pointC.getScaledX(), pointC.getScaledY() );
    this.context.lineTo(pointB.getScaledX(), pointB.getScaledY() )

    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = '#2E4053'

    this.context.beginPath();
    this.context.lineTo(pointA.getScaledX(), pointA.getScaledY());
    this.context.lineTo(pointA.getScaledX(), pointA.getScaledY() + this.getAltoCelula() * this.getScale());
    this.context.lineTo(pointC.getScaledX(), pointC.getScaledY() + this.getAltoCelula() * this.getScale())
    this.context.lineTo(pointC.getScaledX(), pointC.getScaledY());

    this.context.closePath();
    this.context.fill();
    this.context.beginPath();


  }
  keyLeft(): void {
    this.cube.keyLeft();
  }
  keyRight(): void {
    this.cube.keyRight();
  }
  setSelectedProjection(selectedProjection: string): void {
    this.cube.setSelectedProjection(selectedProjection);
  }
  getSelectedProjection(): string {
    return this.cube.getSelectedProjection();
  }
  getProjections(): string[] {
    return this.cube.getProjections();
  }
  drawRoof(puntoA: Point, puntoB: Point, puntoC: Point, puntoD: Point): void {

    let alto = this.getHeight() ;
    // // this.context.stroke();


    // punto A
    this.context.beginPath();
    this.context.moveTo(puntoA.getX() * this.getScale(), puntoA.getY() * this.getScale());
    this.context.lineTo(this.getPointA().getX() * this.getScale(), this.getPointA().getY() * this.getScale() + alto );
    this.context.stroke();


    // punto A
    this.context.beginPath();
    this.context.moveTo(puntoA.getX() * this.getScale(), puntoA.getY() * this.getScale());
    this.context.lineTo(this.getPointA().getX() * this.getScale(), this.getPointA().getY() * this.getScale() + alto );
    this.context.stroke();



    // punto B
    this.context.beginPath();
    this.context.moveTo(this.getPointB().getScaledX(), this.getPointB().getScaledY()  );
    this.context.lineTo(this.getPointB().getScaledX(), this.getPointB().getScaledY() + alto );
    this.context.stroke();


    // punto C
    this.context.beginPath();
    this.context.moveTo(puntoC.getX(), puntoC.getY());
    this.context.lineTo(this.getPointC().getX() * this.getScale(), this.getPointC().getY() * this.getScale() + alto);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(puntoD.getX() * this.getScale(), puntoD.getY() * this.getScale());
    this.context.lineTo(puntoD.getX() * this.getScale(), puntoD.getY() * this.getScale() + alto);
    this.context.stroke();


    this.context.beginPath();
    this.context.moveTo(puntoD.getScaledX(), puntoD.getScaledY() + alto);
    this.context.lineTo(puntoA.getScaledX(), puntoA.getScaledY() + alto);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(puntoC.getScaledX(), puntoC.getScaledY() + alto);
    this.context.lineTo(puntoA.getScaledX(), puntoA.getScaledY() + alto);
    this.context.stroke();

    // this.context.beginPath();
    // this.context.moveTo(puntoB.getScaledX(), puntoB.getScaledY()  );
    // this.context.lineTo(puntoB.getScaledX(), puntoB.getScaledY() - alto);
    // this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(puntoC.getScaledX(), puntoC.getScaledY() + alto);
    this.context.lineTo(puntoB.getScaledX(), puntoB.getScaledY() + alto);
    this.context.stroke();


    this.context.beginPath();
    this.context.moveTo(puntoD.getScaledX(), puntoD.getScaledY() + alto);
    this.context.lineTo(puntoB.getScaledX(), puntoB.getScaledY() + alto);
    this.context.stroke();



  }
  getPointE(): Point {
    return this.cube.getPointE();
  }
  getPointF(): Point {
    return this.cube.getPointF();
  }
  getPointG(): Point {
    return this.cube.getPointG();
  }
  getPointH(): Point {
    return this.cube.getPointH();
  }
  drawLine(pointA: Point, pointB: Point): void {
    if ( pointA === undefined || pointB === undefined) {
      return;
    }
    this.context.beginPath();
    this.context.moveTo(pointA.getX() * this.getScale(), pointA.getY() * this.getScale());
    this.context.lineTo(pointB.getX() * this.getScale(), pointB.getY() * this.getScale());
    this.context.stroke();



  }
  getPointA(): Point {
    return this.cube.getPointA();
  }
  getPointB(): Point {
    return this.cube.getPointB();
  }
  getPointC(): Point {
    return this.cube.getPointC();
  }
  getPointD(): Point {
    return this.cube.getPointD();
  }

  getHeight(): number {
    return this.cube.getHeight();
  }
  setHeight(height: number): void {
    this.cube.setHeight(height);
  }
  up(): void {
    this.cube.up();
  }
  down(): void {
    this.cube.down();
  }
  left(): void {
    this.cube.left();
  }
  right(): void {
    this.cube.right();
  }
  getLine1(): Line {
    return this.cube.getLine1();
  }
  setLine1(line: Line): void {
    this.cube.setLine1(line);
  }
  getLine2(): Line {
    return this.cube.getLine2();
  }
  setLine2(line: Line): void {
    this.cube.setLine2(line);
  }
  getIntersectionPoint(): Point {
    return this.cube.getIntersectionPoint();
  }
  setScale(scale: number): void {
    this.cube.setScale(scale);
  }
  getScale(): number {
    return this.cube.getScale();
  }

  ngOnInit(): void {


  

    setInterval(() => {

      if (!this.getPause()) {

        this.setGeneration(this.getGeneration() + 1);


        this.cube.dibujarMatriz(this.cube.getMatrizActiva())

        // tthis.matrizSiguiente(this.cube.getMatrizActiva())
        this.cube.setMatrizActiva(this.cube.matrizSiguiente(this.cube.getMatrizActiva()))

      }

        this.draw();

    }, 500)

  }

}
