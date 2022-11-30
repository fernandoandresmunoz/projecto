import { BloqueConcreto } from "bloque-concreto";
import { Cube as Automata } from "cube";
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

        //   let p4 = this.shapeFactory.createPoint(p0.getX(), p0.getY() - 5)
        //   let p5 = this.shapeFactory.createPoint(p1.getX(), p1.getY() - 5)
        //   let p6 = this.shapeFactory.createPoint(p2.getX(), p2.getY() - 5)
        //   let p7 = this.shapeFactory.createPoint(p3.getX(), p3.getY() - 5)

        this.automata.addPunto([
            [p2.getX(), p2.getY()],
            [p0.getX(), p0.getY()],
            [p1.getX(), p1.getY()],
            [p3.getX(), p3.getY()],

        ])

        //   this.addBloque(new BloqueConcreto(p2, p0, p1, p3,  Math.floor(Math.random() * 20) + 1 ));

        this.automata.addBloque(new BloqueConcreto(p2, p0, p1, p3, data, this.automata.getAltoCelula()));
        //   localStorage.setItem('data', JSON.stringify({ 'points': this.getPuntos() }));
        // this.addPunto([this.puntoCelula.getX(), p0.getY()]);


    }

}