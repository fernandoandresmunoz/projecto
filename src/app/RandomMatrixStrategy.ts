import { Automata } from "cube";


export interface MatrixCreationStrategy {
    create(automata: Automata) : { state: number, color: string }[][];
}