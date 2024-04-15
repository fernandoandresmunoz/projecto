import { Point } from "point";
import { Parabola } from "./parabola";
import { Line } from "line";
import { CurvaExponencial } from "src/modelo";
import { Curva } from "./curva";


export interface Curvas {
    // aqui creo curvas 

    // curvas que se me ocurren.
    // esta funcion solo devuelve los puntos, no sabe como se tienen que dibujar
    crearRecta(pointA: Point, pointB: Point): Line;
    createLine(pointA: Point, pointB: Point): Line;

    createLine(line: Line): Line;

    // incluso que me devuelva la ecuacion cuadratica
    crearParabola(inicioX: number, finX: number): Point[];
    crearParabola(inicioX: number, finX: number): Parabola;
    crearParabola(inicioX: number, finX: number): Curva;


    crearCurvaExponencial(inicioX: number, finX: number): Point[];
    crearCurvaExponencial(inicioX: number, finX: number): CurvaExponencial;

    crearCurvaPolinomica(inicioX: number, finX: number): Point[]

    crearCurvaSinosoidal(inicioX: number, finX: number): Point[][];
    crearCurvaCoseno(inicioX: number, finX: number): Point[][];
    crearCurvaTangente(inicioX: number, finX: number): Point[][];
    // sería super interesante poder crear la curva de Gauss
    crearCurvaGauss(): Point[][];
    crearCurvaLogaritmica(inicioX: number, finX: number): Point[][];

    // faltarian solamente las funciones polinomiales.



}
