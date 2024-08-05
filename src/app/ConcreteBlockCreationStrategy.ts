import { BloqueConcreto } from "bloque-concreto";
import { Automata } from "cube";
import { ShapeFactory } from "shapeFactory";
import { BlockCreationStrategy } from "./BlockCreationStrategy";


export class ConcreteBlockCreationStrategy implements BlockCreationStrategy {

    shapeFactory: ShapeFactory;
    automata: Automata;

    constructor(automata: Automata, shapeFactory: ShapeFactory) {
        this.automata = automata;
        this.shapeFactory = shapeFactory;
    } 

    create(data: { state: number; color: string; }, altura: number): void {

        let lineP4P5 = this.shapeFactory.createLine(this.automata.getPoint4(), this.automata.getPoint5());
        let lineP1P3 = this.shapeFactory.createLine(this.automata.getPoint1(), this.automata.getPoint3());

        let lineP6P7 = this.shapeFactory.createLine(this.automata.getPoint6(), this.automata.getPoint7());
        let lineP0P2 = this.shapeFactory.createLine(this.automata.getPoint(), this.automata.getPoint2());

        let p0 = this.automata.getInterseccion(lineP4P5, lineP1P3);
        let p1 = this.automata.getInterseccion(lineP4P5, lineP6P7);
        let p2 = this.automata.getInterseccion(lineP1P3, lineP0P2);
        let p3 = this.automata.getInterseccion(lineP0P2, lineP6P7);

        this.automata.addBloque(new BloqueConcreto(p2, p0, p1, p3, data, altura));


    }

}