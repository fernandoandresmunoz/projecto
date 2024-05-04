import { Parabola } from "../geometry/parabola";

import { Point } from "point";
import { FabricaDePuntos } from "./fabrica-de-puntos";
import { ConcretePoint } from "concrete-point";
import { ConcreteLine } from "concrete-line";
export class ParabolaConcreta implements Parabola {

    DISTANCIA_PUNTOS_DERIVADAS = 0.001

    tipo: string;

    constructor(tipo: string) {
        this.tipo = tipo;

    }

    draw(): void {
        throw new Error("Method not implemented.");
    }

    weierstrass(x: number): number {
        let result = 0;
        const a = 0.2;
        const b = 3;
        const nMax = 20; // Número máximo de términos a sumar

        for (let n = 0; n < nMax; n++) {
            const power = (2 * n) + 1;
            const exponent = -b * power * Math.pow(x, power);
            const term = a * Math.cos(exponent);
            result += term;
        }

        return result;
    }

    gaussianBellCurve(x: number, mean: number = 0, standardDeviation: number = 0.4): number {
        const exponent = -((x - mean) ** 2) / (2 * standardDeviation ** 2);
        const constant = 1 / (Math.sqrt(2 * Math.PI) * standardDeviation);
        return constant * Math.exp(exponent);
    }

    funcion(x: number): number {
        // return  - Math.pow(Math.E, x )  + 3 ;
        // return Math.pow(x, 3)

        switch (this.tipo) {
            case "GAUSS":
                return this.gaussianBellCurve(x)

            case "SENO":
                // return this.weierstrass(x);
                return Math.tanh(x) + 2.5;

            case "LOGARITMICA":

                return Math.log(x + 1)
            case "EXPONENCIAL":
                return Math.pow(Math.E, x) - 1
            case "CUADRATICA":
                return Math.pow(x, 2) 

            case "POLINOMICA":
                return x ** 3 - 2 * x ** 2 - 3 * x + 2
            default:
                return + Math.pow(x, 2)
                break;
        }
        return Math.cos(Math.pow(x, 2) * 4) * 1
        return Math.pow(x, 2) //- x - 2;
        return 3 * Math.pow(x, 5) - 25 * Math.pow(x, 3) + 60 * x
        return x * x * x - 2 * x * x - 3 * x + 2;
    }

    abrir(): void {
        // tengo que averiguar como abro la parabola y como la cierro 
        throw new Error("Method not implemented.");
    }
    cerrar(): void {
        throw new Error("Method not implemented.");
    }
    getPoints(desde: number, hasta: number): Point[] {

        let x = desde;
        let points = [];
        const fabricaDePuntos = new FabricaDePuntos();

        while (x < hasta) {

            points.push(fabricaDePuntos.crear(x, this.funcion(x)))
            x += 0.01;
        }

        return points;

    }

    calcularDerivada(valorEnX: number): number {
        const punto1 = new ConcretePoint(valorEnX, this.funcion(valorEnX));
        const punto2 = new ConcretePoint(valorEnX + this.DISTANCIA_PUNTOS_DERIVADAS,
            this.funcion(valorEnX + this.DISTANCIA_PUNTOS_DERIVADAS));

        const recta = new ConcreteLine(punto1, punto2);

        const derivada = recta.calcularPendiente();
        return derivada;




    }
    calcularIntegral(desde: number, hasta: number): number {
        throw new Error("Method not implemented.");
    }
}
