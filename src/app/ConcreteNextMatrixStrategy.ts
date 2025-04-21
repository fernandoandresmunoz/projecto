import { Automata } from 'cube';
import { NextMatrixStrategy } from './NextMatrixStrategy';


// este codigo no deberia cambiarlo entonces, porque esta funcionando y es mejor crear otra clase para el proposito que quiero.
// no deberia estar cambiando los otros automatas. deberia volver al estado anterior .
// deberia ser capaz de volver a implementar el mismo automata. pero desde un factory de automatas nuevo que pueda setear las reglas
// y como tiene que avanzar esa regla
export class ConcreteNextMatrixStrategy implements NextMatrixStrategy {

    automata: Automata;
    counter = 0;

    constructor(automata: Automata) {
        this.automata = automata;
    }

    nextMatrix(matriz: {  state: number; color: string; }[][]): { state: number; color: string; }[][] {
        const nuevaMatriz = [...matriz];


        for (let fila = 0 ; fila < matriz.length; fila ++) {
            for (let columna = 0; columna < matriz[0].length ; columna ++) {

                    const vivas: {state: number, color: string}[] = this.automata.calculateAliveNeighbors(nuevaMatriz, fila, columna);

                    const vecinosVerdes =  vivas.filter( obj => obj.color === 'Green').length;
                    const vecinosRojos =  vivas.filter( obj => obj.color === 'Red').length;
                    const vecinosAzules =  vivas.filter( obj => obj.color === 'Blue').length;
                    const vecinosGrises = vivas.filter( obj => obj.color === 'Gray').length;
                    const vecinosCafes = vivas.filter( obj => obj.color === 'Brown').length;



                    // es decir la celula esta viva
                    if (nuevaMatriz[fila][columna].state == 1) {

                        // lo que mas tiene son vecinos rojos
                        // o sea si soy verde y tengo vecinos rojos mi condicion depende de los vecinos rojos
                        // tengo que escribir otra vez esta clase como creo que deberia ser pero en una clase nueva
                        if (vecinosRojos > vecinosGrises && vecinosRojos > vecinosVerdes && vecinosRojos > vecinosCafes  && vecinosRojos > vecinosAzules) {
                            const redRule = this.automata.getRedRule();
                            if (redRule && redRule.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }
                        }

                        // lo que mas tiene son vecinos cafes
                        else if (vecinosCafes > vecinosGrises && vecinosCafes > vecinosVerdes && vecinosCafes > vecinosRojos && vecinosCafes > vecinosAzules) {
                            const brownRule = this.automata.getBrownRule();
                            if (brownRule && brownRule.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }

                        }

                        // es decir, lo que mas tiene son vecinos azules
                        else if ( vecinosAzules > vecinosGrises && vecinosAzules > vecinosVerdes ) {
                            const blueRule = this.automata.getBlueRule();
                            if (blueRule && blueRule.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }


                        }
                        // es decir , lo que mas tiene son vecinos grises
                        else if ( vecinosGrises > vecinosVerdes) {
                            const grayRule = this.automata.getGrayRule();
                            if (grayRule && grayRule.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }
                        }

                        // es decir lo que mas tiene son vecinos verdes
                        else {
                            const greenRule = this.automata.getGreenRule();
                            if (greenRule && greenRule.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }
                        }



                    } else if (nuevaMatriz[fila][columna].state === 0) {

                        if (vecinosRojos > vecinosGrises && vecinosRojos > vecinosVerdes && vecinosRojos > vecinosCafes && vecinosRojos > vecinosAzules ) {
                            const redRule = this.automata.getRedRule();
                            if (redRule && redRule.liveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Red';

                            }
                        }

                        else if (vecinosCafes > vecinosGrises && vecinosCafes > vecinosAzules && vecinosCafes > vecinosVerdes  ) {
                            const brownRule = this.automata.getBrownRule();
                            if (brownRule && brownRule.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Brown';


                            }
                        } else if ( vecinosAzules > vecinosGrises && vecinosAzules > vecinosVerdes) {
                            const blueRule = this.automata.getBlueRule();
                            if (blueRule && blueRule.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Blue';


                            }
                        }

                        else if ( vecinosGrises > vecinosVerdes) {
                            const grayRule = this.automata.getGrayRule();
                            if (grayRule && grayRule.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Gray';


                            }
                        }

                        else {
                            const greenRule = this.automata.getGreenRule();
                            if (greenRule && greenRule.liveCondition(vivas.length)) {
                                nuevaMatriz[fila][columna].state = 1;
                                nuevaMatriz[fila][columna].color = 'Green';


                            }
                        }

                    }
            }
        }


        this.counter = this.counter + 1;


        // if (this.counter % 10 === 0) { 
        //     console.log("Counter: " + this.counter);
        //     for ( let i = 0; i < nuevaMatriz.length; i++) {
        //         for ( let j = 0 ; j < nuevaMatriz[0].length; j++) {
        //             // console.log("Matriz[" + i + "][" + j + "] = " + nuevaMatriz[i][j].state + nuevaMatriz[i][j].color);
        //         }
        //     }
        // }




        return nuevaMatriz;



    }

}
