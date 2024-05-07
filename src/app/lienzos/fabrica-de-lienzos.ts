import { Lienzo } from "./lienzo";
import { Function as Funcion } from './function';

export interface FabricaDeLienzos {

    crear(title: string,
        anchoLienzo: number,
        altoLienzo: number,
        desdeX: number,
        hastaX: number,
        desdeY: number,
        hastaY: number,
        background: string,
        funciones: Funcion[]

        ): Lienzo;

    crearExponenciales(): Lienzo
}
