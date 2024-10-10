import { Automata } from "cube";
import { ControladorAutomata } from "./ControladorAutomata";



export class ControladorAutomataConcreto implements ControladorAutomata {
    setAutomata(automata: Automata): void {
        throw new Error("Method not implemented.");
    }
    getAutomata(): Automata {
        throw new Error("Method not implemented.");
    }
    cambiarMatriz(matrix: [][]): boolean {
        throw new Error("Method not implemented.");
    }
    avanzarUnaGeneracion(): void {
        throw new Error("Method not implemented.");
    }

}