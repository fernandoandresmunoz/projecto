import { Bloque } from "bloque";
import { Line } from "line";
import { Point } from "point";
import { Rule } from "rule";
import { NextGenStrategy } from "src/app/NextGenStrategy";
import {Element } from "./rules/element";
import { MatrixCreationStrategy } from "src/app/matrix-creation-strategy";
import { NextMatrixStrategy } from "src/app/NextMatrixStrategy";



// deberia ser "export interface Automata"
export interface Automata  {
    
    
    // estos puntos deberian generarse automáticamente ?
    // mover celula
    // pause rules
    // rules
    addBloque(bloque: Bloque): void;
    addElement(element: Element): void;
    addPunto(punto: number[][] ): void
    avanzarUnaGeneracion(): void;
    
    calculateAliveNeighbors(matriz: {state: number, color: string}[][], fila: number, columna: number): {state: number, color: string}[];
    clean(): void;
    crearBloque(data: {state: number, color: string}, altura: number): void;
    crearTableroAleatorio(): void;
    createRandomMatriz(): {state: number, color: string}[][];
    createGlider(): {state: number, color: string}[][];
    densidad(): number;
    dibujarMatriz(matriz: {state: number, color: string}[][]): void;
    dibujarRectaCompleta(line: Line): void;
    down(): void;
    downMilitary(): void;
    drawCelula(): void;
    drawColumnas(line1: Line, line2: Line): void;
    drawCubes(): void;
    drawFilas(line1: Line, line2: Line): void;
    drawLine(pointA: Point, pointB: Point): void;
    drawRoof(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;
    drawSplitLine(line: Line): void;

    getAltoCelula(): number;
    getLargoCelula(): number;

    getAltoLienzo(): number;
    getAnchoCelula(): number;
    getAnchoLienzo(): number;
    getAvance(): number;
    getBloques(): Bloque[];
    getColorSchema(): {} ;
    setColorSchema(colorSchema: any): void;

    getColumnas(): number;
    getFilas(): number;

    getElements(): Element[];
    getGeneration(): number; // deberia ser unico por cada automata

    getHeight(): number;
    getInterseccion(line1: Line, line2: Line): Point;
    getIntersectionPoint(): Point;
    getLine1(): Line;
    getLine2(): Line;
    getLineAC(): Line;
    getLineAD(): Line;
    getLineBC(): Line;
    getLineBD(): Line;
    getMatrizActiva(): {state: number, color: string}[][];
    getPause(): boolean;

    // funciones de muy bajo nivel
    getPoint(): Point;
    getPoint1(): Point;
    getPoint2(): Point;
    getPoint3(): Point;
    getPoint4(): Point;
    getPoint5(): Point;
    getPoint6(): Point;
    getPoint7(): Point;
    getPointA(): Point;
    getPointB(): Point;
    getPointC(): Point;
    getPointD(): Point;
    getPointE(): Point;
    getPointF(): Point;
    getPointG(): Point;
    getPointH(): Point;

    getProjections(): string[]; // soy capaz de dibujar un cubo en diferentes perspectivas 
    // pienso que una interface que se llame geometría sería bueno para desarrollar 
    getPuntos(): number[][][];
    getRectaAC(): Line;
    getRectaAD(): Line;
    getRectaBC(): Line;
    getRectaBD(): Line;

    getScale(): number;
    getSelectedProjection(): string;
    
    keyLeft(): void;
    keyRight(): void;
    left(): void;
    matrizSiguiente(matriz: {state: number, color: string}[][]): {state: number, color: string}[][];
    paintCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;
    paintQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void;
    puntoCelula(): Point;
    right(): void;
    setActiveRule(rule: Rule): void;

    setAltoCelula(altoCelula: number): void;
    setAltoLienzo(altoLienzo: number): void;
    setAnchoCelula(anchoCelula: number): void;
    setAnchoLienzo(anchoLienzo: number): void;

    setAvance(avance: number): void;
    setColumnas(columnas: number): void;
    setDiamoeba(): void;
    setElements(elements: Element[]): void;
    setFilas(filas: number): void;
    setGeneration(generation: number): void;
    setGrayRule(rule: Rule): void;
    setGreenRule(rule: Rule): void;
    setHeight(height: number): void;
    setLargoCelula(largoCelula: number): void;
    setLife(): void;
    setLine1(line: Line): void;
    setLine2(line: Line): void;
    setMatrizActiva(matrizActiva: {state: number, color: string}[][]): void;
    setPause(pause: boolean): void;
    setPoint(point: Point): void;
    setPoint1(point: Point): void;
    setPoint2(point: Point): void;
    setPoint3(point: Point): void;
    setPoint4(point: Point): void;
    setPoint5(point: Point): void;
    setPoint6(point: Point): void;
    setPoint7(point: Point): void;
    setPointA(point: Point): void;
    setPointB(point: Point): void;
    setPointC(point: Point): void;
    setPointD(point: Point): void;
    setPuntos(puntos: number[][][]): void;
    setRectaAC(line: Line): void;
    setRectaAD(line: Line): void;
    setRectaBC(line: Line): void;
    setRectaBD(line: Line): void;
    
    setScale(scale: number): void;
    setSelectedProjection(selectedProjection: string): void;
    setShowAuxiliaryLines(showAuxiliaryLines: boolean): void;
    showAuxiliaryLines(): boolean;


    // rules
    getBlueRule(): Rule;
    getBrownRule(): Rule;
    getGrayRule(): Rule;
    getGreenRule(): Rule;
    setBlueRule(rule: Rule): void;
    setBrownRule(rule: Rule): void;
    totales(): any;
    setRedRule(rule: Rule): void;
    changeRule(element: string, rule: string): void;
    getActiveRule(): Rule;
    getRedRule(): Rule;
    getRedRule(): Rule;
    getRule(): Rule;
    getRules(): {name: string, rule: Rule, notation: string}[]; 
    setRule(rule: Rule): void;
    setRules(rules: {name: string, rule: Rule, notation: string}[]): void;


    //move automata
    subir(): void;
    subirCubos(): void;
    bajar(): void;
    bajarCubos(): void;
    izquierda(): void;
    izquierdaCubos(): void;
    derecha(): void;
    derechaCubos(): void;


    // total de cada elemento
    totalAzules(): number;
    totalCafes(): number;
    totalGrises(): number;
    totalRojos(): number;
    totalVerdes(): number;

    up(): void;
    upMilitary(size: number): void;
    setNextGenStrategy(nextGenStrategy: NextGenStrategy): void;
    getNexGenStategy(): NextGenStrategy;

    setMatrixCreationStrategy(strategy: MatrixCreationStrategy) : void;
    getMatrixCreationStrategy(): MatrixCreationStrategy;

    setNextMatrixStrategy(nextMatrixStrategy: NextMatrixStrategy): void;
    getNextMatrixStrategy(): NextMatrixStrategy;
}