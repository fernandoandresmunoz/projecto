import { Figura } from "./figura";

export interface Lienzo {


    agregarFigura(figura: Figura): void;
    cambiarBackground(backgroundColor: string): void;

    dibujarFiguras(): void;
    setAncho(ancho: number): void;
    setLargo(largo: number): void;


}
