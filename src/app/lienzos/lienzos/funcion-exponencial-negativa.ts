import { ConcretePoint } from "concrete-point";
import { Point } from "point";
import { Derivada } from "../derivada";
import { Integral } from "../integral";
import { CalculoFuncion, Function as Funcion } from '../function';

export class FuncionExponencialNegativa implements Funcion{
    setCalculoFuncion(calculoFuncion: CalculoFuncion): void {
        throw new Error("Method not implemented.");
    }
    getCalculoFuncion(): CalculoFuncion {
        throw new Error("Method not implemented.");
    }
    funcion(x: number): number {
        return -Math.pow(Math.E, x)
    }

    integrales: Integral[] = [];
    derivadas: Derivada[] = [];
    color: string;
    ancho: number;

    getPoints(desdeX: number, hastaX: number, step: number = 0.01): Point[] {
        let points: Point[] =  []
        for (let i = desdeX; i < hastaX; i += step ) {
            points.push(new ConcretePoint(i, this.funcion(i) ))
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
