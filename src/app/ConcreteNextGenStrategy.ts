import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Cube } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class ConcreteNextGenStrategy implements NextGenStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Cube): void {

        if (!automata.getPause()) {



            if (automata.getGeneration() === 1) {
                automata.setBrownRule(this.shapeFactory.createReplicatorRule());
                automata.setBlueRule(this.shapeFactory.createReplicatorRule());
                automata.setGreenRule(this.shapeFactory.createReplicatorRule());
                automata.setRedRule(this.shapeFactory.createReplicatorRule());
                automata.setGrayRule(this.shapeFactory.createReplicatorRule());
            }

            if (automata.getGeneration() === 2) {

                automata.setGrayRule(this.shapeFactory.createWalledCityRule())
            }

            if (automata.getGeneration() === 5) {

                automata.setGrayRule(this.shapeFactory.createDayAndNightRule())
            }
            if (automata.getGeneration() === 42) {

                
                  automata.setBlueRule(this.shapeFactory.createReplicatorRule());
                  automata.setBrownRule(this.shapeFactory.createWalledCityRule());
            }
            if (automata.getGeneration() === 60) {

                
                automata.setBrownRule(this.shapeFactory.createAnnealRule());
                  automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
            }




            if (automata.getGeneration() === 30) {

                // automata.setBrownRule(this.shapeFactory.createAnnealRule())
                
                  automata.setRedRule(this.shapeFactory.MazectricWithMice());
                  automata.setBlueRule(this.shapeFactory.createWalledCityRule());
            }

            if (automata.getGeneration() === 30) {
                //   automata.setRedRule(this.shapeFactory.MazectricWithMice());
                  automata.setRedRule(this.shapeFactory.createLifeWithoutDeathRule());

            }
            else if (automata.getGeneration() === 25) {
                  automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
                //   automata.setGrayRule(this.shapeFactory.createLifeRule())
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
                //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());
                //   this.setGreenRule(this.shapeFactory.MazectricWithMice());
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule())
                automata.setBrownRule(this.shapeFactory.createAnnealRule());
            }

            else if (automata.getGeneration() === 15) {
                automata.setGreenRule(this.shapeFactory.createCoralRule());
                automata.setBlueRule(this.shapeFactory.createDiamoebaRule());
                // automata.setBrownRule(this.shapeFactory.createAnnealRule());
                //   this.setGrayRule(this.shapeFactory.createWalledCityRule())
                //   this.setRedRule(this.shapeFactory.MazectricWithMice());
                //   this.setGreenRule(this.shapeFactory.createCoralRule());
                //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());

            }
        }




    }

}