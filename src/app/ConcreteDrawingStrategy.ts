import { Cube as Automata } from "cube";
import { DrawingStrategy } from "./DrawingStrategy";


export class ConcreteDrawingStrategy implements DrawingStrategy {
    draw(automata: Automata, matriz: { state: number; color: string; }[][]): void {
        automata.clean();
        if (matriz === undefined) return

        const matrizAuxiliar = [...matriz];

        for (let x = 0; x < matrizAuxiliar.length; x++) {
            matrizAuxiliar[x] = matrizAuxiliar[x].slice().reverse();
        }


        for (let i = 0; i < matrizAuxiliar.length; i++) {
            for (let j = 0; j < matrizAuxiliar[i].length; j++) {

                if (matrizAuxiliar[i][j].state >= 1) {
                    automata.crearBloque({ state: matrizAuxiliar[i][j].state, color: matrizAuxiliar[i][j].color }, 1);
                }
                automata.left();
            }
            for (let x = 0; x < matrizAuxiliar[0].length; x++) {
                automata.right();
            }
            automata.down();
        }

        for (let u = 0; u < matrizAuxiliar.length; u++) {
            automata.up();
        }



    }

}