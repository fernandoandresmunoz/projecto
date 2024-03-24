import { Automata } from "cube";
import { FabricaDeAutomatas } from "./fabrica-de-automatas";
import ConcreteAutomata from "concreteAutomata";
import { ConcreteShapeFactory } from "concreteShapeFactory";
import { ConcreteRandomMatrixStrategy } from "./ConcreteRandomMatrixStrategy";






export class FabricaDeAutomatasConcreta implements FabricaDeAutomatas {

    crearAutomata(id: number): Automata {
        if (id === 1 ) {
            let factory2 = new ConcreteShapeFactory()
            let automata1: Automata = factory2.createGliderStrategy(100, 100);
            // automata1.setMatrixCreationStrategy(new ConcreteRandomMatrixStrategy())
            // automata1.setMatrizActiva(automata1.createRandomMatriz())
            // automata1.setMatrizActiva(automata1.createRandomMatriz())

        // cube.setMatrizActiva(cube.createRandomMatriz())
            return automata1;
        }
            let factory2 = new ConcreteShapeFactory()
            let automata1: Automata = factory2.createMilitaryCube(100, 100);
            return automata1;
    }

}
