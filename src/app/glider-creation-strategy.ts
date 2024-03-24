import { Automata } from "cube";
import { MatrixCreationStrategy } from "./matrix-creation-strategy";

export class GliderCreationStrategy implements MatrixCreationStrategy{
    create(automata: Automata): { state: number; color: string; }[][] {

        let filas = automata.getFilas();
        let columnas = automata.getColumnas();

        let salida: { state: number, color: string }[][] = []


        for (let fila = 0; fila < filas; fila++) {
            salida.push([])
            for (let columna = 0; columna < columnas; columna++) {


                if (fila < filas && filas > 100   && columna > 100 && columna < columnas / 2) { 

                    salida[fila][columna] = { state: 1, color: 'Gray' };
                } else { 

                    salida[fila][columna] = { state: 0, color: '' };
                }

                // if ( fila < 10 && columna < 10  ){
                //     salida[fila][columna] = { state: 1, color: 'Gray' };
                //     salida[fila][columna] = { state: 1, color: 'Gray' };
                // }
            // else {

            //         salida[fila][columna] = { state: 0, color: '' };
 
            // } 
           }
        }

        salida[1][0] = { state: 1 , color: 'Gray'}
        salida[1][2] = { state: 1 , color: 'Gray'}
        salida[2][0] = { state: 1 , color: 'Gray'}
        salida[2][1] = { state: 1 , color: 'Gray'}

        salida[2][2] = { state: 1 , color: 'Gray'}
        // salida[11][12] = { state: 1 , color: 'Gray'}
        // salida[11][13] = { state: 1 , color: 'Gray'}

        // salida[12][11] = { state: 1 , color: 'Gray'}
        // salida[12][12] = { state: 1 , color: 'Gray'}
        // salida[12][13] = { state: 1 , color: 'Gray'}

        // salida[13][11] = { state: 1 , color: 'Gray'}
        // salida[13][12] = { state: 1 , color: 'Gray'}
        // salida[13][13] = { state: 1 , color: 'Gray'}


        // salida[11][14] = { state: 1 , color: 'Gray'}
        // salida[11][15] = { state: 1 , color: 'Gray'}

        // salida[3][0] = { state: 1 , color: 'Gray'}
        // salida[3][1] = { state: 1 , color: 'Gray'}
        // salida[3][2] = { state: 1 , color: 'Gray'}

        // salida[4][0] = { state: 1 , color: 'Gray'}
        // salida[4][1] = { state: 1 , color: 'Gray'}
        // salida[4][2] = { state: 1 , color: 'Gray'}

        // salida[5][0] = { state: 1 , color: 'Gray'}
        // salida[5][1] = { state: 1 , color: 'Gray'}
        // salida[5][2] = { state: 1 , color: 'Gray'}




        // for (let fila = 0; fila  < filas; fila++) {
        //     // salida.push([])
        //     for (let columna = 0; columna < columnas ; columna++) {
        //         const n = Math.floor(Math.random() * 20);

        //         if (n % 7 === 0) {

        //             const x = Math.floor(Math.random() * 20);

        //             if (x % 4 === 0) {

        //                 salida[fila][columna] = { state: 1, color: 'Red' }
        //             }
        //             else if (x % 3 === 0) {

        //                 salida[fila][columna] = { state: 1, color: 'Brown' }
        //             }
        //             else if (x % 2 === 0) {

        //                 salida[fila][columna] = { state: 1, color: 'Green' }
        //             }
        //             else if (x % 5 === 0) {

        //                 salida[fila][columna] = { state: 1, color: 'Gray' }
        //             }
        //             else {

        //                 salida[fila][columna] = { state: 1, color: 'Blue' }
        //             }

        //         }
        //     }
        // }
        return salida;



    }


}
