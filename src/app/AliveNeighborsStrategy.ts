

export  interface AliveNeighborsStrategy {
    calculate(nuevaMatriz: {state: number, color: string}[][], fila: number, columna: number): {state: number, color: string}[] ;

}