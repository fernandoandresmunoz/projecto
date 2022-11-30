import { Cube as IAutomata } from "cube";
import { NextMatrixStrategy } from "./NextMatrixStrategy";


export class ConcreteNextMatrixStrategy implements NextMatrixStrategy {

    automata: IAutomata;

    constructor(automata: IAutomata) {
        this.automata = automata;
    }

    nextMatrix(matriz: {  state: number; color: string; }[][]): { state: number; color: string; }[][] {
        let nuevaMatriz = [...matriz];

       
        for (let fila = 0 ; fila < matriz.length; fila ++) {
            for (let columna = 0; columna < matriz[0].length ; columna ++) {

                    const vivas: {state: number, color: string}[] = this.automata.calculateAliveNeighbors(nuevaMatriz, fila, columna);

                    const vecinosVerdes =  vivas.filter( obj => obj.color === 'Green').length
                    const vecinosRojos =  vivas.filter( obj => obj.color === 'Red').length
                    const vecinosAzules =  vivas.filter( obj => obj.color === 'Blue').length
                    const vecinosGrises = vivas.filter( obj => obj.color ==='Gray').length
                    const vecinosCafes = vivas.filter( obj => obj.color ==='Brown').length

                    if (nuevaMatriz[fila][columna].state == 1) {

                        if (vecinosRojos > vecinosGrises && vecinosRojos> vecinosVerdes && vecinosRojos > vecinosCafes  && vecinosRojos > vecinosAzules) {
                            if (this.automata.getRedRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }
                        } 

                        else if (vecinosCafes > vecinosGrises && vecinosCafes > vecinosVerdes && vecinosCafes > vecinosRojos && vecinosCafes > vecinosAzules) {
                            if (this.automata.getBrownRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }

                        }

                        else if ( vecinosAzules > vecinosGrises && vecinosAzules > vecinosVerdes ) {
                            if (this.automata.getBlueRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }


                        }
                        else if ( vecinosGrises > vecinosVerdes) {
                            if ( this.automata.getGrayRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0
                            }
                        }

                        else {
                            if (this.automata.getGreenRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }
                        }

                        

                    } else if (nuevaMatriz[fila][columna].state === 0) {

                        if (vecinosRojos > vecinosGrises && vecinosRojos > vecinosVerdes && vecinosRojos > vecinosCafes && vecinosRojos > vecinosAzules ) {

                            if (this.automata.getRedRule()?.liveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Red'

                            }
                        }

                        else if (vecinosCafes > vecinosGrises && vecinosCafes > vecinosAzules && vecinosCafes > vecinosVerdes  ) {
                            if (this.automata.getBrownRule()?.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Brown'


                            }
                        } else if ( vecinosAzules > vecinosGrises && vecinosAzules > vecinosVerdes) {
                            if (this.automata.getBlueRule()?.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Blue'


                            }
                        }

                        else if ( vecinosGrises > vecinosVerdes) {
                            if (this.automata.getGrayRule()?.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Gray'


                            }
                        }

                        else {
                            if (this.automata.getGreenRule()?.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Green'


                            }
                        }

                    }
            }
        }
    
       
        return nuevaMatriz;



    }

}