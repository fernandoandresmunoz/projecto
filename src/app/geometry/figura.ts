import { Point } from "point";
import { Girable } from "./girable";
import { Movable } from "./movable";
import { Reflejable } from "./reflejable";
import { Line } from "line";


export interface Figura extends Movable, Girable, Reflejable{
    // una figura es cualquier cosa que se pueda dibujar. es 
    // no toda figura tiene area. un angulo no tiene area, pero si es una figura . 


    addPunto(point: Point): void;
    addLine(line: Line): void;
    dibujar(): void;
    getArea(): number; // figura no siempre tiene superficie. // deberia ser figura cerrada o algo asi ?
    getPerimetro(): number; // un angulo no tiene perimetro.
    setDibujarLineas(dibujarLineas: boolean): void;
    setDibujarPuntos(dibujarPuntos: boolean): void;
    hasToDrawLines(): boolean;
    hasToDrawPoints(): boolean;
}
