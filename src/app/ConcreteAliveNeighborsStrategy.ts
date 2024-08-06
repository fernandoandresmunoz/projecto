import { AliveNeighborsStrategy } from "./AliveNeighborsStrategy";


export class ConcreteAliveNeighborsStrategy implements AliveNeighborsStrategy {
    calculate(nuevaMatriz: { state: number; color: string; }[][], fila: number, columna: number): { state: number; color: string; }[] {
        
        let vecinos : {state: number, color: string}[] = [];
        let vivas = 0;

        let filaAnterior = fila - 1
        let filaSiguiente = fila + 1

        let columnaAnterior = columna - 1
        let columnaSiguiente = columna + 1

        if (filaAnterior < 0) {
            filaAnterior = nuevaMatriz.length - 1
        }
        if (filaSiguiente > nuevaMatriz.length - 1) {
            filaSiguiente = 0
        }

        if (columnaAnterior < 0 ) {
            columnaAnterior = nuevaMatriz[0].length - 1
        }
        if (columnaSiguiente > nuevaMatriz[0].length  - 1) {
            columnaSiguiente = 0
        }

        if (nuevaMatriz[filaAnterior][columnaAnterior].state === 1) {
            vivas += 1

            vecinos.push(nuevaMatriz[filaAnterior][columnaAnterior]);

        }
        if ( nuevaMatriz[filaAnterior][columna].state == 1) {
            vivas += 1

            vecinos.push(nuevaMatriz[filaAnterior][columna])

        }
        if ( nuevaMatriz[filaAnterior][columnaSiguiente]?.state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[filaAnterior][columnaSiguiente])
        }
        if ( nuevaMatriz[fila][columnaAnterior].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila][columnaAnterior])
        }
        if (nuevaMatriz[fila][columnaSiguiente]?.state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila][columnaSiguiente])
        }
        if (nuevaMatriz[filaSiguiente][columnaAnterior].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[filaSiguiente][columnaAnterior])
        }
        if (nuevaMatriz[filaSiguiente][columna].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[filaSiguiente][columna])
        }
        if ( nuevaMatriz[filaSiguiente][columnaSiguiente]?.state == 1) {

            vivas += 1
            vecinos.push(nuevaMatriz[filaSiguiente][columnaSiguiente])
        }

        return vecinos;



    }

}