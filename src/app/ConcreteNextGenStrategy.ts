import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class ConcreteNextGenStrategy implements NextGenStrategy {

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
                automata.setBrownRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.createAnnealRule())
                // automata.setBrownRule(this.shapeFactory.createMazeRule())
                break;

            case 120:
                automata.setGrayRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule())
                // automata.setGreenRule(this.shapeFactory.createDayAndNightRule())
                automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
                break;
            
            case 200:
                automata.setGreenRule(this.shapeFactory.createCoagulationRule())
                automata.setBlueRule(this.shapeFactory.createAnnealRule())
                automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule())
                break;

             case 280:
                automata.setGreenRule(this.shapeFactory.createLifeWithoutDeathRule())
                automata.setBlueRule(this.shapeFactory.createLifeWithoutDeathRule())
                automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule())
                break;
        
            default:
                break;
        }


    }

}


        // if (!automata.getPause()) {



        //     if (automata.getGeneration() === 1) {
        //         automata.setBrownRule(this.shapeFactory.createReplicatorRule());
        //         automata.setBlueRule(this.shapeFactory.createReplicatorRule());
        //         automata.setGreenRule(this.shapeFactory.createReplicatorRule());
        //         automata.setRedRule(this.shapeFactory.createReplicatorRule());
        //         automata.setGrayRule(this.shapeFactory.createReplicatorRule());
        //     }

        //     if (automata.getGeneration() === 2) {

        //         automata.setGrayRule(this.shapeFactory.createWalledCityRule())
        //     }

        //     if (automata.getGeneration() === 5) {

        //         automata.setGrayRule(this.shapeFactory.createDayAndNightRule())
        //     }
        //     if (automata.getGeneration() === 42) {

                
        //           automata.setBlueRule(this.shapeFactory.createReplicatorRule());
        //           automata.setBrownRule(this.shapeFactory.createWalledCityRule());
        //     }
        //     if (automata.getGeneration() === 60) {

                
        //         //   automata.setBlueRule(this.shapeFactory.createCoralRule());
        //     }

        //     if (automata.getGeneration() === 60) {

                
        //         //   automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //     }
        //     if (automata.getGeneration() === 90) {

        //           automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //         automata.setBrownRule(this.shapeFactory.createDayAndNightRule());
                
        //         //   automata.setBrownRule(this.shapeFactory.createAnnealRule())
        //     } if (automata.getGeneration() === 100) {
        //         // automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule()u)
        //     }





        //     if (automata.getGeneration() === 30) {

        //         // automata.setBrownRule(this.shapeFactory.createAnnealRule())
                
        //           automata.setRedRule(this.shapeFactory.MazectricWithMice());
        //           automata.setBlueRule(this.shapeFactory.createWalledCityRule());
        //     }

        //     if (automata.getGeneration() === 30) {
        //         //   automata.setRedRule(this.shapeFactory.MazectricWithMice());
        //           automata.setRedRule(this.shapeFactory.createWalledCityRule());
        //           automata.setBrownRule(this.shapeFactory.createAnnealRule())

        //         // automata.setBrownRule(this.shapeFactory.createAnnealRule());
        //     }
        //     else if (automata.getGeneration() === 25) {
        //           automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
        //         //   automata.setGrayRule(this.shapeFactory.createLifeRule())
        //         //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //         //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());
        //         //   this.setGreenRule(this.shapeFactory.MazectricWithMice());
        //         //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //         //   this.setBlueRule(this.shapeFactory.createDiamoebaRule())
        //     }

        //     else if ( automata.getGeneration() === 60) {
        //         // automata.setGrayRule(this.shapeFactory.createWalledCityRule())
        //         // automata.setRedRule(this.shapeFactory.Mazectric())
        //         automata.setRedRule(this.shapeFactory.createDayAndNightRule())
        //         // automata.setBlueRule(this.shapeFactory.createCoagulationRule());
        //         // automata.setGreenRule(this.shapeFactory.createLifeWithoutDeathRule())
        //     }
        //     else if ( automata.getGeneration() === 150) {
        //         // automata.seeenayRule(this.shapeFactory.creaDiWalledCityRule())
        //         // automata.setRedRule(this.shapeFactory.Mazectric())
        //         // automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //     }


        //     else if (automata.getGeneration() === 15) {
        //         automata.setGreenRule(this.shapeFactory.createCoralRule());
        //         automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
        //         // automata.setBrownRule(this.shapeFactory.createAnnealRule());
        //         //   this.setGrayRule(this.shapeFactory.createWalledCityRule())
        //         //   this.setRedRule(this.shapeFactory.MazectricWithMice());
        //         //   this.setGreenRule(this.shapeFactory.createCoralRule());
        //         //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());

        //     }
        // }


