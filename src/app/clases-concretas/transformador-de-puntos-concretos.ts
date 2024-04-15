import { Point } from "point";
import { TransformadorDePuntos } from "../geometry/transformador-de-puntos";
import { ConcretePoint } from "concrete-point";

export class TransformadorDePuntosConcretos implements TransformadorDePuntos{

    anchoLienzo: number ;
    largoLienzo: number;
    anchoCalculadora: number;

    constructor(anchoLienzo: number, largoLienzo: number, anchoCalculadora: number) {
        this.anchoLienzo = anchoLienzo;
        this.largoLienzo = largoLienzo;
        this.anchoCalculadora = anchoCalculadora;
    }
    getAnchoCalculadora(): number {
        return this.anchoCalculadora;
    }

    transformarPunto(punto: Point): Point {
        
            // Ancho y alto del canvas
            const canvasWidth = this.anchoLienzo;
            const canvasHeight = this.largoLienzo;

            // o sea el minimo es -6 y el maximo es 6
          
            // Centro del canvas
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
          
            // Escalar las coordenadas de -6 a 6 al rango del canvas
            const scaledX = centerX + (punto.getX() / this.getAnchoCalculadora()) * canvasWidth;
            const scaledY = centerY - (punto.getY() / this.getAnchoCalculadora()) * canvasHeight;

            return new ConcretePoint(scaledX, scaledY);
          


    }


}
