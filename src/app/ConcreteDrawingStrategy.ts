import {  Automata } from "cube";
import { DrawingStrategy } from "./DrawingStrategy";


// son cafes y estan vivos
function todosMisVecinosSonCafes(i: number, j: number, matrizAuxiliar: {state: number, color: string}[][], distancia: number): boolean  {
    return matrizAuxiliar[i ][j - distancia].color === 'Brown' && matrizAuxiliar[i][j - distancia].state >= 1  &&
        matrizAuxiliar[i + distancia][j - distancia].color === 'Brown' && matrizAuxiliar[i + distancia][j - distancia].state >= 1 &&

        matrizAuxiliar[i - distancia][j -distancia ].color === 'Brown' && matrizAuxiliar[i - distancia][j -distancia].state >= 1 &&
        matrizAuxiliar[i - distancia][j].color === 'Brown' && matrizAuxiliar[i - distancia][j].state >= 1 &&
        matrizAuxiliar[i + distancia][j].color === 'Brown' && matrizAuxiliar[i + distancia][j].state >= 1 &&
        matrizAuxiliar[i - distancia][j + distancia].color === 'Brown' && matrizAuxiliar[i - distancia][j + distancia].state >= 1 &&
        matrizAuxiliar[i][j + distancia].color === 'Brown' && matrizAuxiliar[i][j + distancia].state >= 1 &&
        matrizAuxiliar[i + distancia][j + distancia].color === 'Brown' && matrizAuxiliar[i + distancia][j + distancia].state >= 1 &&
        matrizAuxiliar[i][j].color === 'Brown' && matrizAuxiliar[i][j].state >= 1  



                        // matrizAuxiliar[i- 1][j ].state >= 1  &&
                        // matrizAuxiliar[i +1][j].state >= 1  &&
                        // matrizAuxiliar[i - 1][j + 1].state >= 1  &&
                        // matrizAuxiliar[i][j + 1].state >= 1  &&
                        // matrizAuxiliar[i+ 1][j + 1].state >= 1  
                        
}


function calcularDistancia(i: number, j: number, matriz: {state: number, color: string}[][],distancia:number): number {
    // return todosMisVecinosSonCafes()
    let salida = 0
    for( let i = distancia; i <   1; i --) {
        if (todosMisVecinosSonCafes(i, j, matriz , distancia) ) {
            return distancia
        }
    } 
    return 0
}

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


                    try {
                        let altura = 4;



                        if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 7) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 8) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 9) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 10) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 11)

                        ) {
                            altura = 4
                        }

                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 7) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 8) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 9) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 10)

                        ) {
                            altura = 4 
                        }

                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 7) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 8) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 9)

                        ) {
                            altura = 4 
                        }




                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 7) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 8)

                        ) {
                            altura =4 
                        }

                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 7)

                        ) {
                            altura =4 
                        }




                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 6)

                        ) {
                            altura = 4
                        }


                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 5)

                        ) {
                            altura =4 
                        }



                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 4)

                        ) {
                            altura = 4 
                        }




                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 3)

                        ) {
                            altura = 4
                        }


                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1) &&
                            todosMisVecinosSonCafes(i, j, matrizAuxiliar, 2)) {
                            altura = 4
                        }

                        else if (todosMisVecinosSonCafes(i, j, matrizAuxiliar, 1)) {
                            altura = 4
                        }

                        else if (matrizAuxiliar[i][j].color === 'Green') {
                            altura = 4
                        }

                        automata.crearBloque({ state: matrizAuxiliar[i][j].state, color: matrizAuxiliar[i][j].color }, altura);


                    } catch (error) {

                        automata.crearBloque({ state: matrizAuxiliar[i][j].state, color: matrizAuxiliar[i][j].color }, 2);
                    }


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