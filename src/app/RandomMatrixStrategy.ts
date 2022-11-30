import { Cube as Automata } from "cube";


export interface RandomMatrixStrategy {
    create(automata: Automata) : { state: number, color: string }[][];
}