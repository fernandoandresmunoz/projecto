import { Function as Funcion } from './function';


export interface FabricaDeFunciones {
    crear( tipo: string): Funcion;
}
