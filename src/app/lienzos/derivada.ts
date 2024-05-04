import { Coloreable } from "./coloreable";

export interface Derivada extends Coloreable {
    getPuntoX(): number;
    setPuntoX(puntoX: number): void;

}
