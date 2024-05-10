import { Celda } from "./celda";
import { Fila } from "./fila";

export class FilaConcreta implements Fila {
    celdas: Celda[] = [];

    agregarCelda(celda: Celda): void {
        this.celdas.push(celda)
    }

    getCeldas(): Celda[] {
        return this.celdas;
    }

}
