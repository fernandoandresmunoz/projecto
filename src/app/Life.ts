import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Cube } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class Life implements NextGenStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Cube): void {
        if ( automata.getGeneration() === 20) {
            automata.setGreenRule(this.shapeFactory.createDiamoebaRule())
            automata.setBrownRule(this.shapeFactory.createAnnealRule())
            automata.setBlueRule(this.shapeFactory.MazectricWithMice())
            automata.setRedRule(this.shapeFactory.PedestrianLife())
        }
    }
}
