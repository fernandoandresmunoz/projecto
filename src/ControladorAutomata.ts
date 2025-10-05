import { Automata } from "cube";



export interface ControladorAutomata {


    setAutomata(automata: Automata): void;
    getAutomata(): Automata;

    cambiarMatriz(matrix: [][]): boolean;
    avanzarUnaGeneracion(): void;




}