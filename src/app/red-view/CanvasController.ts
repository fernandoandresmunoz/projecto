import { ConcretePoint } from "concrete-point";
import { Point } from "point";


interface CanvasController { 

    drawPoint(x: number, y: number): void;
    drawPoint(point: Point): void;
    drawCircle(centerPonit: Point, radius: number): void;
    drawSquare(topLeft: Point, side: number): void;
    drawSquare(top: number, left: number, side: number): void;
    drawRectangle(top: number, left: number, side: number): void;

    drawRectangle(topLeft: Point, side: number): void;
    drawTriangle(point1: Point, point2: Point, point3: Point): void; 
    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    // drawTriangle()


}


interface PointFactory {
    create(x: number, y: number): Point;
}


class ConcretePointFactory implements PointFactory {
    create(x: number, y: number): Point {
        return new ConcretePoint(x, y);
    }

}


export default class Controlador implements CanvasController{

    constructor() {

    }
    drawTriangle(point1: Point, point2: Point, point3: Point): void;
    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    drawTriangle(x1: unknown, y1: unknown, x2: unknown, y2?: unknown, x3?: unknown, y3?: unknown): void {
        throw new Error("Method not implemented.");
    }
    drawPoint(x: number, y: number): void;
    drawPoint(point: Point): void;
    drawPoint(x: unknown, y?: unknown): void {
        throw new Error("Method not implemented.");
    }

    drawCircle(centerPonit: Point, radius: number): void {
        throw new Error("Method not implemented.");
    }
    drawSquare(topLeft: Point, side: number): void;
    drawSquare(top: number, left: number, side: number): void;
    drawSquare(top: unknown, left: unknown, side?: unknown): void {
        throw new Error("Method not implemented.");
    }
    drawRectangle(top: number, left: number, side: number): void;
    drawRectangle(topLeft: Point, side: number): void;
    drawRectangle(top: unknown, left: unknown, side?: unknown): void {
        throw new Error("Method not implemented.");
    }

}


const c = new Controlador()

const pointFactory = new ConcretePointFactory();



const pointB = pointFactory.create(2, 2);
const pointC = pointFactory.create(2, 3);

const pointY = pointFactory.create(0, 0);

c.drawTriangle(pointY, pointB, pointC)

c.drawTriangle(1,2, 3,3, 33, 3)
