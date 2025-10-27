import Automata from "concreteAutomata";
import { Factory } from "./app/ifaces/game";
import { JUEGO } from "./JUEGO";
import { Nodo } from "./Nodo";

export class GrupoCelulas implements Nodo {
    removeChild(nodo: Nodo): void {
        this.children = this.children.filter( x => nodo !== x)
    }
    parent: Nodo;
    getParent(): Nodo {
        throw new Error("Method not implemented.");
    }
    removeChildren(nodo: Nodo): void {
        this.children = this.children.filter( x => nodo !== x)
    }
    id: number;
    nombre: string;
    name: string;

    children: Nodo[] = [];



    isLeaf(): boolean {
        return false;
    }
    totales() {
        let d = [
            {
                name: 'azul',
                total:  this.azules() * 100,
                color: 'blue'
            },
            {
                name: 'cafe',
                total: this.cafes() * 100,
                color: 'brown'
            }, {
                name: 'verdes',
                total: this.verdes() * 100,
                color: 'green'
            }, {
                name: 'rojos',
                total: this.rojos() * 100,
                color: 'red'
            }, {
                name: 'grises',
                total: this.grises() * 100,
                color: 'gray'
            },
        ]
        d.sort((a, b) => { return b.total - a.total})

        return d

    }
    getUmbralInferior(): number {
        throw new Error("Method not implemented.");
    }
    getUmbralSuperior(): number {
        throw new Error("Method not implemented.");
    }
    getStateColor(): string {
        throw new Error("Method not implemented.");
    }
    setearUmbrales(umbralInferior: number, umbralSuperior: number): void {
        this.getChildren().map( obj => obj.setearUmbrales(umbralInferior, umbralSuperior))
    }
    totalBloques(): number {
        let total = 0 
        this.getChildren().map( obj => total += obj.totalBloques())
        return total;
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

        return Number(  suma / children.length  )
    }
    cafes(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.cafes();
        })

        return Number( suma / children.length  )
    }
    grises(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.grises();
        })

        return Number( suma / children.length )
    }
    rojos(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.rojos();
        })

        return Number(  suma / children.length  )
    }
    verdes(): number {
        let suma = 0;
        const children = this.getChildren();
        children.map(obj => {
            suma += obj.verdes();
        })

        return Number( suma / children.length )
    }
    factory = new Factory();
    agregarHojas(): void {

        if (this.getChildren().length === 0) {
            for (let i = 0; i < JUEGO.HOJAS_POR_RAMA; i++) {
                let celula1 = this.factory.crearCelula()
                let celula2 = this.factory.crearCelula()
                this.hojas.push(celula1)
                this.hojas.push(celula2)
                this.addChild(celula1);
                this.addChild(celula2);
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

            const warnings = this.getChildren().filter(obj => obj.getState(umbralInferior, umbralSuperior) ===JUEGO.WARNING_COLOR).length > 0;
            if (warnings) {
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

    addChild(nodo: Nodo): void {
        nodo.parent = this
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