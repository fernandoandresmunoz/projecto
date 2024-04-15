import { Point } from "point";
import { Girable } from "./girable";
import { Movable } from "./movable";
import { Reflejable } from "./reflejable";

export interface Circunferencia extends Movable, Girable, Reflejable {

    setCentro(centro: Point): void;
    getCentro(): Point;

    setRadio(radio: number): void;
    getRadio(): number;

    getArea(): number;
    getPerimetro(): number;
    
}
