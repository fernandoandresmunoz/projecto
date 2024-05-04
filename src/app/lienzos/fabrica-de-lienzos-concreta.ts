import { CUADRATICA, EXPONENCIAL } from "variables";
import { FabricaDeFuncionesConcreta } from "./fabrica-de-funciones-concreta";
import { FabricaDeLienzos } from "./fabrica-de-lienzos";
import { Lienzo } from "./lienzo";
import { LienzoConcreto } from "./lienzo-concreto";

export class FabricaDeLienzosConcreta implements FabricaDeLienzos{
    crear(): Lienzo {

        let lienzo = new LienzoConcreto();
        let fabrica = new FabricaDeFuncionesConcreta();

        lienzo.agregarFuncion(fabrica.crear(EXPONENCIAL));
        lienzo.agregarFuncion(fabrica.crear(CUADRATICA));



        return lienzo;

    }
}
