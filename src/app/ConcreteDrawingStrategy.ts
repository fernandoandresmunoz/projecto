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


function calcularDistancia(i: number, j: number, matriz: { state: number, color: string }[][], distancia: number): number {
    // return todosMisVecinosSonCafes()
    let salida = 0
    for (let i = distancia; i < 1; i--) {
        if (todosMisVecinosSonCafes(i, j, matriz, distancia)) {
            return distancia
        }
    }
    return 0
}


function obtenerAltura(regla: string, automata: Automata): number {

    switch (regla) {
        case 'Red':
           return automata.altura_regla_1;
        case 'Blue':
            return automata.altura_regla_2;    
        case 'Green':
            return automata.altura_regla_3;   

        case 'Brown':
            return automata.altura_regla_4;
        case 'Gray':
            return automata.altura_regla_5;
        default:
            return 2;
    }

}

export class ConcreteDrawingStrategy implements DrawingStrategy {

    mapa = new Map();

    constructor() {

        this.mapa.set("Green", 3)
        this.mapa.set("Red", 3)
        this.mapa.set("Brown", 3)
        this.mapa.set("Gray", 3)
        this.mapa.set("Blue", 0)
    }

    draw(automata: Automata, matriz: { state: number; color: string; }[][]): void {
        automata.clean();
        if (matriz === undefined) return

        const matrizAuxiliar = [...matriz];

        for (let x = 0; x < matrizAuxiliar.length; x++) {
            matrizAuxiliar[x] = matrizAuxiliar[x].slice().reverse();
        }

        for (let i = 0; i < matrizAuxiliar.length; i++) {
            for (let j = 0; j < matrizAuxiliar[i].length; j++) {

                const celda = matrizAuxiliar[i][j]

                if (celda.state >= 1) {

                    // const altura = this.mapa.get(celda.color);
                    // const altura = this.mapa.get(celda.color);
                    const altura = obtenerAltura(celda.color, automata);
                    automata.crearBloque(
                        { state: celda.state, color: celda.color },
                        altura
                        
                        );

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