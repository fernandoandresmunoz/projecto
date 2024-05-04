import { Function as Funcion } from "./function";
import { Lienzo } from "./lienzo";


export class LienzoConcreto implements Lienzo{
    getAncho(): number {
        return this.ancho;
    }
    getLargo(): number {
        return this.largo;
    }
    funciones: Funcion[] = [];
    ancho: number = 800 ;
    largo: number = 800;
    color: string = 'cyan'

    agregarFuncion(funcion: Funcion): void {
        this.funciones.push(funcion);
    }
    setAncho(ancho: number): void {
        this.ancho = ancho;
    }
    setLargo(largo: number): void {
        this.largo = largo;
    }
    getFunciones(): Funcion[] {
        return this.funciones;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string): void {
        this.color = color;
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }

}
