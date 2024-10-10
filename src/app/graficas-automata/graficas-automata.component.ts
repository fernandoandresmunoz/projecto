import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';
import { FabricaDeLienzos } from '../lienzos/fabrica-de-lienzos';
import { FabricaDeFunciones } from '../lienzos/fabrica-de-funciones';
import { Lienzo } from '../lienzos/lienzo';
import { FabricaDeLienzosConcreta } from '../lienzos/fabrica-de-lienzos-concreta';
import { FabricaDeFuncionesConcreta } from '../lienzos/fabrica-de-funciones-concreta';

@Component({
  selector: 'app-graficas-automata',
  templateUrl: './graficas-automata.component.html',
  styleUrls: ['./graficas-automata.component.styl']
})
export class GraficasAutomataComponent implements OnInit {

  @Input() automata: Automata;
  fabrica: FabricaDeLienzos = new FabricaDeLienzosConcreta()
  fabricaFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()
  lienzo: Lienzo ;

  constructor() {
 this.lienzo = this.fabrica.crear("Title test", 1600, 300, 0, 260, -3.2, 3.2, 'white',
  [
    this.fabricaFunciones.crear(x => { return 1  }, 'blue'),
    this.fabricaFunciones.crear(x => { return 2  }, 'blue'),
    // this.fabricaFunciones.crear(x => this.getValuesToPlot().map( x => { return x[1] }), 'red')
    // this.fabricaFunciones.crear(x => this.getValuesToPlot())
    // this.fabricaFunciones.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) }, 'red'),
    // this.fabricaFunciones.crear(x => { return Math.sin(x) + Math.sin(Math.sqrt(2) * x)}, 'green')
    
  ] );



   }

  ngOnInit(): void {
  }

  getValuesToPlot = (): [number, number][] => {
    if (this.automata) {
      return this.automata.dataAzules().slice(1).slice(-5);
    } 
    return []
  }

}
