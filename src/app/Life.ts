import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Automata } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class Life implements NextGenStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Automata): void {
        if (automata.getGeneration() === 1) {
            automata.setBrownRule(this.shapeFactory.createReplicatorRule())
            automata.setGreenRule(this.shapeFactory.createReplicatorRule())
            automata.setBlueRule(this.shapeFactory.createReplicatorRule())
            automata.setRedRule(this.shapeFactory.createReplicatorRule())

        }
        if (automata.getGeneration() === 3) {

            automata.setGreenRule(this.shapeFactory.createAnnealRule())
        }
        if ( automata.getGeneration() ===8) {
            automata.setBrownRule(this.shapeFactory.createAnnealRule())
            automata.setBlueRule(this.shapeFactory.createAnnealRule())
            // automata.setRedRule(this.shapeFactory.createWalledCityRule())

        }

        if ( automata.getGeneration() === 10 ) {
            automata.setRedRule(this.shapeFactory.createMazeRule())
            automata.setGreenRule(this.shapeFactory.createCoralRule())
            automata.setBrownRule(this.shapeFactory.createWalledCityRule())
            // automata.setBlueRule(this.shapeFactory.createWalledCityRule())

        }
        if ( automata.getGeneration() === 25) {

            automata.setGreenRule(this.shapeFactory.createWalledCityRule())
            automata.setBlueRule(this.shapeFactory.createWalledCityRule())
            automata.setBrownRule(this.shapeFactory.createAnnealRule())
            // automata.setBrownRule(this.shapeFactory.createDiamoebaRule())
            // automata.setBlueRule(this.shapeFactory.MazectricWithMice())

        } if (automata.getGeneration() === 32) {
            automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
            automata.setGreenRule(this.shapeFactory.createCoralRule())
        }
        
    }
}
