import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Line } from "line";
import { Point } from "point";

export class ConcretePoint implements Point {

    x = 0;
    y = 0;
    name = '';
    scale = 1;
    factory = new ConcreteShapeFactory();

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getLine(pointB: Point): Line {
        return this.factory.createLine(this, pointB);
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