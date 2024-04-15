import { Point } from "point";
import { Movable } from "./movable";
import { Girable } from "./girable";
import { Reflejable } from "./reflejable";

export interface Triangulo extends Movable, Girable, Reflejable {

    getPointA(): Point;
    getPointB(): Point;
    getPointC(): Point;

    obtenerAltura(): number;

    getArea(): number;
    getPerimetro(): number;

    obtenerAngulos(): number[];

    // los angulos dependen de los puntos 
    // puedo cambiar los angulos y modificar los puntos ?
    // aumento el angulo hacia arriba o hacia abajo o un poco hacia cada lado 

    // tengo que salir de esa clase. me quedé pegado ahi y eso no esta bueno. llevo mucho tiempo escribiendo esa clase 
    // y se volvio inteligible 
    alfa(): number;
    beta(): number;
    gamma(): number;

}
