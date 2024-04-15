import { Circunferencia } from "../geometry/circunferencia";
import { Movable } from "../geometry/movable";

export interface ControladorCircunferencia extends Movable{


    setModelo(modelo: Circunferencia): void;
    getModel(): Circunferencia;


}
