import Automata from "concreteCube";
import { ConcreteShapeFactory } from "concreteShapeFactory";
import { JUEGO } from "./JUEGO";
import { Nodo } from "./Nodo";

export class Celula implements Nodo {

    automata: Automata;
    factory = new ConcreteShapeFactory();
    constructor() {
    }
    totalBloques(): number {
        return this.getAutomata().getBloques().length 
    }
    getColor(): string {
        throw new Error("Method not implemented.");
    }
    getHojas(): Nodo[] {
        throw new Error("Method not implemented.");
    }
    azules(): number {
        return  this.getAutomata().totalAzules() / ( this.getAutomata().getFilas() * this.getAutomata().getColumnas() )
    }
    cafes(): number {

        return  this.getAutomata().totalCafes() / ( this.getAutomata().getFilas() * this.getAutomata().getColumnas() )
    }
    grises(): number {
        return  this.getAutomata().totalGrises() / ( this.getAutomata().getFilas() * this.getAutomata().getColumnas() )
    }
    rojos(): number {
        return  this.getAutomata().totalRojos() / ( this.getAutomata().getFilas() * this.getAutomata().getColumnas() )
    }
    verdes(): number {
        return  this.getAutomata().totalVerdes() / ( this.getAutomata().getFilas() * this.getAutomata().getColumnas() )
    }
    agregarHojas(): void {
        throw new Error("Method not implemented.");
    }
    agregarHijos(): void {
        throw new Error("Method not implemented.");
    }
    setAutomatas(): void {
        this.setAutomata(JUEGO.CELULA.PROJECTION === 0 ? this.factory.createMilitary2() : this.factory.createMilitaryCube())
    }
    avanzarUnaGeneracion(): void {
        this.getAutomata().avanzarUnaGeneracion();
    }
    initialize(): void {
        
        this.setAutomata(JUEGO.CELULA.PROJECTION === 0 ? this.factory.createMilitary2() : this.factory.createMilitaryCube())
        
    }
    getState(umbralInferior: number, umbralSuperior: number): string {

        if ( this.getAutomata().densidad() < umbralInferior) {
            return JUEGO.DANGER_COLOR;
        } else if ( this.getAutomata().densidad() >= umbralInferior && this.getAutomata().densidad() < umbralSuperior) {
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
    allDiamoeba(): void {
        this.automata.setBrownRule(this.factory.createDiamoebaRule())
        this.automata.setGreenRule(this.factory.createDiamoebaRule())
        // this.automata.(this.factory.createDiademaRule())
        // this.automata.setBrownRule(this.factory.createDiademaRule())
        // this.automata.setBrownRule(this.factory.createDiademaRule())
    }
    average(): number {
        return this.getAutomata().densidad();
    }
    addChild(nodo: Nodo): void {
        throw new Error("Method not implemented.");
    }
    getChildren(): Nodo[] {
        return []
    }
    operation(): void {
        if (this.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR) === JUEGO.OK_COLOR) {

            console.log('verde ', this.automata.densidad())
        }
        localStorage.setItem('sdf', this.automata.getMatrizActiva().toString())
    }
    setAutomata(automata: Automata): void {
        this.automata = automata;
    }
    getAutomata(): Automata {
        return this.automata;
    }

}