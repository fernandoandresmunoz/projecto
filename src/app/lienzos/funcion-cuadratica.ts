import { Point } from "point";
import { Derivada } from "./derivada";
import { CalculoFuncion, Function } from "./function";
import { Integral } from "./integral";
import { ConcretePoint } from "concrete-point";

export class FuncionCuadratica implements Function{
    integrales: Integral[] = [];
    derivadas: Derivada[] = [];
    color: string;
    ancho: number;
    calculoFuncion: CalculoFuncion;
    funcionCalculoFuncion: (x: number) => number;

    constructor(funcion: (x: number) => number) {
        this.funcionCalculoFuncion = funcion;
    }

    setCalculoFuncion(calculoFuncion: CalculoFuncion): void {
        this.calculoFuncion = calculoFuncion;
    }
    getCalculoFuncion(): CalculoFuncion {
        return this.calculoFuncion;
    }
    funcion(x: number): number {
        return this.funcionCalculoFuncion(x);
        // return - 1 * x**2 + x + 4
    }


    getPoints(desdeX: number, hastaX: number, step: number = 0.01): Point[] {
        let points: Point[] =  []
        for (let i = desdeX; i < hastaX; i += step ) {
            points.push(new ConcretePoint(i, this.funcion(i)))
        }
        return points;
    }
    agregarDerivada(derivada: Derivada): void {
       this.derivadas.push(derivada); 
    }
    getDerivadas(): Derivada[] {
        return this.derivadas;
    }
    agregarIntegral(integral: Integral): void {
        this.integrales.push(integral)
    }
    getIntegrales(): Integral[] {
        return this.integrales;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string): void {
        this.color = color;
    }
    getAncho(): number {
        return this.ancho;
    }
    setAncho(ancho: number): void {
        this.ancho = ancho;
    }
    
}
