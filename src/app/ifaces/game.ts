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


        // a.addChild(e1)
        // a.addChild(e2)

        // e1.addChild(e3);
        // e1.addChild(e4);

        // e2.addChild(e5)
        // e2.addChild(e6)
        a.agregarHojas();
        a.setAutomatas()


    // setInterval(() => {
    // a.avanzarUnaGeneracion()

    //   points.push([this.generacion, this.raiz.average() ])
    //   this.azules.push([this.generacion, this.raiz.azules() ])
    //   this.rojos.push([this.generacion, this.raiz.rojos() ])
    //   this.verdes.push([this.generacion, this.raiz.verdes() ])
    //   this.cafes.push([this.generacion, this.raiz.cafes() ])
    //   this.grises.push([this.generacion, this.raiz.grises() ])

    //   a.generacion += 1;

    // },JUEGO.INTERVALO_GENERACION)



        return a;
    }

    superPlanta() : Nodo {

        let a = this.crearGrupoCelula();
        a.addChild(this.crearPlanta())
        a.addChild(this.crearPlanta())
        a.setAutomatas();
        return a ;
    }

    megaPlanta(): Nodo {
        let a = this.crearGrupoCelula();
        a.addChild(this.superPlanta())
        a.addChild(this.superPlanta())

        a.setAutomatas();
        return a;
    }

    megaPlanta2(): Nodo {
        let a = this.crearGrupoCelula();

        a.addChild(this.megaPlanta())
        a.addChild(this.megaPlanta())
        a.setAutomatas();
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