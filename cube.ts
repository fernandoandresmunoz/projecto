import { Bloque } from "bloque";
import { Line } from "line";
import { Point } from "point";
import { Rule } from "rule";
import {Element } from "./rules/element";

export interface Cube  {

    setAnchoCelula(anchoCelula: number): void;
    getAnchoCelula(): number;

    getAnchoLienzo(): number;
    setAnchoLienzo(anchoLienzo: number): void;

    getAltoLienzo(): number;
    setAltoLienzo(altoLienzo: number): void;

    setLargoCelula(largoCelula: number): void;
    getLargoCelula(): number;

    setAltoCelula(altoCelula: number): void;
    getAltoCelula(): number;
    drawCubes(): void;
    drawCelula(): void;
    puntoCelula(): Point;
    clean(): void;

    getPuntos(): number[][][];
    setPuntos(puntos: number[][][]): void;
    addPunto(punto: number[][] ): void

    subirCubos(): void;
    bajarCubos(): void;
    izquierdaCubos(): void;
    derechaCubos(): void;

    getBloques(): Bloque[];
    addBloque(bloque: Bloque): void;

    
    setSelectedProjection(selectedProjection: string): void;
    getSelectedProjection(): string;
    getProjections(): string[];
    
    getHeight(): number;
    setHeight(height: number): void;

    getLine1(): Line;
    setLine1(line: Line): void;
    getLine2(): Line;
    setLine2(line: Line): void;

    getIntersectionPoint(): Point;

    setScale(scale: number): void;
    getScale(): number;

    // mover celula
    up(): void;
    down(): void;
    left(): void;
    right(): void;

    getPointA(): Point;
    getPointB(): Point;
    getPointC(): Point;
    getPointD(): Point;

    setPointA(point: Point): void;
    setPointB(point: Point): void;
    setPointC(point: Point): void;
    setPointD(point: Point): void;

    // estos puntos deberian generarse automáticamente ?
    getPointE(): Point;
    getPointF(): Point;
    getPointG(): Point;
    getPointH(): Point;

    drawLine(pointA: Point, pointB: Point): void;
    drawRoof(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;
    keyLeft(): void;
    keyRight(): void;

    paintCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;

    getLineAC(): Line;
    getLineBD(): Line;

    getLineAD(): Line;
    getLineBC(): Line;
    drawSplitLine(line: Line): void;
    getFilas(): number;
    getColumnas(): number;
    setFilas(filas: number): void;
    setColumnas(columnas: number): void;
    drawColumnas(line1: Line, line2: Line): void;
    drawFilas(line1: Line, line2: Line): void;

    paintQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;
    dibujarRectaCompleta(line: Line): void;

    getRectaAD(): Line;
    getRectaBC(): Line;
    getRectaAC(): Line;
    getRectaBD(): Line;

    setRectaAD(line: Line): void;
    setRectaBC(line: Line): void;
    setRectaAC(line: Line): void;
    setRectaBD(line: Line): void;

    getPoint(): Point;
    getPoint1(): Point;
    getPoint2(): Point;
    getPoint3(): Point;
    getPoint4(): Point;
    getPoint5(): Point;
    getPoint6(): Point;
    getPoint7(): Point;


    setPoint(point: Point): void;
    setPoint1(point: Point): void;
    setPoint2(point: Point): void;
    setPoint3(point: Point): void;
    setPoint4(point: Point): void;
    setPoint5(point: Point): void;
    setPoint6(point: Point): void;
    setPoint7(point: Point): void;

    getInterseccion(line1: Line, line2: Line): Point;
    subir(): void;
    bajar(): void;
    izquierda(): void;
    derecha(): void;
    showAuxiliaryLines(): boolean;
    setShowAuxiliaryLines(showAuxiliaryLines: boolean): void;
    upMilitary(): void;
    downMilitary(): void;


    crearBloque(data: {state: number, color: string}, altura: number): void;

    crearTableroAleatorio(): void;
    getAvance(): number;
    setAvance(avance: number): void;

    getGeneration(): number;
    setGeneration(generation: number): void;

    dibujarMatriz(matriz: {state: number, color: string}[][]): void;
    getMatrizActiva(): {state: number, color: string}[][];
    setMatrizActiva(matrizActiva: {state: number, color: string}[][]): void;
    matrizSiguiente(matriz: {state: number, color: string}[][]): {state: number, color: string}[][];
    createRandomMatriz(): {state: number, color: string}[][];
    calculateAliveNeighbors(matriz: {state: number, color: string}[][], fila: number, columna: number): {state: number, color: string}[];


    // rules
    getRule(): Rule;
    setRule(rule: Rule): void;
    setDiamoeba(): void;
    setLife(): void;

    getRules(): {name: string, rule: Rule, notation: string}[]; 
    setRules(rules: {name: string, rule: Rule, notation: string}[]): void;
    setActiveRule(rule: Rule): void;
    getActiveRule(): Rule;

    getRedRule(): Rule;
    setRedRule(rule: Rule): void;

    getGreenRule(): Rule;
    setGreenRule(rule: Rule): void;

    getRedRule(): Rule;
    setRedRule(rule: Rule): void;

    // pause rules
    getPause(): boolean;
    setPause(pause: boolean): void;

    getElements(): Element[];
    setElements(elements: Element[]): void;
    addElement(element: Element): void;

    totalAzules(): number;
    totalVerdes(): number;
    totalCafes(): number;
    totalRojos(): number;
    totalGrises(): number;

    getBlueRule(): Rule;
    setBlueRule(rule: Rule): void;

    getBrownRule(): Rule;
    setBrownRule(rule: Rule): void;

    getGrayRule(): Rule;
    setGrayRule(rule: Rule): void;

    getColorSchema(): {} ;

    changeRule(element: string, rule: string): void;
}