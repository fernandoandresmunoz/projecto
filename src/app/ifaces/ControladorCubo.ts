import { Bloque } from "bloque";
import { Cube } from "cube";


export interface ControladorJuego {
    getCubo(): Cube;
    setCubo(cubo: Cube): void;
    cambiarFilas(filas: number): void;
    cambiarColumnas(columnas: number): void;
    getBloques(): Bloque[];

    getCubos(): Cube[];

}