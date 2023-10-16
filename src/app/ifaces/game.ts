import { ConcreteShapeFactory } from "concreteShapeFactory";
import { Celula } from "src/Celula";
import { GrupoCelulas } from "src/GrupoCelula";
import { JUEGO } from "src/JUEGO";
import { Nodo } from "src/Nodo";




export class Factory {
    crearCelula(): Nodo {
        return new Celula();
    }
    crearGrupoCelula(): Nodo {
        return new GrupoCelulas();
    }

    crearArbol2(): Nodo {
        let a = this.crearGrupoCelula();
        let b = this.crearGrupoCelula();
        let c = this.crearGrupoCelula();

        if (JUEGO.PISOS !== 1) {
            a.addChild(b);
            a.addChild(c)
        }
        if (JUEGO.PISOS === 2) {

            a.agregarHijos();
        } else if (JUEGO.PISOS === 3) {

            a.agregarHijos();
            a.agregarHijos();
        }
        a.agregarHojas();
        return a;
    }

    crearArbol3(): Nodo {
        let x = this.crearArbol2();

        return x;
    }

    crearDosRama(): Nodo {
        let a = this.crearGrupoCelula();
        a.addChild(this.crearCelula())
        a.addChild(this.crearCelula())
        return a
    }

    crearCadenaLarga() :Nodo{
        let a = this.crearGrupoCelula();
        let b = this.crearGrupoCelula();
        let c = this.crearGrupoCelula();
        let d = this.crearGrupoCelula();
        let e = this.crearGrupoCelula();
        let f = this.crearGrupoCelula();

        a.addChild(b);
        a.addChild(c);
        a.agregarHojas();
        // a.addChild(b)
        // // ddChild(c)
        // c.addChild(d);
        // d.addChild(e)
        // e.addChild(f);

        // c.addChild(this.crearDosRama())

        // b.addChild(this.crearDosRama())
        // e.addChild(this.crearDosRama());

        // f.addChild(this.crearCelula())

        return a;
    }

    crearSingle() : Nodo{
        let a = this.crearGrupoCelula();
        let b = this.crearCelula()

        a.addChild(b);
        return a;
    
    }

    crearPlanta(): Nodo {

        let a = this.crearGrupoCelula();

        // let b = this.crearGrupoCelula()
        // let c = this.crearGrupoCelula()


        // a.addChild(b)
        // a.addChild(c)
        // b.addChild(this.crearGrupoCelula())
        // b.addChild(this.crearGrupoCelula())

        // c.addChild(this.crearGrupoCelula())
        // c.addChild(this.crearGrupoCelula())


        // // a.addChild(this.superPlanta())
        // // a.addChild(this.megaPlanta2())
        // a.agregarHojas()
        // a.setAutomatas()


        return a;
    }

    superPlanta() : Nodo {

        let a = this.crearGrupoCelula();

        let b= this.crearGrupoCelula();
        let c = this.crearGrupoCelula();

        b.addChild(this.crearGrupoCelula())
        b.addChild(this.crearGrupoCelula())

        c.addChild(this.crearGrupoCelula())
        c.addChild(this.crearGrupoCelula())



        a.addChild(b)
        a.addChild(c)
        // a.setAutomatas();
        return a ;
    }

    megaPlanta(): Nodo {
        let a = this.crearGrupoCelula();
        a.addChild(this.superPlanta())
        a.addChild(this.superPlanta())
        a.agregarHojas()

        // a.setAutomatas();
        return a;
    }

    megaPlanta2(): Nodo {
        let a = this.crearGrupoCelula();

        a.addChild(this.megaPlanta())
        a.addChild(this.megaPlanta())
        a.agregarHojas()
        return a;
    }

    crearArbolito(): Nodo {
        if (JUEGO.SINGLE_MODE === 'ON') {
            let grupoCelula = this.crearGrupoCelula();
            let celula = this.crearCelula();
            grupoCelula.addChild(celula);
            grupoCelula.setAutomatas();
            return grupoCelula
        }
        return this.superPlanta();
    }

}



export interface Game {
    nodos: Nodo[]
    getUmbralBajo(): number;
    setUmbralBajo(umbralBajo: number): void;
    getUmbralAlto(): number;
    setUmbralAlto(umbralAlto: number): void;


}

export class Juego {
    raiz: Nodo;
}