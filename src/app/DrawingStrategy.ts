import { Cube as Automata } from "cube";


export interface DrawingStrategy {
    draw(automata: Automata, matriz: { state: number, color: string }[][]): void;
}