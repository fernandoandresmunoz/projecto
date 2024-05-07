import { Component, OnInit } from '@angular/core';
import { Lienzo } from '../../lienzo';
import { FabricaDeLienzos } from '../../fabrica-de-lienzos';
import { FabricaDeLienzosConcreta } from '../../fabrica-de-lienzos-concreta';

@Component({
  selector: 'app-graficadora2',
  templateUrl: './graficadora2.component.html',
  styleUrls: ['./graficadora2.component.styl']
})
export class Graficadora2Component implements OnInit {

  fabrica: FabricaDeLienzos = new FabricaDeLienzosConcreta()
  // lienzo: Lienzo = this.fabrica.crear();
  constructor() { }

  ngOnInit(): void {
  }

}
