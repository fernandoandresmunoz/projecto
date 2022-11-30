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

    crearPlanta(): Nodo {

        let a = this.crearGrupoCelula();

        let e1 = this.crearGrupoCelula();
        let e2 = this.crearGrupoCelula();
        let e3 = this.crearGrupoCelula();
        let e4 = this.crearGrupoCelula();
        let e5 = this.crearGrupoCelula();
        let e6 = this.crearGrupoCelula();
        let e7 = this.crearGrupoCelula();
        let e8 = this.crearGrupoCelula();


        a.addChild(e1)
        a.addChild(e2)
        // a.addChild(e3)
        // a.addChild(e4)
        // a.addChild(e5)
        // a.addChild(e6)
        // a.addChild(e7)
        // a.addChild(e8)

        a.agregarHojas();

        return a;
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