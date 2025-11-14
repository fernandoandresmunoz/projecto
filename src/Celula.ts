import { JUEGO } from "./JUEGO";
import { Nodo } from "./Nodo";
import { Automata } from "cube";
import ConcreteAutomata from "concreteAutomata";
import { ConcreteShapeFactory } from "concreteShapeFactory";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export class Celula implements Nodo {

    automata: Automata;
    factory = new ConcreteShapeFactory();
    umbralInferior: number;
    umbralSuperior: number;

    id: number;
    nombre: string;
    name: string;
    filas: number;
    columnas: number;
    hiddenAutomata: boolean;

    matriz_ac: number;
    automataId: number;
    desplegado: boolean;

    children: Nodo[];
    parent: Nodo;

    constructor() {
    }
    allAnneal(): void {
        this.automata.setBrownRule(this.factory.createAnnealRule())
        this.automata.setGreenRule(this.factory.createAnnealRule())
        this.automata.setRedRule(this.factory.createAnnealRule())
        this.automata.setBlueRule(this.factory.createAnnealRule())
        this.automata.setGrayRule(this.factory.createAnnealRule())
    }
    

    
    hideAutomatas(): void {
        this.hiddenAutomata = !this.hiddenAutomata;
    }

    desplegar(): void {
        this.desplegado = true;
    }
    replegar(): void {
        this.desplegado = false;
    }
    operation2(): void {
        console.log('operation # 2 ', this.nombre)
    }

    removeChildren(nodo: Nodo): void {
        throw new Error("Method not implemented.");
    }
    removeChild(nodo: Nodo): void {
        throw new Error("Method not implemented.");
    }
    getParent(): Nodo {
        return this.parent;
    }

    isLeaf(): boolean {
        return true;
    }
    totales() {
        return this.automata.totales()
    }
    getUmbralInferior(): number {
        return this.umbralInferior;
    }
    getUmbralSuperior(): number {
        return this.umbralSuperior;
    }
    getStateColor(): string {
        return this.getState(this.umbralInferior, this.umbralSuperior);
    }
    setearUmbrales(umbralInferior: number, umbralSuperior: number): void {
        this.umbralInferior = umbralInferior;
        this.umbralSuperior = umbralSuperior;
    }
    totalBloques(): number {
        if (this.automata) {
            return this.getAutomata().getBloques().length 
        }
        return 0;
    }
    getColor(): string {
        throw new Error("Method not implemented.");
    }
    getHojas(): Nodo[] {
        throw new Error("Method not implemented.");
    }
    azules(): number {
        const automata = this.getAutomata();
        if (!automata) return 0;
        return automata.totalAzules() / (automata.getFilas() * automata.getColumnas());
    }
    cafes(): number {
        const automata = this.getAutomata();
        if (!automata) return 0;
        return automata.totalCafes() / (automata.getFilas() * automata.getColumnas());
    }
    grises(): number {
        const automata = this.getAutomata();
        if (!automata) return 0;
        return automata.totalGrises() / (automata.getFilas() * automata.getColumnas());
    }
    rojos(): number {
        const automata = this.getAutomata();
        if (!automata) return 0;
        return automata.totalRojos() / (automata.getFilas() * automata.getColumnas());
    }
    verdes(): number {
        const automata = this.getAutomata();
        if (!automata) return 0;
        return automata.totalVerdes() / (automata.getFilas() * automata.getColumnas());
    }
    agregarHojas(): void {
        // throw new Error("Method not implemented.");
    }
    agregarHijos(): void {
        throw new Error("Method not implemented.");
    }
    setAutomatas(): void { // deberia ser set automata
        this.setAutomata(JUEGO.CELULA.PROJECTION === 0 ?
            this.factory.createMilitaryCube(50, 50) :
            this.factory.createMilitaryCube(50, 50))
    }
    avanzarUnaGeneracion(): void {
        const automata = this.getAutomata();
        if (automata) {
            automata.avanzarUnaGeneracion();
        }
    }
    initialize(): void {
        
        this.setAutomata(JUEGO.CELULA.PROJECTION === 0
            ? this.factory.createMilitary2(
                this.getAutomata().getFilas(),
                this.getAutomata().getColumnas())
            : this.factory.createMilitaryCube(
                this.getAutomata().getFilas(),
                this.getAutomata().getColumnas()))
        
    }
    getState(umbralInferior: number, umbralSuperior: number): string {
        const automata = this.getAutomata();
        if (!automata) return JUEGO.DANGER_COLOR;
        
        const densidad = automata.densidad();
        if (densidad < umbralInferior) {
            return JUEGO.DANGER_COLOR;
        } else if (densidad >= umbralInferior && densidad < umbralSuperior) {
            return JUEGO.WARNING_COLOR;
        } 
        return JUEGO.OK_COLOR;
    }
    setState(state: string): void {
        throw new Error("Method not implemented.");
    }
    replicator(): void {
        this.automata.setBrownRule(this.factory.createReplicatorRule());
        this.automata.setGreenRule(this.factory.createReplicatorRule());
    }

    allGeology(): void {
        this.automata.setBrownRule(this.factory.createGeologyRule())
        this.automata.setGreenRule(this.factory.createGeologyRule())
        this.automata.setRedRule(this.factory.createGeologyRule())
        this.automata.setBlueRule(this.factory.createGeologyRule())
        this.automata.setGrayRule(this.factory.createGeologyRule())

    }

    allDiamoeba(): void {
        this.automata.setBrownRule(this.factory.createDiamoebaRule())
        this.automata.setGreenRule(this.factory.createDiamoebaRule())
        this.automata.setRedRule(this.factory.createDiamoebaRule())
        this.automata.setBlueRule(this.factory.createDiamoebaRule())
        this.automata.setGrayRule(this.factory.createDiamoebaRule())
    }
    allDayAndNight(): void {
        this.automata.setBrownRule(this.factory.createDayAndNightRule())
        this.automata.setGreenRule(this.factory.createDayAndNightRule())
        this.automata.setRedRule(this.factory.createDayAndNightRule())
        this.automata.setBlueRule(this.factory.createDayAndNightRule())
        this.automata.setGrayRule(this.factory.createDayAndNightRule())

    }
    average(): number {
        const automata = this.getAutomata();
        return automata ? automata.densidad() : 0;
    }
    addChild(nodo: Nodo): void {
        throw new Error("Method not implemented.");
    }
    getChildren(): Nodo[] {
        return []
    }
    operation(): void {

        console.log('operation en hoja ', this.nombre)

        // console.log(console.log(makeid(5)), 'aqui comienza una celula ***** ***** ***** ***** ***** *********** ')
        // let id = makeid(5);
        // if (this.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR) === JUEGO.OK_COLOR) {

        // }
        // console.log('value ', this.automata.densidad())
        // let counter = 1;
        // for (let i = 0; i < this.getAutomata().getMatrizActiva().length; i++) {
        //     console.log('fila-', counter, this.getAutomata().getMatrizActiva()[i])
        //     counter += 1;
        // }
        // localStorage.setItem('celula+' + id, JSON.stringify( this.getAutomata().getBloques() ))
        // console.log(" aqui termina **************************************************************** ")
    }
    setAutomata(automata: Automata): void {
        this.automata = automata;
    }
    getAutomata(): Automata {
        return this.automata;
    }

}