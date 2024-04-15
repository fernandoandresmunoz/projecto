import { Line } from "line";
import { Point } from "point";
import { Triangulo } from "./triangulo";
import { Cuadrilatero } from "./cuadrilatero";
import { Parabola } from "./parabola";
import { Matrix } from "./matrix";



// este programa tiene que ser todas las ideas que pienso que podría crear 
export interface Geometry {
    crearMatrix(filas: number, columnas: number): Matrix;
}
