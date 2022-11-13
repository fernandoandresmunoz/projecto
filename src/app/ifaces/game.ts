import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Cube } from "cube";
import { throwError } from "rxjs";



export interface Nodo {
    addChild(nodo: Nodo): void;
    getChildren(): Nodo[];
    operation(): void;
    setAutomata(automata: Cube): void;
    getAutomata(): Cube;
    average(): number;
    allDiamoeba(): void;
    replicator(): void;
    getState(umbralInferior: number, umbralSuperior: number): string;
    setState(state: string): void;
    initialize(): void;
    avanzarUnaGeneracion(): void;
    setAutomatas(): void;
    agregarHijos(): void;
    agregarHojas(): void;

    azules(): number;
    cafes(): number;
    grises(): number;
    rojos(): number;
    verdes(): number;

}

export class GrupoCelulas implements Nodo {
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
            this.addChild(this.factory.crearCelula());
            this.addChild(this.factory.crearCelula());
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
            return 'lightgray'
        }

        const criticals = this.getChildren().filter(obj => obj.getState(umbralInferior, umbralSuperior) === 'red').length > 0;
        if (criticals) {
            return 'red'
        } else {

            const warnings = this.getChildren().filter(obj => obj.getState(umbralInferior, umbralSuperior) === 'yellow').length > 0;
            if (warnings) {
                return 'yellow'
            } else {
                return 'green'
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
    setAutomata(automata: Cube): void {
        throw new Error("Method not implemented.");
    }
    getAutomata(): Cube {
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


export class Celula implements Nodo {

    automata: Cube;
    factory = new ConcreteShapeFactory();
    constructor() {
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
        this.setAutomata(this.factory.createMilitaryCube() )
    }
    avanzarUnaGeneracion(): void {
        this.getAutomata().avanzarUnaGeneracion();
    }
    initialize(): void {
        const f = new ConcreteShapeFactory();
        
        this.setAutomata(f.createMilitaryCube())
        
    }
    getState(umbralInferior: number, umbralSuperior: number): string {

        if ( this.getAutomata().densidad() < umbralInferior) {
            return 'red'
        } else if ( this.getAutomata().densidad() >= umbralInferior && this.getAutomata().densidad() < umbralSuperior) {
            return 'yellow'
        } 
        return 'green'
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
            console.log('automata ', this.getAutomata().densidad())
    }
    setAutomata(automata: Cube): void {
        this.automata = automata;
    }
    getAutomata(): Cube {
        return this.automata;
    }

}


export class Factory {
    crearCelula(): Nodo {
        return new Celula();
    }
    crearGrupoCelula(): Nodo {
        return new GrupoCelulas();
    }

    crearArbol2(): Nodo {
        let a = this.crearGrupoCelula();
        let b = this.crearGrupoCelula();
        let c = this.crearGrupoCelula();
        a.addChild(b);
        a.addChild(c)
        let d = this.crearCelula();
        // a.agregarHijos();
        // a.agregarHijos();
        // a.agregarHijos();
        // a.agregarHijos();
        a.agregarHijos();
        // a.agregarHijos();
        // a.agregarHijos();
        a.agregarHojas();
        return a;
    }

    crearArbol3(): Nodo {
        let x = this.crearArbol2();

        return x;
    }



    
}



export interface Game {
    nodos:  Nodo[]
    getUmbralBajo(): number;
    setUmbralBajo(umbralBajo: number): void;
    getUmbralAlto(): number;
    setUmbralAlto(umbralAlto: number): void;


}

export class Juego {
    raiz: Nodo;
}