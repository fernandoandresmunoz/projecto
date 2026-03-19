import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from "cube";
import { ShapeFactory } from "shapeFactory";
import { NextGenStrategy } from "./NextGenStrategy";


export class ConcreteNextGenStrategy implements NextGenStrategy {

    shapeFactory: ShapeFactory = new ConcreteShapeFactory();

    nextGeneration(automata: Automata): void {


        // let GENERATION = automata.getGeneration();

        // console.log("LA GENERACION ACTUAL ES ", GENERATION)
        // console.log("MAR", automata.porcentajeAzules())
        // console.log("TIERRA CLARA", automata.porcentajeCafes())
        // console.log("TIERRA OSCURA", automata.porcentajeGrises())
        // console.log("VEGETACION", automata.porcentajeVerdes())
        // console.log("LAVA", automata.porcentajeRojos())


        if (automata.porcentajeVerdes() < 0.04) {
            automata.setGreenRule(this.shapeFactory.createLifeWithoutDeathRule())
        } else if (automata.porcentajeVerdes() < 0.2) {
            automata.setGreenRule(this.shapeFactory.createCoralRule())
        } else if (automata.porcentajeVerdes() > 0.5) {
            automata.setGreenRule(this.shapeFactory.createDayAndNightRule())
        } else if (automata.porcentajeVerdes() > 0.6) {
            automata.setGreenRule(this.shapeFactory.createMorleyRule())
        }



        if (automata.porcentajeAzules() < 0.05) {
            automata.setBlueRule(this.shapeFactory.createReplicatorRule())
        } else if (automata.porcentajeAzules() > 0.2 && automata.porcentajeAzules() < 0.3) {
            automata.setBlueRule(this.shapeFactory.createAnnealRule())
        } else if (automata.porcentajeAzules() < 0.2) {
            automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
        } else if (automata.porcentajeAzules() > 0.3) {
            automata.setBlueRule(this.shapeFactory.createMorleyRule())
        }



        if (automata.porcentajeCafes() < 0.02) {
            automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule())
        }
        else if (automata.porcentajeCafes() < 0.05) {
            automata.setBrownRule(this.shapeFactory.createLifeWithoutDeathRule())
        } else if (automata.porcentajeCafes() > 0.3) {
            automata.setBrownRule(this.shapeFactory.createCoagulationRule())
        } else if (automata.porcentajeCafes() > 0.5) {
            automata.setBrownRule(this.shapeFactory.createCoagulationRule())
        }

        ///// GRISES 

        if (automata.porcentajeGrises() < 0.05) {
            automata.setGrayRule(this.shapeFactory.createLifeWithoutDeathRule())
        } else if (automata.porcentajeGrises() > 0.4) {
            automata.setGrayRule(this.shapeFactory.createMorleyRule())
        } else if (automata.porcentajeGrises() >= 0.05 && automata.porcentajeGrises() < 0.08) {
            automata.setGrayRule(this.shapeFactory.createWalledCityRule())
        }


        if (automata.porcentajeRojos() < 0.02) {
            automata.setRedRule(this.shapeFactory.createReplicatorRule())
        }
        else if (automata.porcentajeRojos() < 0.05) {
            if (automata.getGeneration() > 100) {
                automata.setRedRule(this.shapeFactory.MazeWithMice())
            } else {
                automata.setRedRule(this.shapeFactory.createReplicatorRule())
            }
        } else if (automata.porcentajeRojos() > 0.3 && automata.porcentajeRojos() < 0.5) {
            automata.setRedRule(this.shapeFactory.createDayAndNightRule())
        } else if (automata.porcentajeRojos() > 0.5) {
            automata.setRedRule(this.shapeFactory.createMorleyRule())
        }






        // if (GENERATION > 120) {
        //     if (automata.porcentajeAzules() < 0.16) {
        //         automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
        //         // automata.setBrownRule(this.shapeFactory.createDayAndNightRule())
        //         automata.setGrayRule(this.shapeFactory.createDiamoebaRule())
        //         automata.setBrownRule(this.shapeFactory.createDiamoebaRule())
        //         automata.setRedRule(this.shapeFactory.createDiamoebaRule())
        //     }
        // }
        // if (automata.porcentajeAzules() > 0.33 && GENERATION > 100) {
        //     automata.setBlueRule(this.shapeFactory.createReplicatorRule())
        //     automata.setBrownRule(this.shapeFactory.createMazeRule())
        //     automata.setGrayRule(this.shapeFactory.createWalledCityRule())
        //     automata.setRedRule(this.shapeFactory.createMazeRule())
        // }
        // switch (GENERATION) {
        //     case 50:
        //         automata.setBlueRule(this.shapeFactory.createReplicatorRule())
        //         automata.setBrownRule(this.shapeFactory.createReplicatorRule())
        //         automata.setRedRule(this.shapeFactory.createReplicatorRule())
        //         automata.setGrayRule(this.shapeFactory.createReplicatorRule())
        //         automata.setGreenRule(this.shapeFactory.createCoralRule())
        //         automata.setGrayRule(this.shapeFactory.createWalledCityRule())
        //         break;
        //     case 70:
        //         automata.setBlueRule(this.shapeFactory.createReplicatorRule())
        //         automata.setRedRule(this.shapeFactory.createAnnealRule())

        //         break;

        //     case 100:
        //         automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
        //         automata.setBrownRule(this.shapeFactory.MazeWithMice())
        //         automata.setRedRule(this.shapeFactory.createMazeRule())
        //         automata.setGrayRule(this.shapeFactory.createLifeWithoutDeathRule())
        //         automata.setBlueRule(this.shapeFactory.createDiamoebaRule())
        //         break;

        //     case 120:
        //         automata.setBlueRule(this.shapeFactory.createReplicatorRule());
        //         break;

        //     case 200:
        //         break;

        //      case 280:
        //         break;

        //     default:
        //         break;
        // }
    }
}