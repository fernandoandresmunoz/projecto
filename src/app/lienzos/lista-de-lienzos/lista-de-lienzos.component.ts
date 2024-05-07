import { Component, OnInit } from '@angular/core';
import { ListaDeLienzos } from '../lista-de-lienzos';
import { Lienzo } from '../lienzo';
import { FabricaDeListaDeLienzos } from '../fabrica-de-lista-de-lienzos';
import { FabricaDeListaDeLienzosConcreta } from '../fabrica-de-lista-de-lienzos-concreta';

@Component({
  selector: 'app-lista-de-lienzos',
  templateUrl: './lista-de-lienzos.component.html',
  styleUrls: ['./lista-de-lienzos.component.styl']
})
export class ListaDeLienzosComponent implements OnInit, ListaDeLienzos {

  fabricaDeListaDeLienzos: FabricaDeListaDeLienzos = new FabricaDeListaDeLienzosConcreta()

  listaDeLienzos: ListaDeLienzos = this.fabricaDeListaDeLienzos.crear()

  constructor() { }
  agregarLienzo(lienzo: Lienzo): void {
    throw new Error('Method not implemented.');
  }
  getLienzos(): Lienzo[] {
    return this.listaDeLienzos.getLienzos()
  }

  ngOnInit(): void {
  }

}
