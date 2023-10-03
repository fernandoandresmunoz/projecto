import { GrupoCelulas } from "src/GrupoCelula";


export interface Punto {

}

export interface Circulo {

}

export interface Triangulo {
    getPuntos(): Punto[];
}

export interface Button {
    click(): void;
}

export interface Observer {
    getNotified(): void;
}

export interface Observable {
    getObservers(): Observer[];
    setObservers(observers: Observer[]): boolean;
    addObserver(observer: Observer): void;
    notifyAll(): void;
}

export interface Estado {}

export interface Arbol {
    obtenerRaiz(): GrupoCelulas;
    operation(): void;
    obtenerEstado(): Estado;
    cambiarEstado(estado: Estado): void;
}


export interface Juego {

    getArboles(): GrupoCelulas[];
    agregarArboles(nodo: GrupoCelulas): void;

}