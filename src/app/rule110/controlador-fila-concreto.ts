import { throwError } from "rxjs";
import { Celda } from "./celda";
import { CeldaConcreta } from "./celda-concreta";
import { ControladorFila } from "./controlador-fila";
import { Fila } from "./fila";
import { FilaConcreta } from "./fila-concreta";



const REGLA = 99;



const FILAS = 200;
const COLUMNAS = 400 

export class ControladorFilaConcreto implements ControladorFila {


    incrementRule(): void {
        this.setearRegla(this.getRegla() + 1)
    }
    decrementRule(): void {
        this.setearRegla(this.getRegla() -1 )
    }

    debug = false;

    getDebug(): boolean {
        return this.debug;
    }
    setDebug(debug: boolean): void {
        this.debug = debug
    }
    matrixCompleta(): Fila[] {
        let matrix: Fila[] = [];

        matrix.push(this.getModel())
        let siguiente = this.filaSiguiente(this.getModel())

        matrix.push(siguiente)


        for (let i = 0  ; i < FILAS ; i ++) {
            let c = new ControladorFilaConcreto()
            c.setModel(siguiente)
            c.setearRegla(this.getRegla())
            siguiente = c.filaSiguiente(siguiente)
            
            matrix.push(siguiente)
        }

        return matrix;
    }
    getEstadoSiguienteByIndex(index: number): number {
        throw new Error("Method not implemented.");
    }
    getEstadoByIndex(index: number): number {
        throw new Error("Method not implemented.");
    }
    filaSiguiente(fila: Fila): Fila {

        let nuevaFila = new FilaConcreta()
        for (let i = 0 ; i < fila.getCeldas().length ; i ++) {
            let celda = new CeldaConcreta();
            celda.setState(Number( this.getEstadoSiguiente(nuevaFila, i) ))
            nuevaFila.agregarCelda(celda);
        }

        return nuevaFila;

    }
    getEstadoSiguiente(fila: Fila, index: number): string {
        let pattern = `${this.getEstadoCeldaAnteriorActiva(fila, index)}${this.getEstadoCeldaActiva(fila, index)}${this.getEstadoCeldaSiguienteActiva(fila, index)}`
        let siguiente = this.getNewStateList().filter(obj => obj[0] === pattern)
        return siguiente[0][1]
    }
    getNewStateList(): string[][] {

        const numbers = [
            "111",
            "110",
            "101",
            "100",
            "011",
            "010",
            "001",
            "000"
        ]

        if (this.getRuleAsList().length !== 8) {
            throw new Error("");

        }
        let list: string[][] = []
        let counter = 0;
        this.getRuleAsList().map(rule => {
            list.push([numbers[counter], rule.toString()])
            counter += 1;
        })

        return list;
    }
    getRuleAsList(): number[] {
        let list: number[] = []


        for (let i = 0; i < 8 - this.getRuleBinary().toString().length; i++) {
            list.push(0)
        }


        for (let n of this.getRuleBinary().toString()) {
            list.push(Number(n));
        }
        return list;
    }
    getEstadoCeldaActiva(fila: Fila, index: number): number {
        return this.getCeldas()[index].getState()
    }
    getEstadoCeldaAnteriorActiva(fila: Fila, index: number): number {
        if (index > 0)
            return this.getCeldas()[index - 1].getState()
        else {
            return this.getCeldas()[this.getCeldas().length - 1].getState()
        }
    }
    getEstadoCeldaSiguienteActiva(fila: Fila, index: number): number {
        if (index < this.getCeldas().length - 1) {
            return this.getCeldas()[index + 1].getState()
        }
        else {
            return this.getCeldas()[0].getState();
        }
    }
    getCeldas(): Celda[] {
        return this.getModel().getCeldas();
    }

    fila: Fila;
    regla: number;
    activeIndex: number = 0;



    getActiveIndex(): number {
        return this.activeIndex;
    }
    incrementIndex(): void {
        if (this.getModel().getCeldas().length - 1 > this.activeIndex)
            this.activeIndex += 1;
    }
    decrementIndex(): void {
        if (this.activeIndex > 0)
            this.activeIndex -= 1;
    }
    getRuleBinary(): number {
        return Number(this.getRegla().toString(2))
    }
    toggleCelda(indice: number): void {
        if (this.getModel().getCeldas()[indice].getState() === 1) {
            this.getModel().getCeldas()[indice].setState(0);
        } else {

            this.getModel().getCeldas()[indice].setState(1);
        }
    }

    init(regla: number): void {

        this.setModel(new FilaConcreta());
        this.inicializar(COLUMNAS)
        this.setearRegla(regla);
        this.apagarTodasLasCeldas()
        this.getCeldas()[COLUMNAS/2].setState(1)

    }
    getModel(): Fila {
        return this.fila;
    }
    setModel(fila: Fila): void {
        this.fila = fila;
    }

    getRegla(): number {
        return this.regla;
    }



    encenderCelda(indice: number): void {
        this.getModel().getCeldas()[indice].setState(1);
    }
    apagarCelda(indice: number): void {
        this.getModel().getCeldas()[indice].setState(0);
    }
    encenderTodasLasCeldas(): void {
        this.getModel().getCeldas().map(celda => celda.setState(1));
    }
    apagarTodasLasCeldas(): void {
        this.getModel().getCeldas().map(celda => celda.setState(0));
    }
    obtenerEstadoCelda(indice: number): number {
        return this.getModel().getCeldas()[indice].getState();
    }
    setearRegla(regla: number): void {
        this.regla = regla;
    }
    agregarCelda(celda: Celda): void {
        this.getModel().getCeldas().push(celda);
    }
    calcularSiguienteGeneracion(): Fila {
        throw new Error("Method not implemented.");
    }
    calcularSiguienteCelda(indice: number): Celda {
        throw new Error("Method not implemented.");
    }
    armarFilaSiguiente(): Fila {
        throw new Error("Method not implemented.");
    }
    calcularEstadoSiguiente(celda: Celda, fila: Fila): void;
    calcularEstadoSiguiente(indice: number): number;
    calcularEstadoSiguiente(celda: unknown, fila?: unknown): number | void {
        throw new Error("Method not implemented.");
    }
    calcularSiguienteEstadoCelda(indice: number): number {
        throw new Error("Method not implemented.");
    }
    obtenerTodasLasFilas(): Fila[] {
        throw new Error("Method not implemented.");
    }
    toggleCeldas(): Fila;
    toggleCeldas(): void;
    toggleCeldas(): void | import("./fila").Fila {
        this.getModel().getCeldas().map(celda => {
            if (celda.getState() === 1) {
                celda.setState(0)
            } else {
                celda.setState(1);
            }
        })
    }
    // inicializar con ceros
    inicializar(longitud: number): void {
        for (let i = 0; i < longitud; i++) {

            let celda = new CeldaConcreta()
            celda.setState(0)

            this.getModel().getCeldas().push(celda)
        }
    }
    inicializarRandom(longitud: number): void {
        throw new Error("Method not implemented.");
    }
}
