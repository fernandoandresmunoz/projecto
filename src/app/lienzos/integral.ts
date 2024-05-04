import { Coloreable } from "./coloreable";

export interface Integral extends Coloreable {

    getInicioX(): number;
    setInicioX(inicioX: number): void;
    getFinX(): number;
    setFinX(finX: number): void;
    getAnchoRectangulo(): number;
    setAnchoRectangulo(anchoRectangulo: number): void;


}
