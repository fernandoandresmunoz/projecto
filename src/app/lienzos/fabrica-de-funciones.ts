import { Function as Funcion } from './function';


export interface FabricaDeFunciones {
    // crear( tipo: string): Funcion;
    crear(funcion: (x: number) => number, color: string): Funcion;
}
