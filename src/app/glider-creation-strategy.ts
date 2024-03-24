import { Automata } from "cube";

export class GliderCreationStrategy {
    create(automata: Automata): { state: number; color: string; }[][] {

        let filas = automata.getFilas();
        let columnas = automata.getColumnas();

        let salida: { state: number, color: string }[][] = []


        for (let fila = 0; fila < filas; fila++) {
            salida.push([])
            for (let columna = 0; columna < columnas; columna++) {
                    salida[fila][columna] = { state: 0, color: '' };
            //     if ( fila < 10 && columna < 10  ){
            //         // salida[fila][columna] = { state: 1, color: 'Gray' };
            //         // salida[fila][columna] = { state: 1, color: 'Green' };
            //     }
            // else {

            //         salida[fila][columna] = { state: 0, color: '' };
 
            // } 
           }
        }

        // salida[0][0] = { state: 1 , color: 'Gray'}
        // salida[0][1] = { state: 1 , color: 'Gray'}
        // salida[0][2] = { state: 1 , color: 'Gray'}
        // salida[1][1] = { state: 1 , color: 'Gray'}

        // salida[1][1] = { state: 1 , color: 'gray'}
        salida[11][12] = { state: 1 , color: 'Gray'}
        // salida[1][3] = { state: 1 , color: 'gray'}

        // salida[2][1] = { state: 1 , color: 'gray'}
        // salida[2][2] = { state: 1 , color: 'gray'}
        salida[12][13] = { state: 1 , color: 'Gray'}

        salida[13][11] = { state: 1 , color: 'Gray'}
        salida[13][12] = { state: 1 , color: 'Gray'}
        salida[13][13] = { state: 1 , color: 'Gray'}


        // salida[1][4] = { state: 1 , color: 'Gray'}
        // salida[1][5] = { state: 1 , color: 'Gray'}

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
