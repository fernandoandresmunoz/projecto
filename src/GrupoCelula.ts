import Automata from "concreteCube";
import { Factory } from "./app/ifaces/game";
import { JUEGO } from "./JUEGO";
import { Nodo } from "./Nodo";

export class GrupoCelulas implements Nodo {
    totalBloques(): number {
        throw new Error("Method not implemented.");
    }
    getColor(): string {
        throw new Error("Method not implemented.");
    }

    hojas: Nodo[] = [];

    getHojas(): Nodo[] {
        return this.hojas;
    }

    azules(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.azules();
        })

        return suma / children.length
    }
    cafes(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.cafes();
        })

        return suma / children.length
    }
    grises(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.grises();
        })

        return suma / children.length
    }
    rojos(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.rojos();
        })

        return suma / children.length
    }
    verdes(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.verdes();
        })

        return suma / children.length
    }
    factory = new Factory();
    agregarHojas(): void {

        if (this.getChildren().length === 0) {
            for (let i = 0; i < JUEGO.HOJAS_POR_RAMA; i++) {
                let celula = this.factory.crearCelula()
                this.hojas.push(celula)
                this.addChild(celula);
            }
        } else {
            this.getChildren().map(obj => obj.agregarHojas());
        }
    }

    agregarHijos(): void {
        if (this.getChildren().length === 0) {

            this.addChild(this.factory.crearGrupoCelula())
            this.addChild(this.factory.crearGrupoCelula())
        } else {
            this.getChildren().map( obj => obj.agregarHijos());
        }
    }
    setAutomatas(): void {
        this.getChildren().map( obj => obj.setAutomatas());
    }
    avanzarUnaGeneracion(): void {
        this.getChildren().map( obj => obj.avanzarUnaGeneracion());
    }
    initialize(): void {
        this.getChildren().map( obj => obj.initialize());
    }
    getState(umbralInferior: number, umbralSuperior: number): string {

        if (this.getChildren().length === 0 ) {
            return JUEGO.UNKWON_STATE_COLOR;
        }

        const criticals = this.getChildren().filter(obj => obj.getState(umbralInferior, umbralSuperior) ===  JUEGO.DANGER_COLOR).length > 0;
        if (criticals) {
            return JUEGO.DANGER_COLOR;
        } else {

            const warnings = this.getChildren().filter(obj => obj.getState(umbralInferior, umbralSuperior) ===JUEGO.WARNING_COLOR).length > 0; if (warnings) {
                return JUEGO.WARNING_COLOR;
            } else {
                return JUEGO.OK_COLOR;
            }
        }
    }
    setState(state: string): void {
        throw new Error("Method not implemented.");
    }
    replicator(): void {
        this.children.map( obj => obj.replicator())
    }
    allDiamoeba(): void {
        this.children.map( obj => obj.allDiamoeba())
    }
    average(): number {
        let suma = 0;
        this.children.map( child => {
            suma += child.average();
        })
        return suma / this.getChildren().length;
    }
    setAutomata(automata: Automata): void {
        throw new Error("Method not implemented.");
    }
    getAutomata(): Automata {
        throw new Error("Method not implemented.");
    }
    children: Nodo[] = [];

    addChild(nodo: Nodo): void {
        this.children.push(nodo);
    }
    getChildren(): Nodo[] {
        return this.children;
    }
    operation(): void {
        for ( let child of this.children) {
            child.operation();
        }
    }
}