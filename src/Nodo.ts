import { Automata } from "cube";

export interface Nodo {
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

    totalBloques(): number;

    azules(): number;
    cafes(): number;
    grises(): number;
    rojos(): number;
    verdes(): number;


    getHojas(): Nodo[];
    getColor(): string;

}