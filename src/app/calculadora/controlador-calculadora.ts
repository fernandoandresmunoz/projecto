export interface ControladorCalculadora {

    subirPantalla(): void;
    bajarPantalla(): void;
    moverPantallaIzquierda(): void;
    moverPantallaDerecha(): void;
    cambiarColorIntegral(color: string): void;
    cambiarColorCurva(color: string): void;
    cambiarAnchoCurva(ancho: number): void;
    cambiarAnchoDerivada(ancho: number): void;
    cambiarColorDerivada(color: string): void;
    cambiarTamanoFuenteEjeX(tamano: number): void;
    cambiarTamanoFuenteEjeY(tamano: number): void;
    cambiarColorFondoLienzo(color: string): void;
    mostrarNumerosEnEjeX(mostrar: boolean): void;
    mostrarNumerosEnEjeY(mostrar: boolean): void;
    mostrarTicksEnEjeX(mostrar: boolean): void;
    mostrarTicksEnEjeY(mostrar: boolean): void;
    setIntervaloNumeroEjeX(intervalo: number): void;
    setIntervaloNumeroEjeY(intervalo: number): void;
    setAnchoEjeX(ancho: number): void;
    setAnchoEjeY(ancho: number): void;
    setColorEjeX(color: string): void;
    setColorEjeY(color: string): void;
    setColorNumerosEjeX(color: string): void;
    setColorNumerosEjeY(color: string): void;
    setAltoTicketEjeX(alto: number): void;
    setAnchoTicketEjeY(ancho: number): void;
    setPosicionNumerosEjeX(left: number, right: number): void;
    setPosicionNumerosEjeY(left: number, right: number): void;

    cambiarMostrarDerivada(mostrar: boolean): void;



}
