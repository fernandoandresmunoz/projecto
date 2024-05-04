import { Function as Funcion } from './function';


export interface FabricaDeFunciones {
    crearFuncion(tipo: string): Funcion;
}