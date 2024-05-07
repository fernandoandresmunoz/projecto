import { Lienzo } from "./lienzo";
import { ListaDeLienzos } from "./lista-de-lienzos";

export interface FabricaDeListaDeLienzos {

    crear(): ListaDeLienzos;

}
