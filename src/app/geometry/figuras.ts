import { Point } from "point";
import { Triangulo } from "./triangulo";
import { Cuadrilatero } from "./cuadrilatero";
import { Poligono } from "./poligono";

export interface Figuras {
    // esto es un factory ?

    // 

    // con este creo figuras geometricas 

    createPoint(x: number, y: number): Point;

    crearTriangulo(pointA: Point, pointB: Point, pointC: Point): Triangulo;
    obtenerTriangulo(pointA: Point, pointB: Point, pointC: Point): Triangulo;


    // podria crear un trapecio , un trapezoide, un rombo , etc 
    crearCuadrilatero(pointA: Point, pointB: Point, pointC: Point, PointD: Point): Cuadrilatero;

    crearTrapecio(pointA: Point, pointB: Point, pointC: Point, PointD: Point): Cuadrilatero;

    // un array de puntos 
    crearPoligono(centro: Point, numeroDeLados: number): Point[];
    crearPoligono(centro: Point, numeroDeLados:number): Poligono;

    crearTrianguloInscrito(): void;

    crearPoligonoInscrito(): void;


    // crear matrix


}
