import { Poligono } from "./poligono";

export interface ControladorPoligono {

    // cantidad que se va a aumentar
    setModelo(modelo: Poligono): void;
    getModelo(): Poligono;
    aumentarLados(cantidad: number): void;

    // cantidad que se va a disminuir
    disminuirLados(cantidad: number): void;

    cambiarNumeroDeLados(cantidad: number): void;
    girarAdelante(grados: number): void;
    girarAtras(grados: number): void;


}
