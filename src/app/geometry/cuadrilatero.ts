import { Point } from "point";
import { Figura } from "./figura";

export interface Cuadrilatero extends Figura{

    getPoint1(): Point;
    getPoint2(): Point;
    getPoint3(): Point;
    getPoint4(): Point;

    setPoint1(point: Point): void;
    setPoint2(point: Point): void;
    setPoint3(point: Point): void;
    setPoint4(point: Point): void;

    setPoints(points: Point[]): void;
}
