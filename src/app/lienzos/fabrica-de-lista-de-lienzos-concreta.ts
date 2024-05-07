import { FabricaDeFunciones } from "./fabrica-de-funciones";
import { FabricaDeFuncionesConcreta } from "./fabrica-de-funciones-concreta";
import { FabricaDeLienzos } from "./fabrica-de-lienzos";
import { FabricaDeLienzosConcreta } from "./fabrica-de-lienzos-concreta";
import { FabricaDeListaDeLienzos } from "./fabrica-de-lista-de-lienzos";
import { Lienzo } from "./lienzo";
import { ListaDeLienzos } from "./lista-de-lienzos";
import { ListaDeLienzosConcreta } from "./lista-de-lienzos-concreta";
import {Function as Funcion} from './function'

export class FabricaDeListaDeLienzosConcreta  implements FabricaDeListaDeLienzos{

    fabricaRapida(title: string, funcion: Funcion, desdeY: number, hastaY: number): Lienzo {
        const fabricaLienzos: FabricaDeLienzos = new FabricaDeLienzosConcreta()
        const fabricaDeFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()


        const ALTO_RECTANGULO = 300;
        const ANCHO_RECTANGULO = 1600;
        const HASTA_EJE_X = 260;
        const DESDE_EJE_X = 0



let lienzo = fabricaLienzos.crear( title ,
            ANCHO_RECTANGULO,
            ALTO_RECTANGULO,
            DESDE_EJE_X,
            HASTA_EJE_X,
            -3,
            3,
            'blue',
            [
                funcion
            ]
        )
        return lienzo;
    }
    crear(): ListaDeLienzos {

        const fabricaLienzos: FabricaDeLienzos = new FabricaDeLienzosConcreta()
        const fabricaDeFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()

        const ALTO_RECTANGULO = 300;
        const ANCHO_RECTANGULO = 1600;
        const HASTA_EJE_X = 260;

        let listaDeLienzos: ListaDeLienzos = new ListaDeLienzosConcreta();

        let lienzos = [
            this.fabricaRapida(
                'sin(x) + sin(x * 3/2)',
                fabricaDeFunciones.crear(x => {return Math.sin(x) + Math.sin(x * 3/ 2)}, 'red'),
                -2.2,
                2.2,
            ),

            this.fabricaRapida(
                'sin(x) + sin(x * 10/7)',
                fabricaDeFunciones.crear(x => { return Math.sin(x) + Math.sin(x * 10/ 7) }, 'green'),
                -2.2,
                2.2,
            )
,

            this.fabricaRapida(
                'sen(x) + sen(x  √2 )',
                fabricaDeFunciones.crear(x => {return Math.sin(x) + Math.sin(x * Math.sqrt(2))}, 'blue'),
                -2.2,
                2.2,
            )
,

            this.fabricaRapida(
                'sen(x) + sen(x √2 ) + sen(x √3) ',
                fabricaDeFunciones.crear(x => {return Math.sin(x) + Math.sin(x * Math.sqrt(2)) + Math.sin(x * Math.cbrt(3))}, 'green'),
                -3.5,
                3.5,
            ),

            this.fabricaRapida(
                'cos(x) - cos((1 + √2 )  x)',
                fabricaDeFunciones.crear(x => {return Math.cos(x) - Math.cos((1 + Math.sqrt(2)) * x)}, 'green'),
                -2.4,
                2.4,
            )
,

            this.fabricaRapida(
                'cos(x) - cos((2 + √5 ) x ',
                fabricaDeFunciones.crear(x => {return Math.cos(x) - Math.cos((2 + Math.sqrt(5)) * x )}, 'green'),
                -2.4,
                2.4,
            )

        ]


        for (let lienzo of lienzos) {
            listaDeLienzos.agregarLienzo(lienzo)
        }
        // listaDeLienzos.agregarLienzo(lienzo1)
        // listaDeLienzos.agregarLienzo(lienzo2)

        // listaDeLienzos.agregarLienzo(fabricaLienzos.crear('primer lienzo',
        //     ANCHO_RECTANGULO,
        //     ALTO_RECTANGULO,
        //     0,
        //     HASTA_EJE_X,
        //     -3,
        //     3,
        //     'blue',
        //     [
        //     fabricaDeFunciones.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) }, 'green')
        //     ]
        // ))

        // listaDeLienzos.agregarLienzo(fabricaLienzos.crear('primer lienzo',
        //     ANCHO_RECTANGULO,
        //     ALTO_RECTANGULO,
        //     0,
        //     HASTA_EJE_X,
        //     -3,
        //     3,
        //     'blue',
        //     [
        //     fabricaDeFunciones.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x)}, 'blue')
        //     ]
        // ))


        return listaDeLienzos;
    }
}
