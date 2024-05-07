import { Lienzo } from "./lienzo";
import { ListaDeLienzos } from "./lista-de-lienzos";

export class ListaDeLienzosConcreta implements ListaDeLienzos {

    lienzos: Lienzo[] = [];

    agregarLienzo(lienzo: Lienzo): void {
        this.lienzos.push(lienzo);
    }
    getLienzos(): Lienzo[] {
        return this.lienzos;
    }
}
