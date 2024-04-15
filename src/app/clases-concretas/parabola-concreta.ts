import { Parabola } from "../geometry/parabola";

import { Point } from "point";
import { FabricaDePuntos } from "./fabrica-de-puntos";
import { ConcretePoint } from "concrete-point";
import { ConcreteLine } from "concrete-line";
export class ParabolaConcreta  implements Parabola {
    draw(): void {
        throw new Error("Method not implemented.");
    }


   gaussianBellCurve(x: number, mean: number=0, standardDeviation: number=0.4): number {
    const exponent = -((x - mean) ** 2) / (2 * standardDeviation ** 2) ;
    const constant = 1 / (Math.sqrt(2 * Math.PI) * standardDeviation);
    return constant * Math.exp(exponent) ;
  }

    funcion(x: number): number {
        // return  - Math.pow(Math.E, x )  + 3 ;
        // return Math.pow(x, 3)
        return Math.sin(x * 3)
        return - Math.pow(x, 2) + 1.5  
        return Math.cos(Math.pow(x, 2 ) * 4) * 1
        return Math.log(x)
        return this.gaussianBellCurve(x)
        return  Math.pow(x, 2) //- x - 2;
        return (1/16) * Math.pow(x, 4 ) - (5/4) * Math.pow(x , 2 ) + 4
        return 3 * Math.pow(x, 5) - 25 * Math.pow(x, 3) + 60 * x 
        return   x*x*x - 2 * x * x  - 3 * x + 2      ;
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
        const punto2 = new ConcretePoint(valorEnX + 0.001, this.funcion(valorEnX + 0.001));

        const recta = new ConcreteLine(punto1, punto2);

        const derivada = recta.calcularPendiente();
        return derivada;




    }
    calcularIntegral(desde: number, hasta: number): number {
        throw new Error("Method not implemented.");
    }
}
