import { Point } from "point";
import { Derivada } from "./derivada";
import { Integral } from "./integral";

export interface Function {

    getPoints(desdeX: number, hastaX: number, step: number): Point[];
    agregarDerivada(derivada: Derivada): void;
    getDerivadas(): Derivada[];
    agregarIntegral(integral: Integral): void;
    getIntegrales(): Integral[];
    getColor(): string;
    setColor(color: string): void;
    getAncho(): number;
    setAncho(ancho: number): void;
    funcion(x: number): number;
}
