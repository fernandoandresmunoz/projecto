import { Automata  } from "cube";
import { Line } from "line";
import { Point } from "point";
import { ShapeFactory } from "shapeFactory";
import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Bloque } from "bloque";
import { BloqueConcreto } from "bloque-concreto";
import { Rule } from "rule";
import { Element } from './rules/element';
import { NextMatrixStrategy } from "src/app/NextMatrixStrategy";
import { ConcreteNextMatrixStrategy } from "src/app/ConcreteNextMatrixStrategy";
import { ConcreteAliveNeighborsStrategy } from "src/app/ConcreteAliveNeighborsStrategy";
import { AliveNeighborsStrategy } from "src/app/AliveNeighborsStrategy";
import { ConcreteRandomMatrixStrategy } from "src/app/ConcreteRandomMatrixStrategy";
import { DrawingStrategy } from "src/app/DrawingStrategy";
import { ConcreteDrawingStrategy } from "src/app/ConcreteDrawingStrategy";
import { BlockCreationStrategy } from "src/app/BlockCreationStrategy";
import { ConcreteBlockCreationStrategy } from "src/app/ConcreteBlockCreationStrategy";
import { NextGenStrategy } from "src/app/NextGenStrategy";
import { JUEGO } from "src/JUEGO";
import { ConcreteNextGenStrategy } from "src/app/ConcreteNextGenStrategy";
import { GliderCreationStrategy } from "src/app/glider-creation-strategy";


export default class ConcreteAutomata implements Automata {


    shapeFactory: ShapeFactory = new ConcreteShapeFactory();
    line1: Line; // no son relevantes estas propiedades
    line2: Line; //

    // line2: Line = new ConcreteLine( new ConcretePoint(91, 17), new ConcretePoint(14, 20));

    scale: number;
    height: number;

    pointA: Point;
    pointB: Point;
    pointC: Point;
    pointD: Point;


    rectaAD: Line;
    rectaBC: Line;
    rectaAC: Line;
    rectaBD: Line;


    selectedProjection: string;

    projections = [
        'isometric',
        'dimetric',
        'trimetric',
        'cabinet',
        'cavalier',
        'military',
    ]

    filas: number = 8;
    columnas: number = 8;

    point: Point;
    point1: Point;
    point2: Point;
    point3: Point;
    point4: Point;
    point5: Point;
    point6: Point;
    point7: Point;

    bloques: Bloque[] = [];

    puntos: number[][][] = [];

    altoCelula = 2;
    anchoCelula = 5;
    largoCelula = 5;
    auxiliaryLines = true

    anchoLienzo = 1500;
    altoLienzo = 800;

    avance: number;
    generation: number = 0;
    matrizActiva: { state: number, color: string }[][];

    rule: Rule;
    activeRule: Rule;

    pause: boolean = false;

    greenRule: Rule = this.shapeFactory.createLifeRule();
    redRule: Rule = this.shapeFactory.createLifeRule();
    brownRule: Rule = this.shapeFactory.createLifeRule();
    blueRule: Rule = this.shapeFactory.createLifeRule();
    grayRule: Rule = this.shapeFactory.createLifeRule();

    rules: { name: string, rule: Rule, notation: string }[] = [
        {
            name: 'life',
            rule: this.shapeFactory.createLifeRule(),
            notation: ''
        },
        {
            name: 'diamoeba',
            rule: this.shapeFactory.createDiamoebaRule(),
            notation: 'B35678/S5678	'
        },
        {
            name: 'replicator',
            rule: this.shapeFactory.createReplicatorRule(),
            notation: 'B1357/S1357'
        },
        {
            name: 'seeds',
            rule: this.shapeFactory.createSeedsRule(),
            notation: ''
        },
        {
            name: 'life without death',
            rule: this.shapeFactory.createLifeWithoutDeathRule(),
            notation: ''
        },
        {
            name: 'life 34',
            rule: this.shapeFactory.create34LifeRule(),
            notation: ''
        },
        {
            name: '2x2',
            rule: this.shapeFactory.create2x2Rule(),
            notation: ''
        },
        {
            name: 'highlife',
            rule: this.shapeFactory.createHighLifeRule(),
            notation: ''
        },
        {
            name: 'day & night ',
            rule: this.shapeFactory.createDayAndNightRule(),
            notation: ''
        },
        {
            name: 'morley',
            rule: this.shapeFactory.createMorleyRule(),
            notation: ''
        },
        {
            name: 'anneal',
            rule: this.shapeFactory.createAnnealRule(),
            notation: ''
        },
        {
            name: 'coagulation',
            rule: this.shapeFactory.createCoagulationRule(),
            notation: '',
        },
        {
            name: 'coral',
            rule: this.shapeFactory.createCoralRule(),
            notation: ''
        },
        {
            name: 'gnarl',
            rule: this.shapeFactory.createGnarlRule(),
            notation: ''
        },
        {
            name: 'maze',
            rule: this.shapeFactory.createMazeRule(),
            notation: ''
        },
        {
            name: 'move',
            rule: this.shapeFactory.createMoveRule(),
            notation: ''
        },
        {
            name: 'walled city',
            rule: this.shapeFactory.createWalledCityRule(),
            notation: ''
        },
        {
            name: 'mazectric',
            rule: this.shapeFactory.Mazectric(),
            notation: ''
        },
        {
            name: 'mazectric with mice ',
            rule: this.shapeFactory.MazectricWithMice(),
            notation: ''
        },
        {
            name: 'maze with mice',
            rule: this.shapeFactory.MazeWithMice(),
            notation: ''
        },
        {
            name: 'pedestrian life',
            rule: this.shapeFactory.PedestrianLife(),
            notation: ''
        },
        {
            name: 'corrosion of conformity',
            rule: this.shapeFactory.CorrosionOfConformity(),
            notation: ''
        },
        {
            name: 'snow',
            rule: this.shapeFactory.SnowLife(),
            notation: ''
        },
        {
            name: 'serviettes',
            rule: this.shapeFactory.serviettes(),
            notation: ''
        },
{
            name: 'empty',
            rule: this.shapeFactory.emptyRule(),
            notation: ''
        },
        {
            name: 'geology',
            rule: this.shapeFactory.geologyRule(),
            notation: ''
        }
    ]

    elements: Element[] = [];

    colorSchema = {
        'Red': {
            primary: 'Red',
            secondary: 'Coral',
            terciary: 'DarkRed'
        },
        'Green': {
            primary: 'Green',
            secondary: 'Green',
            terciary: 'Green'
        },
        'Blue': {
            primary: 'Blue',
            secondary: 'Blue',
            terciary: 'Blue'
        },
        'Brown': {
            primary: 'Brown',
            secondary: 'Brown',
            terciary: 'Brown'
        },
        'Gray': {
            primary: 'Gray',
            secondary: 'Gray',
            terciary: 'Gray'
        }
    }


    nextMatrixStrategy: NextMatrixStrategy = new ConcreteNextMatrixStrategy(this);
    aliveNeighborsStrategy: AliveNeighborsStrategy = new ConcreteAliveNeighborsStrategy();

    // randomMatrixStrategy: any = new ConcreteRandomMatrixStrategy();
    randomMatrixStrategy: any =   new GliderCreationStrategy()


    drawingStrategy: DrawingStrategy = new ConcreteDrawingStrategy();
    blockCreationStrategy: BlockCreationStrategy = new ConcreteBlockCreationStrategy(this, this.shapeFactory);
    nextGenStrategy: NextGenStrategy = new ConcreteNextGenStrategy();

    constructor(pointA: Point, pointB: Point, pointC: Point, pointD: Point) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.pointD = pointD;

        // esto no deberia ser tan importante, no deberia hacerlo de esta manera.
        this.setLine1(this.shapeFactory.createLine(pointA, pointB));
        this.setLine2(this.shapeFactory.createLine(pointC, pointD));

        const ad = this.shapeFactory.createLine(pointA, pointD);
        const bc = this.shapeFactory.createLine(pointB, pointC);
        const ac = this.shapeFactory.createLine(pointA, pointC);
        const bd = this.shapeFactory.createLine(pointB, pointD);


        this.setRectaAC(ac);
        this.setRectaAD(ad);
        this.setRectaBC(bc);
        this.setRectaBD(bd);
        // this.setActiveRule(this.shapeFactory.createLifeRule());

        // this.setGreenRule(this.shapeFactory.createCoralRule());

    }

    totales(): any {
        let d = [
            {
                name: 'azul',
                total: 100 * this.totalAzules() / this.getBloques().length,
                color: 'blue'
            },
            {
                name: 'cafe',
                total:100 *  this.totalCafes() / this.getBloques().length,
                color: 'brown'
            }, {
                name: 'verdes',
                total: 100 * this.totalVerdes() / this.getBloques().length,
                color: 'green'
            }, {
                name: 'rojos',
                total: 100 * this.totalRojos() / this.getBloques().length,
                color: 'red'
            }, {
                name: 'grises',
                total: 100 * this.totalGrises() / this.getBloques().length,
                color: 'gray'
            },
        ]
        d.sort((a, b) => { return b.total - a.total})

        return d
    }
    setNextGenStrategy(nextGenStrategy: NextGenStrategy): void {
        this.nextGenStrategy = nextGenStrategy;
    }
    avanzarUnaGeneracion(): void {
        if (!this.getPause()) {

            this.setGeneration(this.getGeneration() + 1);
            this.nextGenStrategy.nextGeneration(this);
            this.setMatrizActiva(this.matrizSiguiente(this.getMatrizActiva()))
            this.dibujarMatriz(this.getMatrizActiva())
        }

    }
    densidad(): number {
        return this.getBloques().length / (this.getFilas() * this.getColumnas());
    }



    changeRule(element: string, rule: string): void {
        switch (element) {
            case 'RED':

                this.setRedRule(this.getRules().filter(obj => obj.name === rule)[0].rule)
                break;

            case 'GREEN':
                // this.setGreenRule(this.getRules().filter( obj => obj.name === rule)[0])
                this.setGreenRule(this.getRules().filter(obj => obj.name === rule)[0].rule)
                break;

            case 'BROWN':
                this.setBrownRule(this.getRules().filter(obj => obj.name === rule)[0].rule)
                break;

            case 'BLUE':
                this.setBlueRule(this.getRules().filter(obj => obj.name === rule)[0].rule)
                break;
            case 'GRAY':
                this.setGrayRule(this.getRules().filter(obj => obj.name === rule)[0].rule)
                break;

            default:
                break;
        }
    }
    getColorSchema(): any {
        throw new Error("Method not implemented.");
    }
    getBlueRule(): Rule {
        return this.blueRule;
    }
    setBlueRule(rule: Rule): void {
        this.blueRule = rule;
    }
    getBrownRule(): Rule {
        return this.brownRule;
    }
    setBrownRule(rule: Rule): void {
        this.brownRule = rule;
    }
    getGrayRule(): Rule {
        return this.grayRule;
    }
    setGrayRule(rule: Rule): void {
        this.grayRule = rule;
    }
    totalAzules(): number {
        return this.getBloques().filter(obj => obj.getData().color === 'Blue').length;
    }
    totalVerdes(): number {
        return this.getBloques().filter(obj => obj.getData().color === 'Green').length;
    }
    totalCafes(): number {
        return this.getBloques().filter(obj => obj.getData().color === 'Brown').length;
    }
    totalRojos(): number {
        return this.getBloques().filter(obj => obj.getData().color === 'Red').length;
    }
    totalGrises(): number {
        return this.getBloques().filter(obj => obj.getData().color === 'Gray').length;
    }
    getElements(): Element[] {
        return this.elements;
    }
    setElements(elements: Element[]): void {
        this.elements = elements;
    }
    addElement(element: Element): void {
        this.elements.push(element);
    }
    getRedRule(): Rule {
        return this.redRule;
    }
    setRedRule(rule: Rule): void {
        this.redRule = rule;
    }
    getGreenRule(): Rule {
        return this.greenRule;
    }
    setGreenRule(rule: Rule): void {
        this.greenRule = rule;
    }
    getPause(): boolean {
        return this.pause;
    }
    setPause(pause: boolean): void {
        this.pause = pause;
    }
    calculateAliveNeighbors(nuevaMatriz: { state: number, color: string }[][], fila: number, columna: number): { state: number, color: string }[] {
        return this.aliveNeighborsStrategy.calculate(nuevaMatriz, fila, columna);
    }
    getRules(): { name: string; rule: Rule; notation: string; }[] {
        return this.rules;
    }
    setRules(rules: { name: string; rule: Rule; notation: string; }[]): void {
        this.rules = rules;
    }
    setActiveRule(rule: Rule): void {
        this.activeRule = rule;
    }
    getActiveRule(): Rule {
        return this.activeRule;
    }
    setDiamoeba(): void {
        throw new Error("Method not implemented.");
    }
    setLife(): void {
        throw new Error("Method not implemented.");
    }
    getRule(): Rule {
        return this.rule;
    }
    setRule(rule: Rule): void {
        this.rule = rule;
    }
    createRandomMatriz(): { state: number, color: string }[][] {
        return this.randomMatrixStrategy.create(this);
    }
    createGlider(): { state: number; color: string; }[][] {
        throw new Error("Method not implemented.");
    }
    matrizSiguiente(matriz: { state: number, color: string }[][]): { state: number, color: string }[][] {
        return this.nextMatrixStrategy.nextMatrix(this.getMatrizActiva())
    }
    getMatrizActiva(): { state: number, color: string }[][] {
        return this.matrizActiva;
    }
    setMatrizActiva(matrizActiva: { state: number, color: string }[][]): void {
        this.matrizActiva = matrizActiva;
    }
    getGeneration(): number {
        return this.generation;
    }
    setGeneration(generation: number): void {
        this.generation = generation
        if (this.generation === 0 ) {
            this.setBlueRule(this.shapeFactory.createCoralRule())
            this.setGreenRule(this.shapeFactory.createCoralRule())
            this.setRedRule(this.shapeFactory.createCoralRule())
            this.setBrownRule(this.shapeFactory.createCoralRule())
            this.setGrayRule(this.shapeFactory.createLifeRule())
        }
    }

    getAvance(): number {
        return this.avance;
    }
    setAvance(avance: number): void {
        this.avance = avance;
    }
    setShowAuxiliaryLines(showAuxiliaryLines: boolean): void {
        this.auxiliaryLines = showAuxiliaryLines;
    }
    getAnchoLienzo(): number {
        return this.anchoLienzo;
    }
    setAnchoLienzo(anchoLienzo: number): void {
        this.anchoLienzo = anchoLienzo;
    }
    getAltoLienzo(): number {
        return this.altoLienzo;
    }
    setAltoLienzo(altoLienzo: number): void {
        this.altoLienzo = altoLienzo;
    }

    dibujarMatriz(matriz: { state: number, color: string }[][]): void {
        this.drawingStrategy.draw(this, this.getMatrizActiva() );
    }
    crearTableroAleatorio(): void {
        // this.clean();
        // for (let j = 0; j < this.getFilas(); j++) {
        //     for (let i = 0; i < this.getColumnas(); i++) {


        //         const n = Math.floor(Math.random() * 10);
        //         if (n % 2 == 0) {


        //             this.crearBloque({ state: 0, color: 'red' });
        //         }
        //         this.left();
        //     }
        //     for (let i = 0; i < this.getColumnas(); i++) {
        //         this.right();
        //     }
        //     this.down();
        // }
        // for (let i = 0; i < this.getFilas(); i++) {
        //     this.up();
        // }
    }
    crearBloque(data: { state: number, color: string }, altura: number = 2): void {
        this.blockCreationStrategy.create(data, altura);
    }

    upMilitary(size: number): void {
        this.getPointA().setY(this.getPointA().getY() + size);
        this.getPointB().setY(this.getPointB().getY() - size);
    }
    downMilitary(): void {
        this.getPointA().setY(this.getPointA().getY() - 1);
        this.getPointB().setY(this.getPointB().getY() + 1);
    }
    showAuxiliaryLines(): boolean {
        return this.auxiliaryLines;
    }
    subir(): void {

        for (let i = 0; i < JUEGO.AVANCE; i++) {
            this.up();
        }
        // this.getPointA().setY(this.getPointA().getY() - 1);
        // this.getPointB().setY(this.getPointB().getY() - 1);
        // this.getPointC().setY(this.getPointC().getY() - 1);
        // this.getPointD().setY(this.getPointD().getY() - 1);
        // this.subirCubos();

    }
    bajar(): void {
        for (let i = 0; i < JUEGO.AVANCE; i++) {
            this.down()
        }

        // this.getPointA().setX( this.getPointA().getX() + 1);
        // this.getPointB().setX( this.getPointB().getX() + 1);
        // this.getPointC().setX( this.getPointC().getX() + 1);
        // this.getPointD().setX( this.getPointD().getX() + 1);

        // this.getPointA().setY( this.getPointA().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY());
        // this.getPointB().setY( this.getPointB().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY());
        // this.getPointC().setY( this.getPointC().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY());
        // this.getPointD().setY( this.getPointD().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY());


        // this.bajarCubos();
    }
    izquierda(): void {

        for (let i = 0; i < JUEGO.AVANCE; i++) {
            this.left()
        }


        // this.getPointA().setX(this.getPointA().getX() - 1);
        // this.getPointB().setX(this.getPointB().getX() - 1);
        // this.getPointC().setX(this.getPointC().getX() - 1);
        // this.getPointD().setX(this.getPointD().getX() - 1);
        // this.izquierdaCubos();
    }
    derecha(): void {
        for (let i = 0; i < JUEGO.AVANCE; i++) {
            this.right();
        }
        // this.getPointA().setX(this.getPointA().getX() + 1);
        // this.getPointB().setX(this.getPointB().getX() + 1);
        // this.getPointC().setX(this.getPointC().getX() + 1);
        // this.getPointD().setX(this.getPointD().getX() + 1);
        // this.derechaCubos();
    }
    subirCubos(): void {

        const pendiente = this.getLineBC().calcularPendiente()

        this.getBloques().map(bloque => {
            bloque.getPointP0().setX(bloque.getPointP0().getX() - this.getAvance());
            bloque.getPointP0().setY(bloque.getPointP0().getY() - this.getAvance() * pendiente)
            bloque.getPointP1().setX(bloque.getPointP1().getX() - this.getAvance());
            bloque.getPointP1().setY(bloque.getPointP1().getY() - this.getAvance() * pendiente)
            bloque.getPointP2().setX(bloque.getPointP2().getX() - this.getAvance());
            bloque.getPointP2().setY(bloque.getPointP2().getY() - this.getAvance() * pendiente)
            bloque.getPointP3().setX(bloque.getPointP3().getX() - this.getAvance());
            bloque.getPointP3().setY(bloque.getPointP3().getY() - this.getAvance() * pendiente)


        })
    }
    bajarCubos(): void {

        const pendiente = this.getLineBC().calcularPendiente()

        this.getBloques().map(bloque => {

            bloque.getPointP0().setX(bloque.getPointP0().getX() + this.getAvance());
            bloque.getPointP0().setY(bloque.getPointP0().getY() + this.getAvance() * pendiente)
            bloque.getPointP1().setX(bloque.getPointP1().getX() + this.getAvance());
            bloque.getPointP1().setY(bloque.getPointP1().getY() + this.getAvance() * pendiente)
            bloque.getPointP2().setX(bloque.getPointP2().getX() + this.getAvance());
            bloque.getPointP2().setY(bloque.getPointP2().getY() + this.getAvance() * pendiente)
            bloque.getPointP3().setX(bloque.getPointP3().getX() + this.getAvance());
            bloque.getPointP3().setY(bloque.getPointP3().getY() + this.getAvance() * pendiente)


        })


    }
    izquierdaCubos(): void {


        // this.getPointC().setY(this.getPointC().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        const pendiente = this.getLineAC().calcularPendiente()

        this.getBloques().map(bloque => {
            bloque.getPointP0().setX(bloque.getPointP0().getX() - this.getAvance());
            bloque.getPointP0().setY(bloque.getPointP0().getY() - this.getAvance() * pendiente)
            bloque.getPointP1().setX(bloque.getPointP1().getX() - this.getAvance());
            bloque.getPointP1().setY(bloque.getPointP1().getY() - this.getAvance() * pendiente)
            bloque.getPointP2().setX(bloque.getPointP2().getX() - this.getAvance());
            bloque.getPointP2().setY(bloque.getPointP2().getY() - this.getAvance() * pendiente)
            bloque.getPointP3().setX(bloque.getPointP3().getX() - this.getAvance());
            bloque.getPointP3().setY(bloque.getPointP3().getY() - this.getAvance() * pendiente)



        })



    }

    derechaCubos(): void {
        const pendiente = this.getLineAC().calcularPendiente();

        this.getBloques().map(bloque => {
            bloque.getPointP0().setX(bloque.getPointP0().getX() + this.getAvance());
            bloque.getPointP0().setY(bloque.getPointP0().getY() + this.getAvance() * pendiente)
            bloque.getPointP1().setX(bloque.getPointP1().getX() + this.getAvance());
            bloque.getPointP1().setY(bloque.getPointP1().getY() + this.getAvance() * pendiente)
            bloque.getPointP2().setX(bloque.getPointP2().getX() + this.getAvance());
            bloque.getPointP2().setY(bloque.getPointP2().getY() + this.getAvance() * pendiente)
            bloque.getPointP3().setX(bloque.getPointP3().getX() + this.getAvance());
            bloque.getPointP3().setY(bloque.getPointP3().getY() + this.getAvance() * pendiente)
        })
    }

    setAnchoCelula(anchoCelula: number): void {
        this.anchoCelula = anchoCelula;
    }
    getAnchoCelula(): number {
        return this.anchoCelula;
    }
    setLargoCelula(largoCelula: number): void {
        this.largoCelula = largoCelula;
    }
    getLargoCelula(): number {
        return this.largoCelula;
    }
    setAltoCelula(altoCelula: number): void {
        this.altoCelula = altoCelula;
    }
    getAltoCelula(): number {
        return this.altoCelula;
    }
    drawCelula(): void {
        throw new Error("Method not implemented.");
    }
    drawCubes(): void {
        throw new Error("Method not implemented.");
    }
    clean(): void {
        this.setPuntos([]);
        this.bloques = [];
    }
    setPuntos(puntos: number[][][]): void {
        this.puntos = puntos;
    }

    puntoCelula(): Point {
        return this.getInterseccion(
            this.shapeFactory.createLine(this.getPoint(), this.getPoint2()),
            this.shapeFactory.createLine(this.getPoint1(), this.getPoint3())
        )
    }

    getPuntos(): number[][][] {
        return this.puntos;
    }

    addPunto(punto: number[][]): void {
        this.puntos.push(punto);
    }

    getBloques(): Bloque[] {
        return this.bloques;
    }
    addBloque(bloque: Bloque): void {
        this.bloques.push(bloque);
    }
    getInterseccion(line1: Line, line2: Line): Point {
        let interseccion = line1.calcularInterseccionRecta(line2);
        return interseccion;
    }
    getPoint4(): Point {
        return this.point4;
    }
    getPoint5(): Point {
        return this.point5;
    }
    getPoint6(): Point {
        return this.point6;
    }
    getPoint7(): Point {
        return this.point7;
    }
    setPoint4(point: Point): void {
        this.point4 = point;
    }
    setPoint5(point: Point): void {
        this.point5 = point;
    }
    setPoint6(point: Point): void {
        this.point6 = point;
    }
    setPoint7(point: Point): void {
        this.point7 = point;
    }
    getPoint1(): Point {
        return this.point1;
    }
    getPoint2(): Point {
        return this.point2;
    }
    getPoint3(): Point {
        return this.point3;
    }
    setPoint1(point: Point): void {
        this.point1 = point;
    }
    setPoint2(point: Point): void {
        this.point2 = point;
    }
    setPoint3(point: Point): void {
        this.point3 = point;
    }
    getPoint(): Point {
        return this.point;
    }
    setPoint(point: Point): void {
        this.point = point;
    }
    getRectaAD(): Line {
        return this.rectaAD;
    }
    getRectaBC(): Line {
        return this.rectaBC;
    }
    getRectaAC(): Line {
        return this.rectaAC;
    }
    getRectaBD(): Line {
        return this.rectaBD;
    }
    setRectaAD(line: Line): void {
        this.rectaAD = line;
    }
    setRectaBC(line: Line): void {
        this.rectaBC = line;
    }
    setRectaAC(line: Line): void {
        this.rectaAC = line;
    }
    setRectaBD(line: Line): void {
        this.rectaBD = line;
    }
    dibujarRectaCompleta(line: Line): void {
        throw new Error("Method not implemented.");
    }
    drawColumnas(line1: Line, line2: Line): void {
        throw new Error("Method not implemented.");
    }
    drawFilas(line1: Line, line2: Line): void {
        throw new Error("Method not implemented.");
    }
    paintQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void {
        throw new Error("Method not implemented.");
    }

    getFilas(): number {
        return this.filas;
    }
    getColumnas(): number {
        return this.columnas;
    }
    setFilas(filas: number): void {
        this.filas = filas;
    }
    setColumnas(columnas: number): void {
        this.columnas = columnas;
    }
    drawSplitLine(line: Line): void {
        throw new Error("Method not implemented.");
    }
    getLineAC(): Line {
        return this.shapeFactory.createLine(this.getPointA(), this.getPointC());
    }
    getLineBD(): Line {
        return this.shapeFactory.createLine(this.getPointB(), this.getPointD());
    }
    getLineAD(): Line {
        return this.shapeFactory.createLine(this.getPointA(), this.getPointD());
    }
    getLineBC(): Line {
        return this.shapeFactory.createLine(this.getPointB(), this.getPointC());
    }
    setPointA(point: Point): void {
        this.pointA = point;
    }
    setPointB(point: Point): void {
        this.pointB = point;
    }
    setPointC(point: Point): void {
        this.pointC = point;
    }
    setPointD(point: Point): void {
        this.pointD = point;
    }
    paintCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void {
        throw new Error("Method not implemented.");
    }
    keyLeft(): void {
        console.log(' presssing left ');
    }
    keyRight(): void {
        console.log(' pressing right ');
    }
    setSelectedProjection(selectedProjection: string): void {
        this.selectedProjection = selectedProjection;
    }
    getSelectedProjection(): string {
        return this.selectedProjection;
    }
    getProjections(): string[] {
        return this.projections;
    }
    drawRoof(pointA: Point, pointB: Point, pointC: Point, pointD: Point): void {
        // throw new Error("Method not implemented.");
        console.log('drawing roof ');
    }
    getPointE(): Point {
        return this.shapeFactory.createPoint(this.getPointA().getX(), this.getPointA().getY() + this.getHeight());
    }
    getPointF(): Point {
        return this.shapeFactory.createPoint(this.getPointB().getX(), this.getPointB().getY() + this.getHeight());
    }
    getPointG(): Point {
        return this.shapeFactory.createPoint(this.getPointC().getX(), this.getPointC().getY() + this.getHeight());
    }
    getPointH(): Point {
        return this.shapeFactory.createPoint(this.getPointD().getX(), this.getPointD().getY() + this.getHeight());
    }
    drawLine(pointA: Point, pointB: Point): void {
        throw new Error("Method not implemented.");
    }


    // let puntoA_X = this.cube.getLine1().getPointA().getScaledX();
    // let puntoA_Y = this.cube.getLine1().getPointA().getScaledY();

    // let puntoB_X = this.cube.getLine1().getPointB().getScaledX();
    // let puntoB_Y = this.cube.getLine1().getPointB().getScaledY();



    getPointA(): Point {
        return this.pointA;
    }
    getPointB(): Point {
        return this.pointB;
    }
    getPointC(): Point {
        return this.pointC;
    }
    getPointD(): Point {
        return this.pointD;
    }
    getHeight(): number {
        return this.height;
    }
    setHeight(height: number): void {
        this.height = height;
    }

    down(): void {

        this.getPoint().setX(this.getPoint().getX() + this.getLargoCelula())
        this.getPoint().setY(this.getPoint().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

        this.getPoint2().setX(this.getPoint2().getX() + this.getLargoCelula())
        this.getPoint2().setY(this.getPoint2().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY())

        this.getPoint4().setX(this.getPoint4().getX() + this.getLargoCelula())
        this.getPoint4().setY(this.getPoint4().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

        this.getPoint5().setX(this.getPoint5().getX() + this.getLargoCelula())
        this.getPoint5().setY(this.getPoint5().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY())





        // this.getPointD().setX(this.getPointD().getX() +1 );
        // this.getPointD().setY(this.getPointD().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

    }
    up(): void {

        this.getPoint().setX(this.getPoint().getX() - this.getLargoCelula())
        this.getPoint().setY(this.getPoint().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

        // this.getPoint1().setX(this.getPoint1().getX() - 1)
        // this.getPoint1().setY(this.getPoint1().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        this.getPoint2().setX(this.getPoint2().getX() - this.getLargoCelula())
        this.getPoint2().setY(this.getPoint2().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY())

        this.getPoint4().setX(this.getPoint4().getX() - this.getLargoCelula())
        this.getPoint4().setY(this.getPoint4().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

        this.getPoint5().setX(this.getPoint5().getX() - this.getLargoCelula())
        this.getPoint5().setY(this.getPoint5().getX() * this.getLineBC().calcularPendiente() + this.getLineBC().intereseccionEnEjeY().getY())




        // this.getPoint3().setX(this.getPoint3().getX() - 1)
        // this.getPoint3().setY(this.getPoint3().getX() * this.getLineAC().calcularPendiente() + this.getLineAC().intereseccionEnEjeY().getY())



        // this.getPointA().setX(this.getPointA().getX() -1 );
        // this.getPointA().setY(this.getPointA().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())

        // this.getPointD().setX(this.getPointD().getX() -1 );
        // this.getPointD().setY(this.getPointD().getX() * this.getLineAD().calcularPendiente() + this.getLineAD().intereseccionEnEjeY().getY())


    }
    right(): void {

        // mover punto 1
        this.getPoint1().setX(this.getPoint1().getX() + this.getAnchoCelula())
        this.getPoint1().setY(this.getPoint1().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        // mover punto 3
        this.getPoint3().setX(this.getPoint3().getX() + this.getAnchoCelula())
        this.getPoint3().setY(this.getPoint3().getX() * this.getLineAC().calcularPendiente() + this.getLineAC().intereseccionEnEjeY().getY())


        // mover punto 6
        this.getPoint6().setX(this.getPoint6().getX() + this.getAnchoCelula())
        this.getPoint6().setY(this.getPoint6().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        // mover punto 7
        this.getPoint7().setX(this.getPoint7().getX() + this.getAnchoCelula())
        this.getPoint7().setY(this.getPoint7().getX() * this.getLineAC().calcularPendiente() + this.getLineAC().intereseccionEnEjeY().getY())



        // this.getPointA().setX(this.getPointA().getX() - 1);
        // this.getPointB().setX(this.getPointB().getX() - 1);
        // this.getPointC().setX(this.getPointC().getX() - 1);
        // this.getPointD().setX(this.getPointD().getX() - 1);
        // this.getLine1().getPointA().setX(this.getLine1().getPointA().getX() - 1);
        // this.getLine1().getPointB().setX(this.getLine1().getPointB().getX() - 1);
        // this.getLine2().getPointA().setX(this.getLine2().getPointA().getX() - 1);
        // this.getLine2().getPointB().setX(this.getLine2().getPointB().getX() - 1);
    }

    left(): void {
        // mover punto 1
        this.getPoint1().setX(this.getPoint1().getX() - this.getAnchoCelula())
        this.getPoint1().setY(this.getPoint1().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        // mover punto 3 
        this.getPoint3().setX(this.getPoint3().getX() - this.getAnchoCelula())
        this.getPoint3().setY(this.getPoint3().getX() * this.getLineAC().calcularPendiente() + this.getLineAC().intereseccionEnEjeY().getY())

        // mover punto 6
        this.getPoint6().setX(this.getPoint6().getX() - this.getAnchoCelula())
        this.getPoint6().setY(this.getPoint6().getX() * this.getLineBD().calcularPendiente() + this.getLineBD().intereseccionEnEjeY().getY())

        // mover punto 7
        this.getPoint7().setX(this.getPoint7().getX() - this.getAnchoCelula())
        this.getPoint7().setY(this.getPoint7().getX() * this.getLineAC().calcularPendiente() + this.getLineAC().intereseccionEnEjeY().getY())


    }

    setScale(scale: number): void {
        this.scale = scale;

        this.getPointA().setScale(scale);
        this.getPointB().setScale(scale);
        this.getPointC().setScale(scale);
        this.getPointD().setScale(scale);
        this.getPointE().setScale(scale);
        this.getPointF().setScale(scale);
        this.getPointG().setScale(scale);
        this.getPointH().setScale(scale);



        // this.line1.setScale(scale);
        // this.line2.setScale(scale);
    }
    getScale(): number {
        return this.scale;
    }

    getLine1(): Line {
        return this.line1;
    }
    setLine1(line: Line): void {
        this.line1 = line;
    }
    getLine2(): Line {
        return this.line2;
    }
    setLine2(line: Line): void {
        this.line2 = line;
    }
    getIntersectionPoint(): Point {
        return this.line1.calcularInterseccionRecta(this.line2);
    }

}