import { Lienzo } from "./lienzo";
import { ListaDeLienzos } from "./lista-de-lienzos";

export class ListaDeLienzosConcreta implements ListaDeLienzos {
    obtenerLienzos(): Lienzo[] {
        throw new Error("Method not implemented.");
    }
    eliminarLienzo(lienzo: Lienzo): boolean {
        throw new Error("Method not implemented.");
    }
    cargarLienzos(): void {
        throw new Error("Method not implemented.");
    }

    lienzos: Lienzo[] = [];

    agregarLienzo(lienzo: Lienzo): void {
        this.lienzos.push(lienzo);
    }
    getLienzos(): Lienzo[] {
        return this.lienzos;
    }
}
