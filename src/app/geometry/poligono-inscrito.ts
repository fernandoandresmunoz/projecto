import { Point } from "point";
import { Movable } from "./movable";
import { Girable } from "./girable";

export interface PoligonoInscrito extends Movable, Girable {
    /*
        un poligono inscrito en una circunferencia 
    */
    setCircunferencia(centro: Point, radio: number): void;
    setPoligono(centro: Point, lados: number): void;
}
