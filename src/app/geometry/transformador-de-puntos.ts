import { Point } from "point";

export interface TransformadorDePuntos {

    transformarPunto(punto: Point): Point;
    getAnchoCalculadora(): number;
}
