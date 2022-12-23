import { Cube as Automata } from "cube";


export interface NextGenStrategy {
    nextGeneration(automata: Automata): void;
}