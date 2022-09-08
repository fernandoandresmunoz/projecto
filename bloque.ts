import { Line } from "line";
import { Point } from "point";


export interface Bloque {
    getPointP0(): Point;
    getPointP1(): Point;
    getPointP2(): Point;
    getPointP3(): Point;
    getPointP4(): Point;
    getPointP5(): Point;
    getPointP6(): Point;
    getPointP8(): Point;

    getPendienteP0P2(): number;
    getLineP0P2(): Line;


    getAltura(): number;
    setAltura(altura: number): void;

    setPoint0(point: Point): void;
    setPoint1(point: Point): void;
    setPoint2(point: Point): void;
    setPoint3(point: Point): void;
    setPoint4(point: Point): void;
    setPoint5(point: Point): void;
    setPoint7(point: Point): void;
    setPoint8(point: Point): void;


    getData(): {state: number, color: string};
    setData(data: {state: number, color: string}): void;
}