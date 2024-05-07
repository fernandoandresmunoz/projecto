import { Derivada } from "./derivada";

export class DerivadaConcreta implements Derivada {

    puntoX: number = 0;
    color: string = 'gray';

    constructor(puntoX: number, color: string = 'gray') {
        this.puntoX = puntoX;
        this.color = color;
    }

    getPuntoX(): number {
        return this.puntoX;
    }
    setPuntoX(puntoX: number): void {
        this.puntoX = puntoX;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string): void {
        this.color = color;
    }
}
