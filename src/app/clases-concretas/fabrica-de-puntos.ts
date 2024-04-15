import { ConcretePoint } from "concrete-point";
import { Point } from "point";

export class FabricaDePuntos {

    crear(x: number, y: number) : Point { 
        return new ConcretePoint(x, y)
    }
}
