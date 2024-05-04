import { Coloreable } from "./coloreable";
import { Function as Funcion } from "./function";

export interface Lienzo extends Coloreable {

    agregarFuncion(funcion: Funcion): void;
    setAncho(ancho: number): void;
    setLargo(largo: number): void;
    getAncho(): number;
    getLargo(): number;
    getFunciones(): Funcion[];
    draw(): void;

}
