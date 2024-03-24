import { ConcreteLine } from "concrete-line";
import { ConcretePoint } from "concrete-point";
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Line } from "line";
import { Point } from "point";

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




