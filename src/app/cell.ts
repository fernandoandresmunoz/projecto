interface Cell {
    /**
     * El estado de la célula: 0 es muerta, 1 o más es viva.
     * Este es el valor que se extraerá.
     */
    state: number;
    /**
     * El color de la célula, que será ignorado en la matriz de salida.
     */
    color: string;
    // Puedes añadir más propiedades aquí si tu matriz de entrada las tiene.
}
