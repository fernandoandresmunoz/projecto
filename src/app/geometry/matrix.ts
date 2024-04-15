export interface Matrix {


    // cambiar cantidad de filas y columnas 
    setFilas(filas: number): void;
    setColumnas(columnas: number): void;

    // cuantas filas y columnas tengo ?
    getFilas(): number;
    getColumnas(): number;

    getMatrix(): number[][];
    getValues(): number[][];


    // obtener la transpuesta 
    getTranspuesta(): number[][];
    getTranspuesta(): Matrix;
    // agregar cantidad de filas indicadas 
    // agrega filas o columnas inicializadas con numero ceros 
    // tengo que preguntarme que quiero hacer primero
    agregarFilas(cantidad: number): void;
    // puedo agregar cantidad de columnas indicadas
    agregarColumnas(cantidad: number): void;


    // inicializa matrix solo con numeros ceros ;
    inicilizarMatrix(filas: number, columnas: number): number[][];
    inicializarMatrixConCeros(filas: number, columnas: number): number[][];
    // inicializa la matrix con numeros aleatorios dado un rango de numeros
    inicializarConNumerosAleatorios(min: number, max: number): void;
    multiplicarPorEscalar(escalar: number): number[][];
    multiplicarPorEscalar(escalar: number): Matrix;
    sumarMatrix(matrix: number[][]): number[][];
    sumarMatrix(matrix:Matrix): Matrix;

}
