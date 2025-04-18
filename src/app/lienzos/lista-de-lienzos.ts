import { Lienzo } from "./lienzo";

export interface ListaDeLienzos {

    agregarLienzo(lienzo: Lienzo): void;
    getLienzos(): Lienzo[];
    obtenerLienzos(): Lienzo[];
    eliminarLienzo(lienzo:Lienzo): boolean;
    cargarLienzos(): void;
}
