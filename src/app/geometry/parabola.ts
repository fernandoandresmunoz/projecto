import { Point } from "point";
import { Figura } from "./figura";
import { Movable } from "./movable";
import { Curva } from "./curva";


export interface Parabola extends  Curva {

    abrir(): void;
    cerrar(): void;

}
