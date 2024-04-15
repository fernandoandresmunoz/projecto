import { Girable } from "./girable";
import { Movable } from "./movable";
import { Reflejable } from "./reflejable";


export interface Figura extends Movable, Girable, Reflejable{

    dibujar(): void;
    getArea(): number;
    getPerimetro(): number;
}
