import { DerivadaConcreta } from "./derivada-concreta";
import { FabricaDeFunciones } from "./fabrica-de-funciones";
import { FuncionCuadratica } from "./funcion-cuadratica";
import { FuncionExponencial } from "./funcion-exponencial";
import { Function } from "./function";
import { IntegralConcreta } from "./integral-concreta";



const EXPONENCIAL = "EXPONENCIAL"
const SENO = "SENO";
const COSENO = "COSENO";
const GAUSS = "GAUSS";
const LOGARITMICA = "LOGARITMICA";
const CUADRATICA = "CUADRATICA"
const POLINOMICA = "POLINOMICA";


export class FabricaDeFuncionesConcreta implements FabricaDeFunciones{
    crear(tipo: string): Function {

        switch (tipo) {
            case CUADRATICA:
                let f = new FuncionCuadratica();

                let integral1 = new IntegralConcreta();
                integral1.setInicioX(1);
                integral1.setFinX(2);
                integral1.setColor('red')

                let integral2 = new IntegralConcreta();
                integral2.setInicioX(-1);
                integral2.setFinX(0);
                integral2.setColor('green')


                f.agregarIntegral(integral1);
                f.agregarIntegral(integral2);
                f.setColor('red')
                return f;

            case EXPONENCIAL:
                let e = new FuncionExponencial();
                e.setColor('blue')
                const integral = new IntegralConcreta();
                integral.setInicioX(-2);
                integral.setFinX(-1);
                integral.setColor('white')

                for ( let i = -5 ; i < 6 ; i = i + 0.1) {

                const derivada1 = new DerivadaConcreta();
                derivada1.setPuntoX(i);
                e.agregarDerivada(derivada1)
                }

                e.agregarIntegral(integral)
                return e;
                
        
            default:
                return new FuncionCuadratica()
        }
        
    }

}
