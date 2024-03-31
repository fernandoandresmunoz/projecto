import { TwoXTwo } from "2x2";
import { Life34 } from "34life";
import { Anneal } from "anneal";
import { Bloque } from "bloque";
import { ConcreteLine } from "concrete-line";
import { ConcretePoint } from "concrete-point";
import ConcreteAutomata from "concreteAutomata";
import { Automata } from "cube";
import { DayAndNight } from "day-and-night";
import { Diamoeba } from "diamoeba";
import { HighLife } from "highlife";
import { LifeRule } from "life-rule";
import { LifeWithoutDeath } from "life-without-death";
import { Line } from "line";
import { Morley } from "morley";
import { Point } from "point";
import { Replicator } from "replicator";
import { Rule } from "rule";
import { Coagulations } from "rules/coagulations";
import { ConcreteElement } from "rules/concrete-element";
import { Coral } from "rules/coral";
import { Element as Elemento } from "rules/element";
import { Gnarl } from "rules/gnarl";
import { Maze } from "rules/maze";
import { Move } from "rules/move";
import { WalledCity } from "rules/walledCity";
import { Seeds } from "seeds";
import { ShapeFactory } from "shapeFactory";
import { Circle, ConcreteCircle, Quadrilateral, Triangle } from "src/modelo";
import { Mazectric } from "rules/Mazectric";
import { MazectricWithMice } from "rules/MaezectricWithMice";
import { MazeWithMice } from "rules/MazeWithMice";
import { PedestrianLife } from "rules/PedestrianLife";
import { CorrosionOfConformity } from "rules/CorrosionOfConformity";
import { SnowLife } from "rules/SnowLife";
import { JUEGO } from "src/JUEGO";
import { Serviettes } from "rules/Serviettes";
import { EmptyRule } from "rules/Empty";
import { Geology } from "rules/Geology";
import { ConcreteNextGenStrategy } from "src/app/ConcreteNextGenStrategy";
import { Life } from "src/app/Life";
import { ConcreteRandomMatrixStrategy } from "src/app/ConcreteRandomMatrixStrategy";
import { GliderCreationStrategy } from "src/app/glider-creation-strategy";
import { GliderNextGenStrategy } from "src/app/GliderNextGenStrategy";
import { ConcreteNextMatrixStrategy } from "src/app/ConcreteNextMatrixStrategy";
import { LifeNextMatrixStrategy } from "src/app/life-next-matrix-strategy.ts";




export class ConcreteShapeFactory implements ShapeFactory {



    createMilitary3(filas: number, columnas: number): Automata {
        let cube = this.createMilitaryCube(filas, columnas);
        for (let i = 0; i < 20; i++) {
            cube.downMilitary();
        }
        return cube;
    }
    createAntiLifeRule(): Rule {
        throw new Error("Method not implemented.");
    }
    createInverseLifeRule(): Rule {
        throw new Error("Method not implemented.");
    }
    HTreesRule(): Rule {
        throw new Error("Method not implemented.");
    }
    Fredkin(): Rule {
        throw new Error("Method not implemented.");
    }
    LiveFreeOrDie(): Rule {
        throw new Error("Method not implemented.");
    }
    serviettes(): Rule {
        return new Serviettes();
    }

    geologyRule(): Rule {
        return new Geology();
    }

    emptyRule(): Rule {
        return new EmptyRule();
    }
    Iceballs(): Rule {
        throw new Error("Method not implemented.");
    }
    DotLife(): Rule {
        throw new Error("Method not implemented.");
    }
    Flock(): Rule {
        throw new Error("Method not implemented.");
    }
    Mazectric(): Rule {
        return new Mazectric();
    }
    SnowLife(): Rule {
        return new SnowLife();
    }
    CorrosionOfConformity(): Rule {
        return new CorrosionOfConformity();
    }
    LowLife(): Rule {
        throw new Error("Method not implemented.");
    }
    EightLife(): Rule {
        throw new Error("Method not implemented.");
    }
    Bacteria(): Rule {
        throw new Error("Method not implemented.");
    }
    Blinkers(): Rule {
        throw new Error("Method not implemented.");
    }
    Assimilation(): Rule {
        throw new Error("Method not implemented.");
    }
    LongLife(): Rule {
        throw new Error("Method not implemented.");
    }
    Gems(): Rule {
        throw new Error("Method not implemented.");
    }
    GemsMinor(): Rule {
        throw new Error("Method not implemented.");
    }
    LandRush(): Rule {
        throw new Error("Method not implemented.");
    }
    Bugs(): Rule {
        throw new Error("Method not implemented.");
    }
    Holstein(): Rule {
        throw new Error("Method not implemented.");
    }
    Amoeba(): Rule {
        throw new Error("Method not implemented.");
    }
    PseudoLife(): Rule {
        throw new Error("Method not implemented.");
    }
    BlinkerLife(): Rule {
        throw new Error("Method not implemented.");
    }
    LogarithmicReplicatorRule(): Rule {
        throw new Error("Method not implemented.");
    }
    SlowBlob(): Rule {
        throw new Error("Method not implemented.");
    }
    Stains(): Rule {
        throw new Error("Method not implemented.");
    }
    LowDeath(): Rule {
        throw new Error("Method not implemented.");
    }
    MazectricWithMice(): Rule {
        return new MazectricWithMice();
    }
    MazeWithMice(): Rule {
        return new MazeWithMice();
    }
    DryLife(): Rule {
        throw new Error("Method not implemented.");
    }
    PlowWorld(): Rule {
        throw new Error("Method not implemented.");
    }
    PedestrianLife(): Rule {
        return new PedestrianLife();
    }
    HoneyLife(): Rule {
        throw new Error("Method not implemented.");
    }
    ElectrifiedMaze(): Rule {
        throw new Error("Method not implemented.");
    }
    OscilatorsRule(): Rule {
        throw new Error("Method not implemented.");
    }
    Majority(): Rule {
        throw new Error("Method not implemented.");
    }
    crearTierra(): Elemento {
        let elementoTierra = new ConcreteElement();
        elementoTierra.setRule(this.createLifeRule());
        elementoTierra.setName('tierra');

        elementoTierra.setPrimaryColor('Brown');
        elementoTierra.setSecondaryColor('Brown');
        elementoTierra.setTerciaryColor('Brown');

        return elementoTierra;
    }
    crearMar(): Elemento {
        let mar = new ConcreteElement();
        mar.setRule(this.createLifeRule());
        mar.setPrimaryColor('Blue');
        mar.setSecondaryColor('Blue');
        mar.setTerciaryColor('Blue');
        return mar;
    }
    crearCiudad(): Elemento {
        let ciudad = new ConcreteElement();
        ciudad.setRule(this.createLifeRule());
        ciudad.setPrimaryColor('Gray');
        ciudad.setSecondaryColor('Gray');
        ciudad.setTerciaryColor('Gray');
        return ciudad;
    }
    crearVegetacion(): Elemento {
        let vegetacion = new ConcreteElement();
        vegetacion.setRule(this.createLifeRule());
        vegetacion.setPrimaryColor('Green');
        vegetacion.setSecondaryColor('Green');
        vegetacion.setTerciaryColor('Green');
        return vegetacion;
    }
    createMoveRule(): Rule {
        return new Move();
    }
    createWalledCityRule(): Rule {
        return new WalledCity();
    }
    createGnarlRule(): Rule {
        return new Gnarl();
    }
    createMazeRule(): Rule {
        return new Maze();
    }
    createCoagulationRule(): Rule {
        return new Coagulations();
    }
    createCoralRule(): Rule {
        return new Coral();
    }
    createSeedsRule(): Rule {
        return new Seeds();
    }
    createLifeWithoutDeathRule(): Rule {
        return new LifeWithoutDeath();
    }
    create34LifeRule(): Rule {
        return new Life34();
    }
    create2x2Rule(): Rule {
        return new TwoXTwo();
    }
    createHighLifeRule(): Rule {
        return new HighLife();
    }
    createDayAndNightRule(): Rule {
        return new DayAndNight();
    }
    createMorleyRule(): Rule {
        return new Morley();
    }
    createAnnealRule(): Rule {
        return new Anneal();
    }
    createReplicatorRule(): Rule {
        return new Replicator();
    }
    createDiademaRule(): Rule {
        throw new Error("Method not implemented.");
    }
    createBloque(p0: Point, p1: Point, p2: Point, p3: Point): Bloque {
        throw new Error('No implementado');

    }

    createCavalier(): Automata {
        throw new Error("Method not implemented.");
    }

    configureCube(cube: Automata): void {
        cube.setPoint4(
            this.createPoint(
                cube.getPoint().getX() + cube.getLargoCelula(),
                cube.getRectaAD().calcularPendiente() * (cube.getPoint().getX() + cube.getLargoCelula()) + cube.getRectaAD().intereseccionEnEjeY().getY())
        );

        cube.setPoint5(
            this.createPoint(cube.getPoint2().getX() + cube.getLargoCelula(),
                cube.getRectaBC().calcularPendiente() * (cube.getPoint2().getX() + cube.getLargoCelula()) + cube.getRectaBC().intereseccionEnEjeY().getY())
        );

        cube.setPoint6(this.createPoint(
            cube.getPoint1().getX() + cube.getAnchoCelula(),
            cube.getRectaBD().calcularPendiente() * (cube.getPoint1().getX() + cube.getAnchoCelula()) + cube.getRectaBD().intereseccionEnEjeY().getY())
        );

        cube.setPoint7(this.createPoint(
            cube.getPoint3().getX() + cube.getAnchoCelula(),
            cube.getRectaAC().calcularPendiente() * (cube.getPoint3().getX() + cube.getAnchoCelula()) + cube.getRectaAC().intereseccionEnEjeY().getY())
        );
    }

    crearEcosistema(filas: number, columnas: number): Automata {
        let pointA = this.createPoint(240, 50);
        let pointB = this.createPoint(240, 30);
        let pointC = this.createPoint(280, 40);
        let pointD = this.createPoint(200, 40);

        let cube = this.createCube(pointA, pointB, pointC, pointD, filas, columnas);

        cube.addElement(this.crearMar());
        cube.addElement(this.crearTierra());
        cube.addElement(this.crearVegetacion());
        cube.addElement(this.crearCiudad());

        cube.setGreenRule(this.createLifeRule());
        cube.setGrayRule(this.createLifeRule());
        cube.setBrownRule(this.createLifeRule());
        cube.setBlueRule(this.createLifeRule());

        cube.setRule(this.createDiamoebaRule());

        return cube;


    }

    ecosistema(filas: number, columnas: number): Automata {
        let cube = this.createMilitaryCube(filas, columnas);
        cube.setNextGenStrategy(new Life());
        cube.setGreenRule(this.MazectricWithMice());
        cube.setBrownRule(this.MazeWithMice());
        cube.setBlueRule(this.createReplicatorRule());
        cube;

        return cube;


    }
    ecosistema2(filas: number, columnas: number): Automata {
        let cube = this.createMilitaryCube(filas, columnas);
        cube.setNextGenStrategy(new Life());
        // cube.setGreenRule(this.createLifeRule());
        cube.setBlueRule(this.create34LifeRule());
        cube.setBrownRule(this.createLifeRule());
        // cube.setBlueRule(this.createLifeRule())
        cube;

        return cube;


    }

    coagulation(filas: number, columnas: number): Automata {
        let cube = this.createMilitaryCube(filas, columnas);
        cube.setNextGenStrategy(new Life());
        // cube.setGreenRule(this.createLifeRule());
        cube.setGreenRule(this.createCoralRule());
        cube.setBrownRule(this.createReplicatorRule());
        // cube.setBlueRule(this.createLifeRule())
        cube;

        return cube;


    }

    createMilitary2(filas: number, columnas: number): Automata {
        let cube = this.createMilitaryCube(filas, columnas);
        for (let i = 0; i < 10; i++) {
            cube.downMilitary();
        }
        return cube;
    }

    createGlider(filas: number, columnas: number): Automata {

        let pointA = this.createPoint(240, 50);
        let pointB = this.createPoint(240, 30);

        let pointC = this.createPoint(280, 40);
        let pointD = this.createPoint(200, 40);



        let automata = this.createCube(pointA, pointB, pointC, pointD, filas, columnas);

        automata.setMatrizActiva(automata.createRandomMatriz());


        automata.setSelectedProjection('military');

        automata.setAltoCelula(JUEGO.CELULA.ALTO);
        automata.setAnchoCelula(JUEGO.CELULA.ANCHO);
        automata.setLargoCelula(JUEGO.CELULA.LARGO);

        automata.setPoint(this.createPoint(0, 40));
        automata.setPoint1(this.createPoint(0, 40));
        automata.setPoint2(this.createPoint(40, 30));
        automata.setPoint3(this.createPoint(40, 50));

        this.configureCube(automata);

        automata.setAnchoLienzo(JUEGO.ANCHO_LIENZO);
        automata.setAltoLienzo(JUEGO.ALTO_LIENZO);
        automata.setAvance(60);
        automata.setShowAuxiliaryLines(JUEGO.AUXILIARY_LINES);

        automata.upMilitary(JUEGO.MILITAR_DEFAULT);

        for (let i = 0; i < 180; i++) {
            automata.down();
        }
        for (let i = 0; i < 180; i++) {
            automata.derecha();
        }

        // cube.clean(); // esto se usa o no , no estoy seguro de si sirve para algo ? // creo que no se usa para nada
        automata.setScale(JUEGO.CELULA.SCALE);



        // cube.setMatrizActiva(cube.createRandomMatriz())
        return automata;


    }

    configureIsometricSettings(filas: number, columnas: number): Automata {
        // esto aplica solo para la vista isometrica 
        let pointA = this.createPoint(240, 50);
        let pointB = this.createPoint(240, 30);

        let pointC = this.createPoint(280, 40);
        let pointD = this.createPoint(200, 40);



        // creo que tambien aplica solo para la vista isometrica 
        let cube = this.createCube(pointA, pointB, pointC, pointD, filas, columnas);


        // esto tambien aplica solo para la vista isometrica 
        cube.setSelectedProjection('military');

        cube.setAltoCelula(JUEGO.CELULA.ALTO);
        cube.setAnchoCelula(JUEGO.CELULA.ANCHO);
        cube.setLargoCelula(JUEGO.CELULA.LARGO);

        // esto aplica solo para la vista isometrica
        cube.setPoint(this.createPoint(0, 40));
        cube.setPoint1(this.createPoint(0, 40));
        cube.setPoint2(this.createPoint(40, 30));
        cube.setPoint3(this.createPoint(40, 50));

        // todo esto aplica solo para la vista isometrica 
        this.configureCube(cube);

        cube.setAnchoLienzo(JUEGO.ANCHO_LIENZO);
        cube.setAltoLienzo(JUEGO.ALTO_LIENZO);
        cube.setAvance(60);
        cube.setShowAuxiliaryLines(JUEGO.AUXILIARY_LINES);

        cube.upMilitary(JUEGO.MILITAR_DEFAULT);

        for (let i = 0; i < 150; i++) {
            cube.down();
        }
        for (let i = 0; i < 350; i++) {
            cube.derecha();
        }

        // cube.clean(); // esto se usa o no , no estoy seguro de si sirve para algo ? // creo que no se usa para nada
        //isometrica 
        cube.setScale(JUEGO.CELULA.SCALE);

        return cube;

    }

    createMilitaryCube(filas: number, columnas: number): Automata {

        let automata = this.configureIsometricSettings(filas, columnas);
        // automata.setMatrixCreationStrategy(new ConcreteRandomMatrixStrategy())
        // automata.setMatrixCreationStrategy(new ConcreteRandomMatrixStrategy())
        automata.setMatrixCreationStrategy(new ConcreteRandomMatrixStrategy());
        // nextGenStrategy: NextGenStrategy //= new ConcreteNextGenStrategy();
        automata.setNextGenStrategy(new ConcreteNextGenStrategy());
        automata.setNextMatrixStrategy(new ConcreteNextMatrixStrategy(automata));

        automata.setMatrizActiva(automata.createRandomMatriz());
        automata.setScale(4)

for (let i = 0; i < 150; i++) {
            automata.left();
            
        }
        return automata;
    }

    createGliderStrategy(filas: number, columnas: number): Automata {

        let automata = this.configureIsometricSettings(filas, columnas);

        automata.setMatrixCreationStrategy(new GliderCreationStrategy());
        automata.setNextGenStrategy(new GliderNextGenStrategy());
        automata.setNextMatrixStrategy(new LifeNextMatrixStrategy(automata));
        //= new ConcreteNextMatrixStrategy(this);
        automata.setMatrizActiva(automata.createRandomMatriz());

        return automata;


    }

    createDiamoebaRule() {
        return new Diamoeba();
    }
    crearTablero(cube: Automata, largo: number, ancho: number) {
        for (let j = 0; j < largo; j++) {
            for (let i = 0; i < ancho; i++) {


                const n = Math.floor(Math.random() * 10);
                if (n % 2 == 0) {
                    // cube.crearBloque();
                }
            }
            for (let i = 0; i < ancho; i++) {
                cube.right();
            }
            cube.down();
        }
        for (let i = 0; i < largo; i++) {
            cube.up();
        }
    }
    createTrimetricCube(): Automata {
        throw new Error("Method not implemented.");
    }

    createLifeRule(): Rule {
        return new LifeRule();
    }

    createCavalierCube(filas: number, columnas: number): Automata {

        let pointA = this.createPoint(13, 58);
        let pointB = this.createPoint(91, 9);
        let pointC = this.createPoint(116, 55);
        let pointD = this.createPoint(2, 11);
        let cube = this.createCube(pointA, pointB, pointC, pointD, filas, columnas);
        cube.setSelectedProjection('cavalier');
        cube.setHeight(4);
        cube.setFilas(100);
        cube.setColumnas(100);
        return cube;
    }


    createCabinetCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point, filas: number, columnas: number): Automata {
        return this.createCube(pointA, pointB, pointC, pointD, filas, columnas);
    }


    createCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point, filas: number, columnas: number): Automata {
        let cube = new ConcreteAutomata(pointA, pointB, pointC, pointD);

        cube.setPoint(this.createPoint(0, 40));
        cube.setPoint1(this.createPoint(0, 40));
        cube.setPoint2(this.createPoint(40, 30));
        cube.setPoint3(this.createPoint(40, 50));


        this.configureCube(cube);

        cube.setFilas(filas);
        cube.setColumnas(columnas);
        cube.setSelectedProjection('military');

        cube.setAltoCelula(JUEGO.CELULA.ALTO);
        cube.setAnchoCelula(JUEGO.CELULA.ANCHO);
        cube.setLargoCelula(JUEGO.CELULA.LARGO);


        cube.setAnchoLienzo(JUEGO.ANCHO_LIENZO);
        cube.setAltoLienzo(JUEGO.ALTO_LIENZO);
        cube.setAvance(50);
        cube.setShowAuxiliaryLines(JUEGO.AUXILIARY_LINES);

        cube.upMilitary(JUEGO.MILITAR_DEFAULT);

        for (let i = 0; i < 80; i++) {
            cube.down();
        }
        for (let i = 0; i < 80; i++) {
            cube.derecha();
        }

        cube.clean(); // esto se usa o no , no estoy seguro de si sirve para algo ?


        cube.setScale(JUEGO.CELULA.SCALE);



        // cube.setMatrizActiva(cube.createRandomMatriz())
        cube.setRule(this.createLifeRule());





        return cube;
    }
    createCircle(center: Point, radius: number): Circle {
        return new ConcreteCircle(center, radius);
    }
    createTriangle(pointA: Point, pointB: Point, pointC: Point): Triangle {
        throw new Error("Method not implemented.");
    }
    createQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Quadrilateral {
        throw new Error("Method not implemented.");
    }
    createLine(pointA: Point, pointB: Point): Line {
        try {

            return new ConcreteLine(pointA, pointB);
        } catch (error) {

            throw new Error("error no s e ecuentra valor en pointA o pointB");
        }
    }

    createPoint(x: number, y: number): Point {
        return new ConcretePoint(x, y);
    }

}
