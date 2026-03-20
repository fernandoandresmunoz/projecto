import { Bloque } from "bloque";
import { Line } from "line";
import { Point } from "point";


export class BloqueConcreto implements Bloque {


    p0: Point;
    p1: Point;
    p2: Point;
    p3: Point;
    altura: number = 0;
    data: {state: number, color: string} ;

    constructor(p0: Point, p1: Point, p2: Point, p3: Point, data: {state: number, color: string }, altura: number = 3) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.altura = altura;
        this.data = data;

    }
    setData(data: { state: number; color: string; }): void {
        this.data = data;
    }
    getData(): { state: number; color: string; } {
        return this.data;
    }
    getLineP0P2(): Line {
        return this.p0.getLine(this.p2);
    }
    getPendienteP0P2(): number {
        return 0;     
    }
    getAltura(): number {
        return this.altura;
    }
    setAltura(altura: number): void {
        this.altura = altura;
    }

    getPointP0(): Point {
        return this.p0;
    }
    getPointP1(): Point {
        return this.p1;
    }
    getPointP2(): Point {
        return this.p2;
    }
    getPointP3(): Point {
        return this.p3;
    }
    getPointP4(): Point {
        throw new Error("Method not implemented.");
    }
    getPointP5(): Point {
        throw new Error("Method not implemented.");
    }
    getPointP6(): Point {
        throw new Error("Method not implemented.");
    }
    getPointP8(): Point {
        throw new Error("Method not implemented.");
    }
    setPoint0(point: Point): void {
        this.p0 = point;
    }
    setPoint1(point: Point): void {
        this.p1 = point;
    }
    setPoint2(point: Point): void {
        this.p2 = point;
    }
    setPoint3(point: Point): void {
        this.p3 = point;
    }
    setPoint4(point: Point): void {
        throw new Error("Method not implemented.");
    }
    setPoint5(point: Point): void {
        throw new Error("Method not implemented.");
    }
    setPoint7(point: Point): void {
        throw new Error("Method not implemented.");
    }
    setPoint8(point: Point): void {
        throw new Error("Method not implemented.");
    }

}