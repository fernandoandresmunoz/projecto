import { FabricaDeFunciones } from "./fabrica-de-funciones";
import { FabricaDeFuncionesConcreta } from "./fabrica-de-funciones-concreta";
import { FabricaDeLienzos } from "./fabrica-de-lienzos";
import { FabricaDeLienzosConcreta } from "./fabrica-de-lienzos-concreta";
import { FabricaDeListaDeLienzos } from "./fabrica-de-lista-de-lienzos";
import { Lienzo } from "./lienzo";
import { ListaDeLienzos } from "./lista-de-lienzos";
import { ListaDeLienzosConcreta } from "./lista-de-lienzos-concreta";
import {Function as Funcion} from './function'

export class FabricaDeListaDeLienzosConcreta implements FabricaDeListaDeLienzos {

    fabricaRapida2(
        title: string = "",
         funcion: (x: number) => number,
         desdeY: number=-3,
         hastaY: number=3,
         desdeX: number = -3,
         hastaX: number =3 
         ): Lienzo {
        const fabricaLienzos: FabricaDeLienzos = new FabricaDeLienzosConcreta()
        const fabricaDeFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()

        const ALTO_RECTANGULO = 800;
        const ANCHO_RECTANGULO = 800;
        const HASTA_EJE_X = hastaX;
        const DESDE_EJE_X = desdeX

        let lienzo = fabricaLienzos.crear(title,
            ANCHO_RECTANGULO,
            ALTO_RECTANGULO,
            desdeX,
            hastaX,
            desdeY,
            hastaY,
            'blue',
            [

                fabricaDeFunciones.crear(  funcion , 'red'),
            ]
        )
        return lienzo;
    }



    fabricaRapida(
        title: string = "",
         funcion: Funcion,
         desdeY: number,
         hastaY: number,
         desdeX: number = 0,
         hastaX: number = 260
         ): Lienzo {
        const fabricaLienzos: FabricaDeLienzos = new FabricaDeLienzosConcreta()
        const fabricaDeFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()

        const ALTO_RECTANGULO = 300;
        const ANCHO_RECTANGULO = 1600;
        const HASTA_EJE_X = hastaX;
        const DESDE_EJE_X = desdeX

        let lienzo = fabricaLienzos.crear(title,
            ANCHO_RECTANGULO,
            ALTO_RECTANGULO,
            DESDE_EJE_X,
            HASTA_EJE_X,
            desdeY,
            hastaY,
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
            this.fabricaRapida2(
                "f(x) = x**2 ",
                x => { return x**2} ,


            ),

            // this.fabricaRapida2(
            //     'sin(x) + sin(x * 10/7)',
            //     x => { return Math.sin(x) + Math.sin(x * 10 / 7) } ,
            //     -2.2,
            //     2.2,
            // )
            // ,

            this.fabricaRapida(
                'sen(x) + sen(x  √2 )',
                fabricaDeFunciones.crear(x => { return Math.sin(x) + Math.sin(x * Math.sqrt(2)) }, 'blue'),
                -2.2,
                2.2,
            )
            ,

            this.fabricaRapida(
                'sen(x) + sen(x √2 ) + sen(x √3) ',
                fabricaDeFunciones.crear(x => { return Math.sin(x) + Math.sin(x * Math.sqrt(2)) + Math.sin(x * Math.cbrt(3)) }, 'green'),
                -3.5,
                3.5,
            ),

            this.fabricaRapida(
                'cos(x) - cos((1 + √2 )  x)',
                fabricaDeFunciones.crear(x => { return Math.cos(x) - Math.cos((1 + Math.sqrt(2)) * x) }, 'green'),
                -2.4,
                2.4,
                0,
                160
            )
            ,

            this.fabricaRapida(
                'cos(x) - cos((2 + √5 ) x ',
                fabricaDeFunciones.crear(x => { return Math.cos(x) - Math.cos((2 + Math.sqrt(5)) * x) }, 'green'),
                -2.4,
                2.4,
                0,
                120
            )
,

            this.fabricaRapida(
                '1',
                fabricaDeFunciones.crear(x => { return 1 }, 'green'),
                -3,
                3,
                -3,
               3
            )
        ]

        for (let lienzo of lienzos) {
            listaDeLienzos.agregarLienzo(lienzo)
        }

        return listaDeLienzos;
    }
}
