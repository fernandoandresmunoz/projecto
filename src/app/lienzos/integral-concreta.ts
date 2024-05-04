import { Integral } from './integral'

export class IntegralConcreta implements Integral {

    inicioX: number;
    finX: number;
    anchoRectangulo: number;
    color: string = '#000000';

    getInicioX(): number {
        return this.inicioX;
    }
    setInicioX(inicioX: number): void {
        this.inicioX = inicioX;
    }
    getFinX(): number {
        return this.finX;
    }
    setFinX(finX: number): void {
        this.finX = finX;
    }
    getAnchoRectangulo(): number {
        return this.anchoRectangulo;
    }
    setAnchoRectangulo(anchoRectangulo: number): void {
        this.anchoRectangulo = anchoRectangulo;
    }
    getColor(): string {
        return this.color;
    }
    setColor(color: string): void {
        this.color = color;
    }

}
