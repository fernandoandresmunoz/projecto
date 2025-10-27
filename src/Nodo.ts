import { Automata, ControladorAutomata } from "cube";



// strategy, <

// aplicar una regla en una generacion determinada.
// elemento
export interface ReglaGeneracion {

}


export interface Elemento {
    nombre: string;
    descripcion: string;
}


export interface ControladorJuego {

    controladorArbol: ControladorNodo;
    controladorAutomata: ControladorAutomata;


    cargarReglas(): void;
    obtenerReglas(): ReglaGeneracion[]; 


    agregarElemento(elemento: Elemento): void;

    crearArbol(): void;
    nuevoArbol(): void;
    obtenerControladorNodo(): ControladorNodo;


    urlSiguienteAutomata: string;
    urlAnteriorAutomata: string;

    urlSiguienteArbol: string;
    urlAnteriorArbol: string;

    cargarAutomatas(): void;

    crearAutomata(): void;
    nuevoAutomata(): void;
    editarAutomata(): void;

    crearRegla(): void;
    modificarRegla(): void;
    agregarRegla(): void;


    cargarArboles(): void;
    iniciar(): void;
    finalizar(): void;
    reiniciar(): void;
    cargarAutomata(automata: Automata): void;
    obtenerAutomatas(): Automata[];
    obtenerArboles(): Nodo[];

    getPaginaArboles(): number;
    getCurrentPageAutomatas(): number;



}


export interface Matriz {
    filas: number[];
}


export interface Juego {

}



export interface EstadoNodo {
}



export interface ControladorNodo {
    agregarHijo(hijo: Nodo): void;
    eliminarHijo(hijo:Nodo): void;
    obtenerCantidadDeHijos(): number;
    cambiarEstado(estado: EstadoNodo): void;
    operation(): void
}


export interface VistaNodo {
    mostrarHijos(): void;
    mostrarEstado(): void;
    mostrarColor(): void;
    mostrarUmbrales(): void;
    mostrarTotales(): void;
    mostrarGrafico(): void;
    mostrarTabla(): void;
    mostrarArbol(): void;
    mostrarCurva(): void;
    mostrarBarras(): void;
}



export interface Nodo {
    id: number;
    name: string;
    nombre: string;
    children: Nodo[];
    parent: Nodo;


    removeChildren(nodo: Nodo): void;
    removeChild(nodo: Nodo): void;
    getParent(): Nodo;



    addChild(nodo: Nodo): void;
    getChildren(): Nodo[];
    operation(): void;
    setAutomata(automata: Automata): void;
    getAutomata(): Automata;
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

    setearUmbrales(umbralInferior: number, umbralSuperior: number): void;

    totalBloques(): number;

    azules(): number;
    cafes(): number;
    grises(): number;
    rojos(): number;
    verdes(): number;


    getHojas(): Nodo[];
    getColor(): string;
    getStateColor(): string;
    getUmbralInferior(): number;
    getUmbralSuperior(): number;
    totales(): any;
    isLeaf(): boolean;

}

