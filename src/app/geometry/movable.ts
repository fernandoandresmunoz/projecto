

// esta interface es para move cualquier objeto, cualquier cosa que se pueda dibujar debería poder moverse
export interface Movable {
    subir(): void;
    bajar(): void;
    izquierda(): void;
    derecha(): void;
    // tiene que hacer coincidir el centro del objeto, con el centro del lienzo 
    centrar(): void; 
}
