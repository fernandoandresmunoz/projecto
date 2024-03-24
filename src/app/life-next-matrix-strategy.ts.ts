import { Automata } from "cube";
import { NextMatrixStrategy } from "./NextMatrixStrategy";


// este codigo no deberia cambiarlo entonces, porque esta funcionando y es mejor crear otra clase para el proposito que quiero.
// no deberia estar cambiando los otros automatas. deberia volver al estado anterior . 
// deberia ser capaz de volver a implementar el mismo automata. pero desde un factory de automatas nuevo que pueda setear las reglas 
// y como tiene que avanzar esa regla 
export class LifeNextMatrixStrategy implements NextMatrixStrategy {

    automata: Automata;

    constructor(automata: Automata) {
        this.automata = automata;
    }

    nextMatrix(matriz: {  state: number; color: string; }[][]): { state: number; color: string; }[][] {
        let nuevaMatriz = [...matriz];

       
        for (let fila = 0 ; fila < matriz.length; fila ++) {
            for (let columna = 0; columna < matriz[0].length ; columna ++) {

                    const vivas: {state: number, color: string}[] = this.automata.calculateAliveNeighbors(matriz, fila, columna);


                    // es decir la celula esta viva 
                    if (matriz[fila][columna].state == 1) {

                        // lo que mas tiene son vecinos rojos 
                        // o sea si soy verde y tengo vecinos rojos mi condicion depende de los vecinos rojos
                        // tengo que escribir otra vez esta clase como creo que deberia ser pero en una clase nueva 
                            if (this.automata.getGrayRule()?.surviveCondition(vivas.length)) {

                                nuevaMatriz[fila][columna].state = 1;
                            } else {
                                nuevaMatriz[fila][columna].state = 0;
                            }

                        // es absurdo, si soy verde y tengo mas vecinos rojos me voy a comportar como un verde ? 

                        // lo que mas tiene son vecinos cafes 
                    } else if (matriz[fila][columna].state === 0) {


                        if (this.automata.getGrayRule()?.liveCondition(vivas.length)) {

                            nuevaMatriz[fila][columna].state = 1;
                            nuevaMatriz[fila][columna].color = 'Gray'

                        }
                    }
            }
        }
    
       
        return nuevaMatriz;



    }

}