import { ConcretePoint } from "concrete-point";
import { Line } from "line";
import { Point } from "point";

export class ConcreteLine implements Line {

    pointA: Point;
    pointB: Point;

    valueX: number = 0;
    valueY: number;
    scale: number = 10;

    constructor(pointA: Point, pointB: Point) {
        this.pointA = pointA;
        this.pointA.setScale(this.scale);
        this.pointB = pointB;
        this.pointB.setScale(this.scale);
    }
    getSplitPoints(quantity: number): Point[] {
        
        let diferencia = this.getPointB().getX() - this.getPointA().getX();
        let k = diferencia / quantity;

        let points = [];

        for (let i = 1 ; i <= quantity; i++) {
            let x = i * k + this.getPointA().getX();
            let y = this.calcularPendiente() * x + this.intereseccionEnEjeY().getY();
            let point = new ConcretePoint( x, y );
            points.push(point)
        }

        return points;
    }
    getScale(): number {
        return this.scale;
    }
    setScale(scale: number): void {
        this.scale = scale;
        this.getPointA().setScale(scale);
        this.getPointB().setScale(scale);
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