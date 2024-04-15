import { Point } from "point";
import { Rectangulo } from "./rectangulo";

export class RectanguloConcreto implements Rectangulo {

    point1: Point;
    point2: Point;
    point3: Point;
    point4: Point;

    setear(point1: Point, point2: Point, point3: Point, point4: Point): void {
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.point4 = point4;
    }
    area(): number {
        throw new Error("Method not implemented.");
    }
    perimetro(): number {
        throw new Error("Method not implemented.");
    }
}
