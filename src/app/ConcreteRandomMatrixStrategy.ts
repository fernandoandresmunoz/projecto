import { Automata } from "cube";
import { MatrixCreationStrategy } from "./matrix-creation-strategy";


const RUINA = { state: 1, color: 'Red'}
export class ConcreteRandomMatrixStrategy implements MatrixCreationStrategy {
    create(automata: Automata): { state: number; color: string; }[][] {

        let filas = automata.getFilas();
        let columnas = automata.getColumnas();

        let salida: { state: number, color: string }[][] = []


        for (let fila = 0; fila < filas; fila++) {
            salida.push([])
            for (let columna = 0; columna < columnas; columna++) {
                    salida[fila][columna] = { state: 0, color: '' };
            }
        }

        for (let fila = 0; fila  < filas; fila++) {
            // salida.push([])
            for (let columna = 0; columna < columnas ; columna++) {
                const n = Math.floor(Math.random() * 20);

                if (n % 7 === 0) {

                    const x = Math.floor(Math.random() * 20);

                    if (x % 4 === 0) {

                        salida[fila][columna] = { state: 1, color: 'Red' }
                    }
                    else if (x % 3 === 0) {

                        salida[fila][columna] = { state: 1, color: 'Brown' }
                    }
                    else if (x % 2 === 0) {

                        salida[fila][columna] = { state: 1, color: 'Green' }
                    }
                    else if (x % 5 === 0) {

                        salida[fila][columna] = { state: 1, color: 'Gray' }
                    }
                    else {

                        salida[fila][columna] = { state: 1, color: 'Blue' }
                    }

                }
            }
        }
        return salida;



    }

}