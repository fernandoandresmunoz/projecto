import { CUADRATICA, EXPONENCIAL, EXPONENCIAL_NEGATIVA, EXPONENCIAL_SIMPLE } from "variables";
import { FabricaDeFuncionesConcreta } from "./fabrica-de-funciones-concreta";
import { FabricaDeLienzos } from "./fabrica-de-lienzos";
import { Lienzo } from "./lienzo";
import { LienzoConcreto } from "./lienzo-concreto";
import { FabricaDeFunciones } from "./fabrica-de-funciones";
import { CalculoFuncion, Function as Funcion } from "./function";
import { FuncionCuadratica } from "./funcion-cuadratica";
import { DerivadaConcreta } from "./derivada-concreta";
import { IntegralConcreta } from "./integral-concreta";



class CuadraticaNegativa implements CalculoFuncion {
    funcion(x: number): number {
        return - 1 * x**2 + x + 2 
    }

}

class CuadraticaPositiva implements CalculoFuncion {
    funcion(x: number): number {
        return  1 * x**2 + x + 2 
    }

}

export class FabricaDeLienzosConcreta implements FabricaDeLienzos{

    fabrica: FabricaDeFunciones;

    constructor() {

        this.fabrica = new FabricaDeFuncionesConcreta();
    }
    crear2(title: string,
        anchoLienzo: number,
        altoLienzo: number,
        desdeX: number,
        hastaX: number,
        desdeY: number,
        hastaY: number,
        background: string,
        funciones: ((x: number) => number)[]): Lienzo {

        let lienzo = new LienzoConcreto();
        lienzo.setTitle(title)
        lienzo.setDesdeX(desdeX);
        lienzo.setHastaX(hastaX);
        lienzo.setDesdeY(desdeY)
        lienzo.setHastaY(hastaY)

        lienzo.setAncho(anchoLienzo);
        lienzo.setLargo(altoLienzo);

        for (let funcion of funciones) {
            lienzo.agregarFuncion2(funcion);
        }



        return lienzo;



    }
    crear(title: string, anchoLienzo: number, altoLienzo: number,
        desdeX: number, hastaX: number, desdeY: number,
        hastaY: number, background: string, funciones: Funcion[]): Lienzo {

        let lienzo = new LienzoConcreto();
        lienzo.setTitle(title)
        lienzo.setDesdeX(desdeX);
        lienzo.setHastaX(hastaX);
        lienzo.setDesdeY(desdeY)
        lienzo.setHastaY(hastaY)

        lienzo.setAncho(anchoLienzo);
        lienzo.setLargo(altoLienzo);

        for (let funcion of funciones) {
            lienzo.agregarFuncion(funcion);
        }

        // let f : Funcion = this.fabrica.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) })
        // lienzo.agregarFuncion(f)
        // lienzo.agregarFuncion(this.fabrica.crear(EXPONENCIAL));
        // lienzo.agregarFuncion(this.fabrica.crear(CUADRATICA));



        return lienzo;


    }


    crearExponenciales(): Lienzo {
        let lienzo = new LienzoConcreto();
        lienzo.setAncho(1600);
        lienzo.setLargo(300);

        // let f : Funcion = new FuncionCuadratica((x) => { return x**2 + x +2 })
        // f.setCalculoFuncion(new CuadraticaNegativa())
        let f: Funcion = this.fabrica.crear(x => { return Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) }, 'blue')
        let g: Funcion = this.fabrica.crear(x => { return Math.sin(x) + Math.sin(10 / 7 * x) }, 'blue')
        let h: Funcion = this.fabrica.crear(x => { return Math.sin(x) + Math.sin(3 / 2 * x) }, 'blue')

        // let i : Funcion = this.fabrica.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x)})

        g.setColor('green')
        g.setAncho(2)

        h.setColor('red')
        h.setAncho(2)
        f.setColor('blue')
        // h.setColor('blue')
        // h.agregarIntegral(new IntegralConcreta(-4 , 3))
        // g.agregarIntegral(new IntegralConcreta(0 , 1))


        for (let i = -5; i <= 5; i = i + 0.1) {
            // f.agregarDerivada(new DerivadaConcreta(i));
            // g.agregarDerivada(new DerivadaConcreta(i));
        }

        // i.setColor('red')


        // lienzo.agregarFuncion(f);
        lienzo.agregarFuncion(g);
        // lienzo.agregarFuncion(h)
        // lienzo.agregarFuncion(i)
        // lienzo.agregarFuncion(i)
        // lienzo.agregarFuncion(this.fabrica.crear(EXPONENCIAL_NEGATIVA))

        return lienzo;
    }
    // crear(): Lienzo {

    //     let lienzo = new LienzoConcreto();

    //     let f : Funcion = this.fabrica.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) })
    //     lienzo.agregarFuncion(f)
    //     // lienzo.agregarFuncion(this.fabrica.crear(EXPONENCIAL));
    //     // lienzo.agregarFuncion(this.fabrica.crear(CUADRATICA));



    //     return lienzo;

    // }
}
