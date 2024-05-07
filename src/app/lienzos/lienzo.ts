import { Coloreable } from "./coloreable";
import { Function as Funcion } from "./function";

export interface Lienzo extends Coloreable {

    agregarFuncion(funcion: Funcion): void;
    // esto ancho y largo lienzo
    setAncho(ancho: number): void;
    setLargo(largo: number): void;
    getAncho(): number;
    getLargo(): number;
    getFunciones(): Funcion[];
    draw(): void;

    setDesdeX(desdeX: number): void;
    setHastaX(hastaX: number): void;
    setDesdeY(desdeY: number): void;
    setHastaY(hastaY: number): void;
    getDesdeX(): number;
    getHastaX(): number;
    getDesdeY(): number;
    getHastaY(): number;

    setBackground(color: string): void;
    getBackground(): string;
    getTitle(): string;
    setTitle(title: string): void;

}
