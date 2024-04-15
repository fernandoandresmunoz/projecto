import { Point } from "point";
import { Figura } from "./figura";

export interface Curva  {
    // que se pueda manejar la pantalla 
    getPoints(desde: number, hasta: number): Point[];

    calcularDerivada(valorEnX: number): number;

    calcularIntegral(desde: number, hasta: number): number;

    // esta es la funcion al final 
    funcion(x: number): number;
    draw(): void;
}
