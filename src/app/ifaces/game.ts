import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Celula } from "src/Celula";
import { GrupoCelulas } from "src/GrupoCelula";
import { JUEGO } from "src/JUEGO";
import { Nodo } from "src/Nodo";




export class Factory {

    crearRack() : Nodo {
        let raiz = new GrupoCelulas();

        for ( let i = 0 ; i < 4; i++) {
            raiz.addChild(new GrupoCelulas())
        }

        for ( let i = 0 ; i < raiz.getChildren().length ; i ++) {
            // cel.setAutomatas()
            for ( let j = 0 ; j < 10; j ++) {

                let cel = new Celula()
                raiz.getChildren()[i].addChild(cel)
            }
        }
        raiz.setAutomatas()
        
        return raiz;

    }

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

        // if (JUEGO.PISOS !== 1) {
        //     a.addChild(b);
        //     a.addChild(c)
        // }
        // if (JUEGO.PISOS === 2) {

        //     a.agregarHijos();
        // } else if (JUEGO.PISOS === 3) {

        //     a.agregarHijos();
        //     a.agregarHijos();
        // }
        b.agregarHijos();
        c.agregarHojas();
        a.setAutomatas()
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
        a.setAutomatas()
        return a;
    
    }




    crearRed() : Nodo {
        let red = this.crearGrupoCelula();
        // capa 1
        let b = this.crearGrupoCelula();
        let c = this.crearGrupoCelula();
        red.addChild(b);
        red.addChild(c);


        // capa 2 

        let d = this.crearGrupoCelula() 
        let e =  this.crearGrupoCelula()
        let f = this.crearGrupoCelula()

        b.addChild(d);
        b.addChild(e);
        b.addChild(f);

        c.addChild(d);
        c.addChild(e);
        c.addChild(f);

        // capa 3 
        let g = this.crearGrupoCelula() 
        let h =  this.crearGrupoCelula()
        let i = this.crearGrupoCelula()

        d.addChild(g);
        d.addChild(h);
        d.addChild(i);

        e.addChild(g);
        e.addChild(h);
        e.addChild(i);

        f.addChild(g);
        f.addChild(h);
        f.addChild(i);

        // capa 4.
        
        let j = this.crearCelula();
        let k = this.crearCelula();
        let l = this.crearCelula();

        g.addChild(j)
        g.addChild(k)
        g.addChild(l)

        h.addChild(j)
        h.addChild(k)
        h.addChild(l)

        i.addChild(j)
        i.addChild(k)
        i.addChild(l)


        // const celulaComun = this.crearCelula()
        // b.addChild(celulaComun)
        // c.addChild(celulaComun)

        // red.agregarHojas();
        red.setAutomatas();


        return  red
    }

    crearPlanta(): Nodo {

        let a = this.crearGrupoCelula();
        
        let b = this.crearGrupoCelula()
        let c = this.crearGrupoCelula()


        a.addChild(b)
        a.addChild(c)
        c.agregarHojas()
        // b.addChild(this.crearGrupoCelula())
        // b.addChild(this.crearGrupoCelula())

        // c.addChild(this.crearGrupoCelula())
        // c.addChild(this.crearGrupoCelula())


        // a.addChild(this.superPlanta())
        // a.addChild(this.superPlanta())
        // a.agregarHojas()
        // // a.addChild(this.megaPlanta2())
        // a.agregarHojas()
        // a.setAutomatas()

        // a.setAutomatas()

        return a;
    }

    superPlanta() : Nodo {
        let a = this.crearGrupoCelula();
        // a.setAutomatas();
        return a ;
    }

    megaPlanta(): Nodo {
        let a = this.crearGrupoCelula();
        a.addChild(this.superPlanta())
        a.addChild(this.superPlanta())
        a.agregarHojas()

        a.setAutomatas();
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