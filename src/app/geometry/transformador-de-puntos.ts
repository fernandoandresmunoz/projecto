import { Point } from "point";

export interface TransformadorDePuntos {

    transformarPunto(punto: Point, centerX: number, centerY: number): Point;
    getAnchoCalculadora(): number;
    transformadorDeNumero(valor: number): number;
}
