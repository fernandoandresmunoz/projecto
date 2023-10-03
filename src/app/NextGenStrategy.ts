import {  Automata } from "cube";


export interface NextGenStrategy {
    nextGeneration(automata: Automata): void;
}