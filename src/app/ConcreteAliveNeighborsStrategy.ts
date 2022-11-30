import { AliveNeighborsStrategy } from "./AliveNeighborsStrategy";


export class ConcreteAliveNeighborsStrategy implements AliveNeighborsStrategy {
    calculate(nuevaMatriz: { state: number; color: string; }[][], fila: number, columna: number): { state: number; color: string; }[] {
        
        let vecinos : {state: number, color: string}[] = [];
        let vivas = 0;
        if (fila > 0 && columna > 0 && nuevaMatriz[fila - 1][columna - 1].state === 1) {
            vivas += 1

            vecinos.push(nuevaMatriz[fila-1][columna - 1]);

        }
        if (fila > 0 && nuevaMatriz[fila - 1][columna].state == 1) {
            vivas += 1

            vecinos.push(nuevaMatriz[fila-1][columna])

        }
        if (fila > 0 && nuevaMatriz[fila - 1][columna + 1]?.state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila - 1][columna + 1])
        }
        if (columna > 0 && nuevaMatriz[fila][columna - 1].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila][columna - 1])
        }
        if (columna < nuevaMatriz[fila].length && nuevaMatriz[fila][columna + 1]?.state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila][columna + 1])
        }
        if (fila < nuevaMatriz.length - 1 && columna > 0 && nuevaMatriz[fila + 1][columna - 1].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila + 1][columna - 1])
        }
        if (fila < nuevaMatriz.length - 1 && nuevaMatriz[fila + 1][columna].state == 1) {
            vivas += 1
            vecinos.push(nuevaMatriz[fila + 1][columna])
        }
        if (fila < nuevaMatriz.length - 1 && columna < nuevaMatriz[fila + 1].length &&
            nuevaMatriz[fila + 1][columna + 1]?.state == 1) {

            vivas += 1
            vecinos.push(nuevaMatriz[fila + 1][columna + 1])
        }

        return vecinos;



    }

}