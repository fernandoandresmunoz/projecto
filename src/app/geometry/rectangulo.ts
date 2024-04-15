import { Point } from "point";

export interface Rectangulo {

    setear(point1: Point, point2: Point, point3: Point, point4: Point): void;
    area(): number;
    perimetro(): number;
}
