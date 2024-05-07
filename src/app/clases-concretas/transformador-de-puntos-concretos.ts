import { Point } from "point";
import { TransformadorDePuntos } from "../geometry/transformador-de-puntos";
import { ConcretePoint } from "concrete-point";

export class TransformadorDePuntosConcretos implements TransformadorDePuntos{

    anchoLienzo: number ;
    largoLienzo: number;
    anchoCalculadora: number;
    largoCalculadora: number;

    constructor(anchoLienzo: number, largoLienzo: number, anchoCalculadora: number, largoCalculadora: number) {
        this.anchoLienzo = anchoLienzo;
        this.largoLienzo = largoLienzo;
        this.anchoCalculadora = anchoCalculadora;
        this.largoCalculadora = largoCalculadora;
    }
    transformadorDeNumero(valor: number): number {
   // Ancho y alto del canvas
            const canvasWidth = this.anchoLienzo;
            const canvasHeight = this.largoLienzo;

            // o sea el minimo es -6 y el maximo es 6
          
            // Centro del canvas
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
          
            // Escalar las coordenadas de -6 a 6 al rango del canvas
            const scaledX = centerX + (valor / this.getAnchoCalculadora()) * canvasWidth;
            // const scaledY = centerY - (punto.getY() / this.getAnchoCalculadora()) * canvasHeight;

            return scaledX;
          
    }
    getAnchoCalculadora(): number {
        return this.anchoCalculadora;
    }

    getLargoCalculadora(): number {
        return this.largoCalculadora;
    }

    // siempre el ancho tiene que ser igual al alto, siempre proporcionales
    transformarPunto(punto: Point, centerX: number, centerY: number): Point {
        
            // Ancho y alto del canvas
            const canvasWidth = this.anchoLienzo;
            const canvasHeight = this.largoLienzo;

            // o sea el minimo es -6 y el maximo es 6
          
            // Centro del canvas
            // const centerX = canvasWidth / 2;
            // const centerY = canvasHeight / 2;
          
            // Escalar las coordenadas de -6 a 6 al rango del canvas
            const scaledX = centerX + (punto.getX() / this.getAnchoCalculadora()) * canvasWidth;
            const scaledY = centerY - (punto.getY() / this.getLargoCalculadora()) * canvasHeight;

            return new ConcretePoint(scaledX, scaledY);
          


    }

    


}
