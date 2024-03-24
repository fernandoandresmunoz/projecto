import { Automata } from "cube";
import { FabricaDeAutomatas } from "./fabrica-de-automatas";
import ConcreteAutomata from "concreteAutomata";
import { ConcreteShapeFactory } from "concreteShapeFactory";







export class FabricaDeAutomatasConcreta implements FabricaDeAutomatas {
  factory2 = new ConcreteShapeFactory()

    crearAutomata(id: number): Automata {
        if (id === 1) {
            let automata1: Automata = this.factory2.createMilitaryCube(256, 64)
            return automata1;
        }
        let automata1: Automata = this.factory2.createMilitaryCube(256, 64)
        return automata1;

    }

}
