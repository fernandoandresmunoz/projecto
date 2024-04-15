export interface ControladorParabola {

    setA(a: number): void;
    setB(b: number): void;
    setC(c: number): void;

    aumentarA(cantidad: number): void;
    aumentarB(cantidad: number): void;
    aumentarC(cantidad: number): void;

    disminuirA(cantidad: number): void;
    disminuirB(cantidad: number): void;
    disminuirC(cantidad: number): void;
}
