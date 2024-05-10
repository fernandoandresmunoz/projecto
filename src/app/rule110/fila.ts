import { Celda } from "./celda";

export interface Fila {

    getCeldas(): Celda[];
    agregarCelda(celda: Celda): void;
       


}
