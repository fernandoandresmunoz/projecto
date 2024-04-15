import { Matrix } from "./matrix";

export interface ControladorMatrix {


    // setear y obtener el modelo
    setMatrix(matrix: Matrix): void;
    getMatrix(): Matrix;

    getFilas(): number;
    getColumnas(): number;

    // inicializa la matriz, no tengo que pasarle el modelo, porque el controlador ya lo tiene 
    // inicializar Matriz
    inicializarMatrix(): void;

    // setear con numero aleatorios
    iniciarConNumerosAleatorios(desde: number, hasta: number): void;
    agregarFilas(filasNuevas: number): void;
    agregarColumnas(columnasNuevas: number): void;

    transpuesta(): Matrix;

}
