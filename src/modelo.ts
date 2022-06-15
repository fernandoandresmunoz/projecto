
export interface Drawable {
    draw(): void;
}


export interface Moveable {
    moveUp(): void;
    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
}

export interface Nameable {
    getName(): string;
    setName(name: string): void;
}


export interface Scalable {
    setScale(scale: number): void;
    getScale(): number;
}


export interface Point extends Drawable, Nameable, Scalable {
  getX(): number;
  getScaledX(): number;

  getY(): number;
  getScaledY(): number;

  setY(y: number): void;
  setX(x: number): void;

  aumentarX(): void;
  disminuirX(): void;
  aumentarY(): void;
  disminuirY(): void;
  draw(): void;

  //calcular donde la proyeccion del punto interesecta perpendicularmente a una recta dada.
  calularInterseccionPerpendicular(line: Line): Point;

  // ecuacion dada proyeccion perpendicular del punto a una recta dada.
  ecuacionRectaPerpendicular(line: Line): string;
  rectaPerpendicular(): Line;
  // proyeccion punto perpendicular
  puntoPerpendicular(line: Line): Point;


}


export interface PointController {
    getModel(): Point;
    setModel(model: Point): void;
    aumentarX(): void;
    disminuirX(): void;
    aumentarY(): void;
    disminuirY(): void;
    scaleUp(): void;
    scaleDown(): void;
}

export interface PointView {
    getModel(): Point;
    setModel(model: Point): void;
    getValueX(): number;
    getValueY(): number;
}



export interface CurvaExponencial extends Moveable, Drawable, Nameable, Scalable {
    getPoints(minX: number, maxX: number): Point[];
}


export interface Cuadratica {

}

export interface CurvaGauss {}


export interface Triangle extends Moveable, Scalable {

    // puntos
    getPointA(): Point;
    getPointB(): Point;
    getPointC(): Point;

    // cambiar puntos
    setPointA(point: Point): void;
    setPointB(point: Point): void;
    setPointC(point: Point): void;

    // las lineas no las puedo cambiar, solo tengo que dar los puntos
    getLineAB(): Line;
    getLineBC(): Line;
    getLineAC(): Line;

    // area y perimetro
    getArea(): number;
    getPerimeter(): number;
}


export interface TriangleController {

}


export interface CircleController {}

export interface LineController {}


export interface Circle extends Scalable, Moveable, Drawable, Nameable {
    setCenter(point: Point): void;
    getCenter(): Point;
    getRadio(): number;
    setRadio(radio: number): void;
    getArea(): number;
    getPerimetro(): number;
}


export class ConcreteCircle implements Circle {

    center: Point;
    radius: number;
    scale = 1;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }
    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2 );
    }
    getPerimetro(): number {
        return 2 * Math.PI * this.radius;
    }
    getCenter(): Point {
        return this.center;
    }

    draw(): void {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    setName(name: string): void {
        throw new Error("Method not implemented.");
    }
    moveUp(): void {
        throw new Error("Method not implemented.");
    }
    moveDown(): void {
        throw new Error("Method not implemented.");
    }
    moveLeft(): void {
        throw new Error("Method not implemented.");
    }
    moveRight(): void {
        throw new Error("Method not implemented.");
    }
    setScale(scale: number): void {
        throw new Error("Method not implemented.");
    }
    getScale(): number {
        throw new Error("Method not implemented.");
    }
    setCenter(point: Point): void {
        throw new Error("Method not implemented.");
    }
    getRadio(): number {
        throw new Error("Method not implemented.");
    }
    setRadio(radio: number): void {
        throw new Error("Method not implemented.");
    }
}



export interface TriangleController {
    getModel(): Triangle;
    setModel(model: Triangle): void;
    moveLeft(amount: number): void;
    moveRight(amount: number): void;
    moveTop(amount: number): void;
    moveBottom(amount: number): void;


}


export interface Quadrilateral {
    getPointA(): Point;
    getPointB(): Point;
    getPointC(): Point;
    getPointD(): Point;

}


export class ConcretePoint implements Point {

    x = 0;
    y = 0;
    name = '';
    scale = 1;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getScaledX(): number {
        return this.getX() * this.getScale();
    }
    getScaledY(): number {
        return this.getY() * this.getScale();
    }

    setScale(scale: number): void{   
        this.scale = scale;
    }

    getScale(): number {
        return this.scale;
    }

    puntoPerpendicular(line: Line): Point {
        // calculos para determinar la recta perpendicular a la recta dada
        let pendiente = -1 /  line.calcularPendiente(); 
        let corteEnY = - 1 / line.calcularPendiente() * this.getX() + this.getY()

        let pendienteFinalValue = line.calcularPendiente() - pendiente;
        let valorSumaCortesEnY = - 1* ( corteEnY + line.intereseccionEnEjeY().getY());

        const v = valorSumaCortesEnY / pendienteFinalValue;

        return new ConcretePoint(v, v * pendiente - corteEnY);

    }

    ecuacionRectaPerpendicular(line: Line): string {

        let pendiente = -1 /  line.calcularPendiente(); 
        let corteEnY = - 1 / line.calcularPendiente() * this.getX() + this.getY()

        let pendienteFinalValue = line.calcularPendiente() - pendiente;
        let valorSumaCortesEnY = -1 * ( corteEnY + line.intereseccionEnEjeY().getY() );

        const v = ( pendiente - line.calcularPendiente()  ) / (  corteEnY + line.intereseccionEnEjeY().getY());

        let valorX = valorSumaCortesEnY / pendienteFinalValue;


        return `y = ${pendiente} x - ${corteEnY} `;
//   y   =  {{ - 1 / getLine().calcularPendiente()}}  x - {{ - 1 / getLine().calcularPendiente() * getPoint().getX() + getPoint().getY() }}  
    }


    rectaPerpendicular(): Line {
        throw new Error("Method not implemented.");
    }
    calularInterseccionPerpendicular(line: Line): Point {
        return this.puntoPerpendicular(line);
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }
    aumentarX(): void {
        this.x += 1;
    }
    disminuirX(): void {
        this.x -= 1;
    }
    aumentarY(): void {
        this.y += 1;
    }
    disminuirY(): void {
        this.y -= 1;
    }

    getX(): number {
        return this.x;
    }
    setX(x: number): void {
        this.x = x;
    }
    getY(): number {
        return this.y;
    }
    setY(y: number): void {
        this.y = y;
    }
}


interface FiguraCompleja {
    getLineas(): Line[];
    getPoints(): Point[];
    rotarIzquierda(): void;
    rotarDerecha(): void;
    rotarHaciaArriba(): void;
    rotarHaciaAbajo(): void;
}



export class ConcretePointController implements PointController {

    model: Point;

    constructor(model: Point) {
        this.model = model;
    }
    scaleUp(): void {
        this.model.setScale(this.model.getScale() + 1);
    }
    scaleDown(): void {
        this.model.setScale(this.model.getScale() - 1)
    }

    getModel(): Point {
        return this.model;
    }
    setModel(model: Point): void {
        this.model = model;
    }
    aumentarX(): void {
        this.model.setX( this.model.getX() + 1);
    }
    disminuirX(): void {
        this.model.setX(this.model.getX() - 1);
    }
    aumentarY(): void {
        this.model.setY(this.model.getY() +1 );
    }
    disminuirY(): void {
        this.model.setY(this.model.getY() - 1);
    }

}






export interface Line extends Drawable {
  setPointA(point: Point): void;
  setPointB(point: Point): void;
  getPointA(): Point;
  getPointB(): Point;
  calcularDistancia(): number;
  calcularPendiente(): number;

  getValueY(): number;
  getValueX(): number;

  aumentarX(): void;
  disminuirX(): void;

  // calcular Intereseccion con otra recta.
  calcularInterseccionRecta(line: Line): Point;
  // calcular la intereseccion en el eje y, o sea cuando x = 0;
  intereseccionEnEjeY(): Point;
  // representacion string de la funcion de la recta.
  ecuacionRecta(): string;

  getPoints(min: number, max: number, step: number): Point[];
}


export interface Altura {
    getLine(): Line;
    getPointA(): Point;
    // es el Point que se tiene que determinar.
    getPointB(): Point;

}


export interface App {
    obtenerPuntos(): Point[];
    obtenerLineas(): Line[];
    getAlturas(): Line[];
    
    crearPunto(): void;
    crearLinea(pointA: Point, pointB: Point): void;
    crearAltura(point: Point, line: Line): Line;

}


export interface TreePointsApp {

}


export interface TwoLinesApp {
    getLine1(): Line;
    setLine1(line: Line): void;
    getLine2(): Line;
    setLine2(line: Line): void;
    getIntersectionPoint(): Point;
}


export interface OneLineAndPointApp {
    getLine(): Line;
    setLine(line: Line): void;
    getPoint(): Point;
    setPoint(point: Point): void;
    getIntersection(): Point;
}


export class COneLineAndPointApp implements OneLineAndPointApp {

    line: Line;
    point: Point;

    factory = new ConcreteShapeFactory();

    constructor() {
        this.line = this.factory.createLine(this.factory.createPoint(0, -3), this.factory.createPoint(3, 3));
        this.point = this.factory.createPoint(3, 0);
    }

    getLine(): Line {
        return this.line;
    }
    setLine(line: Line): void {
        this.line = line;
    }
    getPoint(): Point {
        return this.point;
    }
    setPoint(point: Point): void {
        this.point = point;
    }
    getIntersection(): Point {
        throw new Error("Method not implemented.");
    }

}


export class CTwoLinesApp implements TwoLinesApp {

    line1: Line = new ConcreteLine(new ConcretePoint(-3, 1), new ConcretePoint(2, -4));
    line2: Line = new ConcreteLine( new ConcretePoint(-2, -2), new ConcretePoint(2, 2));

    constructor() {

    }

    getLine1(): Line {
        return this.line1;
    }
    setLine1(line: Line): void {
        this.line1 = line;
    }
    getLine2(): Line {
        return this.line2;
    }
    setLine2(line: Line): void {
        this.line2 = line;
    }
    getIntersectionPoint(): Point {
        return this.line1.calcularInterseccionRecta(this.line2);
    }

}



export class ConcreteLine implements Line {

    pointA: Point;
    pointB: Point;

    valueX: number = 0;
    valueY: number;

    constructor(pointA: Point, pointB: Point) {
        this.pointA = pointA;
        this.pointB = pointB;
    }
    getPoints(min: number, max: number, step: number): Point[] {
        let points: Point[] = [];
        return points;
    }

    ecuacionRecta(): string {
        return `y = ${ this.calcularPendiente() !== 0 ? ( this.calcularPendiente() !== 1 ? this.calcularPendiente() : "" )  + 'x '
        + ( this.intereseccionEnEjeY().getY() > 0 ? '+' : '' ):  ''}    ${this.intereseccionEnEjeY().getY()}`; 
    }
    intereseccionEnEjeY(): Point {
        return new ConcretePoint(0, this.calcularPendiente() * 0 - this.calcularPendiente() * this.getPointA().getX() 
        + this.getPointA().getY());
    }
    calcularInterseccionRecta(line: Line): Point {

        let x = (   line.intereseccionEnEjeY().getY() - this.intereseccionEnEjeY().getY() )
        / (  line.calcularPendiente() - this.calcularPendiente()  );
        let y = this.calcularPendiente() * x - this.intereseccionEnEjeY().getY();
        x *= -1
        y *= -1
        return new ConcretePoint(x, y);
    }
    aumentarX(): void {
        this.valueX += 1;
    }
    disminuirX(): void {
        this.valueX -= 1;
    }
    getValueY(): number {
        return this.calcularPendiente() * this.getValueX() - this.calcularPendiente() * this.getPointA().getX() + this.getPointA().getY();
    }
    getValueX(): number {
        return this.valueX;
    }
    calcularPendiente(): number {
        return (this.getPointB().getY() - this.getPointA().getY() ) / (this.getPointB().getX() - this.getPointA().getX());
    }

    draw(): void {
        throw new Error("Method not implemented.");
    }
    calcularDistancia(): number {
        return Math.sqrt( Math.pow( ( this.pointB.getX() - this.pointA.getX() ), 2 )
        + Math.pow( ( this.getPointB().getY() - this.getPointA().getY()), 2 ) );
    }

    distancia(pointA: Point, pointB: Point) {
        return Math.sqrt(Math.pow(pointA.getX() - pointB.getX(), 2))
    }

    setPointA(point: Point): void {
        this.pointA = point;
    }
    setPointB(point: Point): void {
        this.pointB = point;
    }
    getPointA(): Point {
        return this.pointA;
    }
    getPointB(): Point {
        return this.pointB;
    }

}

class FabricaDePuntos {
  crear(x: number, y : number): Point {
    return new ConcretePoint(x, y);
  }
}


class FabricaDeLineas {

  fabricaDePuntos = new FabricaDePuntos();

  crear(pointA: Point, pointB: Point) {

    return new ConcreteLine(pointA, pointB);
  }
}


export class ConcreteApp implements App {
    getAlturas(): Line[] {
        throw new Error("Method not implemented.");
    }
    crearAltura(point: Point, line: Line): Line {
        throw new Error("Method not implemented.");
    }

    puntos: Point[] = [];
    lineas: Line[] = [];

    fabricaDePuntos = new FabricaDePuntos();
    fabricaDeLineas = new FabricaDeLineas();


    obtenerPuntos(): Point[] {
        return this.puntos;
    }
    obtenerLineas(): Line[] {
        return this.lineas;
    }
    crearPunto(): void {
        this.puntos.push(this.fabricaDePuntos.crear(0, 0));
    }
    crearLinea(pointA: Point, pointB: Point): void {
        this.lineas.push(this.fabricaDeLineas.crear(pointA, pointB))
    }
}


export interface ControllerFactory {
    createCircleController(model: Circle): CircleController;
    createLineController(model: Line): LineController;
    createPointController(model: Point): PointController;
    createTriangleController(model: Triangle): TriangleController ;
}


export interface ShapeFactory {
    createLine(pointA: Point, pointB: Point): Line;
    createPoint(x: number, y: number): Point;
    createQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Quadrilateral;
    createTriangle(pointA: Point, pointB: Point, pointC: Point): Triangle;
    createCircle(center: Point, radius: number): Circle;
}

export class ConcreteShapeFactory implements ShapeFactory {
    createCircle(center: Point, radius: number): Circle {
        return new ConcreteCircle(center, radius);
    }
    createTriangle(pointA: Point, pointB: Point, pointC: Point): Triangle {
        throw new Error("Method not implemented.");
    }
    createQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Quadrilateral {
        throw new Error("Method not implemented.");
    }
    createLine(pointA: Point, pointB: Point): Line {
        return new ConcreteLine(pointA, pointB);
    }
    createPoint(x: number, y: number): Point {
        return new ConcretePoint(x, y);
    }

}