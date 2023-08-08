import { Bloque } from "bloque";
import { Cube } from "cube";
import { Line } from "line";
import { Point } from "point";
import { Rule } from "rule";
import { Element } from "rules/element";
import { Circle,  Quadrilateral, Triangle } from "src/modelo";

export interface ShapeFactory {
    createLine(pointA: Point, pointB: Point): Line;
    createPoint(x: number, y: number): Point;
    createQuadrilateral(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Quadrilateral;
    createTriangle(pointA: Point, pointB: Point, pointC: Point): Triangle;
    createCircle(center: Point, radius: number): Circle;
    createCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Cube;

    createCabinetCube(pointA: Point, pointB: Point, pointC: Point, pointD: Point): Cube;
    createTrimetricCube(): Cube;
    createCavalier(): Cube;
    createCavalierCube(): Cube;
    createBloque(p0: Point, p1: Point, p2: Point, p3: Point): Bloque; 

    createDiamoebaRule(): Rule;
    createLifeRule(): Rule;
    createReplicatorRule(): Rule;
    createSeedsRule(): Rule;
    createLifeWithoutDeathRule(): Rule;
    create34LifeRule(): Rule;
    create2x2Rule(): Rule;
    createHighLifeRule(): Rule;
    createDayAndNightRule(): Rule;
    createMorleyRule(): Rule;
    createAnnealRule(): Rule;
    createCoagulationRule(): Rule;
    createCoralRule(): Rule;
    createGnarlRule(): Rule;
    createMazeRule(): Rule;
    createMoveRule(): Rule;
    createWalledCityRule(): Rule;
    // new rules

    CorrosionOfConformity(): Rule;
    PedestrianLife(): Rule;
    MazeWithMice(): Rule;
    SnowLife(): Rule;
    MazectricWithMice(): Rule; 
    Mazectric(): Rule;

    crearTierra(): Element;
    crearMar(): Element;
    crearCiudad(): Element;
    crearVegetacion(): Element;

    createMilitaryCube(): Cube;
    createMilitary2(): Cube;
    createMilitary3(): Cube;
    serviettes(): Rule;
    emptyRule(): Rule;
    geologyRule(): Rule;

}