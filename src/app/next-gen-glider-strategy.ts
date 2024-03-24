import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from "cube";
import { ShapeFactory } from "shapeFactory";

export class NextGenGliderStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Automata): void {

        let GENERATION = automata.getGeneration();
        switch (GENERATION) {
            case 50:
                automata.setBlueRule(this.shapeFactory.createReplicatorRule())
                automata.setBrownRule(this.shapeFactory.createMazeRule())
                automata.setRedRule(this.shapeFactory.createAnnealRule())
                automata.setGrayRule(this.shapeFactory.createReplicatorRule())
                automata.setGreenRule(this.shapeFactory.createMazeRule())
                break;
            case 70:
                automata.setBlueRule(this.shapeFactory.createAnnealRule())
                
                break;

            case 100:
                automata.setGreenRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.MazeWithMice())
                automata.setBrownRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.createMazeRule())
                break;

            case 120:
                automata.setGrayRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.createAnnealRule())
                automata.setGreenRule(this.shapeFactory.createDayAndNightRule())
                automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
                break;
            
            case 140:
                automata.setGreenRule(this.shapeFactory.createCoagulationRule())
                automata.setBlueRule(this.shapeFactory.createAnnealRule())
                break;
        
            default:
                break;
        }


    }


}
