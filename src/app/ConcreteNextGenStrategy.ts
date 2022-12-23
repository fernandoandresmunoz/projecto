import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Cube } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class ConcreteNextGenStrategy implements NextGenStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Cube): void {

        if (!automata.getPause()) {

            automata.setGeneration(automata.getGeneration() + 1);


            if (automata.getGeneration() === 1) {
                automata.setBrownRule(this.shapeFactory.createReplicatorRule());
                automata.setBlueRule(this.shapeFactory.createReplicatorRule());
                automata.setGreenRule(this.shapeFactory.createReplicatorRule());
                automata.setRedRule(this.shapeFactory.createReplicatorRule());
            }

            if (automata.getGeneration() === 2) {

            }

            if (automata.getGeneration() === 5) {

                automata.setBrownRule(this.shapeFactory.createAnnealRule());
                // automata.setGrayRule(this.shapeFactory.createWalledCityRule())
            }

            if (automata.getGeneration() === 50) {

                // automata.setBrownRule(this.shapeFactory.createAnnealRule())
            }

            if (automata.getGeneration() === 35) {

            }
            else if (automata.getGeneration() === 120) {
                  automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
                //   automata.setGrayRule(this.shapeFactory.createLifeRule())
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
                //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());
                //   this.setGreenRule(this.shapeFactory.MazectricWithMice());
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule());
                //   this.setBlueRule(this.shapeFactory.createDiamoebaRule())
            }

            else if (automata.getGeneration() === 45) {
                automata.setGreenRule(this.shapeFactory.createCoralRule());
                //   this.setGrayRule(this.shapeFactory.createWalledCityRule())
                //   this.setRedRule(this.shapeFactory.MazectricWithMice());
                //   this.setGreenRule(this.shapeFactory.createCoralRule());
                //   this.setBrownRule(this.shapeFactory.createDiamoebaRule());

            }
            automata.dibujarMatriz(automata.getMatrizActiva())

            // tthis.matrizSiguiente(this.cube.getMatrizActiva())
            automata.setMatrizActiva(automata.matrizSiguiente(automata.getMatrizActiva()))
        }




    }

}