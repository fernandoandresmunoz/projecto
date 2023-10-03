import { Bloque } from "bloque";
import { Automata } from "cube";
import { Celula } from "src/Celula";

export interface Jugador {

}

export interface Player {
    getName(): string;
    setName(name: string): void;
}


export interface Juego {
    getJugadores(): Jugador[];
    agregarJugador(jugador: Jugador): void;
    addJugador(jugador: Jugador): void;
    addPlayer(player: Jugador): void;
}


// este juego es para calcular performances.
// la diferencia porcentual respecto al arbol completo es la performance
export interface Juego2 {
    getCelula(): Celula;
    getArbol(): Celula;

    // esto es calcula de performances.
    calcularDiferencia(arbol: Celula, nodo: Celula, color: string): void;

}


export interface Observer {
    getNotified(): void;
}


export interface Matriz {
    getFilas(): number[];
    addFilas(fila: number[]): void;
}

export interface VistaMatriz {
    setModelo(modelo: Matriz): void;
}


export interface VistaPlanaAutomata {
    setModel(auomata: Automata): void;
}

export interface VistaIsometricaAutomata {
    setModel(automata: Automata): void;
    crearBloques(): void;
    getBloques(): Bloque[];
}


export interface ControladorAutomata {
    setModel(modelo: Automata): void;
}


export interface ControladorArbol {
    setModel(modelo: Celula): void;
}

// 

// debería tener claro lo que tengo programado hasta que por lo menos llegue al punto y a la linea .
// tengo qeu seguir diagramando.
// puedo crear otras vistas para el codigo ya creado.


// debería tener todo diagramado.
// visio, lucidchart o papel y lapiz ( es el que prefiero por el momento, por lo menos para tener una primera aproximacion)

// no tener miedo a escribir interfaces.
// ya tengo estas clases

export interface Punto {}
export interface Linea {}

// debería hacer un diagrama de todas las clases que tengo y que estoy actualmente usando.



export interface Personaje {
    avanzar(): void;
    retroceder(): void;
    subir(): void;
    bajar(): void;
}