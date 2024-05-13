import { Binary } from "@angular/compiler";
import { Celda } from "./celda";
import { Fila } from "./fila";

export interface ControladorFila {
// encender y apagar celdas 
    init(regla: number): void;
    encenderCelda(indice: number): void;
    apagarCelda(indice: number): void;
    toggleCelda(indice: number): void;

    encenderTodasLasCeldas():  void;
    apagarTodasLasCeldas(): void;

    obtenerEstadoCelda(indice: number): number;
    setearRegla(regla: number): void;
    agregarCelda(celda: Celda): void;

    calcularSiguienteGeneracion(): Fila;
    calcularSiguienteCelda(indice: number): Celda;
    armarFilaSiguiente(): Fila;
    calcularEstadoSiguiente(celda: Celda, fila: Fila): void;
    calcularEstadoSiguiente(indice: number): number;
    calcularSiguienteEstadoCelda(indice: number): number;
    obtenerTodasLasFilas(): Fila[];

    toggleCeldas(): Fila;
    toggleCeldas(): void;
    // inicializa con estados cero |
    inicializar(longitud: number): void;
    inicializarRandom(longitud: number): void;
    getModel(): Fila;
    setModel(fila: Fila): void;
    getRegla(): number;

    getActiveIndex(): number;
    incrementIndex(): void;
    decrementIndex(): void;

    getRuleBinary(): number;
    getCeldas(): Celda[];

    getEstadoCeldaActiva(fila: Fila, index: number): number;
    getEstadoCeldaAnteriorActiva(fila: Fila, index: number): number;
    getEstadoCeldaSiguienteActiva(fila: Fila, index: number): number;


    getEstadoByIndex(index: number): number;
    getEstadoSiguienteByIndex(index: number): number;

    getRuleAsList(): number[];
    getNewStateList(): string[][];
    getEstadoSiguiente(fila: Fila, index: number): string;
    filaSiguiente(fila: Fila): Fila;

    matrixCompleta(): Fila[];
    getDebug(): boolean;
    setDebug(debug: boolean): void;

    incrementRule(): void;
    decrementRule(): void;
    

 
}
