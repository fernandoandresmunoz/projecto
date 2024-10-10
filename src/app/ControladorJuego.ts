import { Point } from "point";
import { Circunferencia } from "./geometry/circunferencia";
import { Rectangulo } from "./geometry/rectangulo";
import { Figura } from "./geometry/figura";
import { Poligono } from "./geometry/poligono";
import { Triangle } from "src/modelo";
import { Line } from "line";


export interface ControladorJuego { 
    crearCircunferencia(centerPoint: Point, radius: number): Circunferencia;
    crearCuadrado(left: number, top: number, side: number): Rectangulo;

    agregarCircunferencia(centerPoint: Point, radius: number): void;

    getCircunferencias(): Circunferencia[];

    agregarCuadrilatero(p1: Point, p2: Point, p3: Point, p4: Point): void;

    agregarFigura(figura: Figura): void;

    agregarPoligono(centro: Point, radius: number, lados: number): void;
    crearPoligono(centro: Point, radius: number, lados: number): Poligono;

    agregarTriangulo(p1: Point, p2: Point, p3: Point): void;
    crearTriangulo(p1: Point, p2: Point, p3: Point): Triangle;

    crearRecta(p1: Point, p2: Point): Line;

    agregarRecta(p1: Point, p2: Point): void;
    eliminarRecta(recta: Line): void;
    eliminarFigura(figura: Figura): boolean;

    
    getAllFigures(): Figura[];



}