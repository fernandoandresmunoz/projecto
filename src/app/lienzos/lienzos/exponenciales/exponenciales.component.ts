import { Component, OnInit } from '@angular/core';
import { FabricaDeLienzos } from '../../fabrica-de-lienzos';
import { FabricaDeLienzosConcreta } from '../../fabrica-de-lienzos-concreta';
import { Lienzo } from '../../lienzo';
import { FabricaDeFunciones } from '../../fabrica-de-funciones';
import { FabricaDeFuncionesConcreta } from '../../fabrica-de-funciones-concreta';

@Component({
  selector: 'app-exponenciales',
  templateUrl: './exponenciales.component.html',
  styleUrls: ['./exponenciales.component.styl']
})
export class ExponencialesComponent implements OnInit {

  fabrica: FabricaDeLienzos = new FabricaDeLienzosConcreta()
  fabricaFunciones: FabricaDeFunciones = new FabricaDeFuncionesConcreta()
  lienzo: Lienzo = this.fabrica.crear("Title test", 1600, 300, 0, 260, -3.2, 3.2, 'white',
  [
    this.fabricaFunciones.crear(x => {return  Math.sin(x) + Math.sin(Math.sqrt(2) * x) + Math.sin(Math.cbrt(3) * x) }, 'red'),
    // this.fabricaFunciones.crear(x => { return Math.sin(x) + Math.sin(Math.sqrt(2) * x)}, 'green')
    
  ] );
  constructor() { }

  ngOnInit(): void {
  }

}
