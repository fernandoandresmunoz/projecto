import { Function as Funcion } from "./function";
import { Lienzo } from "./lienzo";


export class LienzoConcreto implements Lienzo{
    getFunciones2(): ((x: number) => number)[] {
        return this.funciones2;
    }
    agregarFuncion2(f: (x: number) => number): void {
        this.funciones.push(f);
    }


    funciones2 : ( (x: number ) => number )[] = []
    funciones: Funcion[] = [];
    ancho: number = 800 ;
    largo: number = 800;
    color: string = 'cyan'

    desdeX: number;
    hastaX: number;
    desdeY: number;
    hastaY: number;
    background: string;
    title: string;


    setDesdeX(desdeX: number): void {
        this.desdeX = desdeX
    }
    setHastaX(hastaX: number): void {
        this.hastaX = hastaX;
    }
    setDesdeY(desdeY: number): void {
        this.desdeY = desdeY;
    }
    setHastaY(hastaY: number): void {
        this.hastaY = hastaY
    }
    getDesdeX(): number {
        return this.desdeX
    }
    getHastaX(): number {
        return this.hastaX
    }
    getDesdeY(): number {
        return this.desdeY
    }
    getHastaY(): number {
        return this.hastaY
    }
    setBackground(color: string): void {
        this.background = color;
    }
    getBackground(): string {
        return this.background
    }
    getTitle(): string {
        return this.title
    }
    setTitle(title: string): void {
        this.title = title
    }
    getAncho(): number {
        return this.ancho;
    }
    getLargo(): number {
        return this.largo;
    }
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
