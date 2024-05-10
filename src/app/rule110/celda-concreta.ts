import { Celda } from "./celda";

export class CeldaConcreta implements Celda{
    state: number;

    getState(): number {
        return this.state;
    }
    setState(state: number): void {
        this.state = state;
    }

}
