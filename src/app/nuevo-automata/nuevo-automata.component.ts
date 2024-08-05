import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'ConcreteShapeFactory.1';
import { FabricaDeLienzos } from '../lienzos/fabrica-de-lienzos';
import { FabricaDeFunciones } from '../lienzos/fabrica-de-funciones';
import { Lienzo } from '../lienzos/lienzo';
import { FabricaDeLienzosConcreta } from '../lienzos/fabrica-de-lienzos-concreta';
import { FabricaDeFuncionesConcreta } from '../lienzos/fabrica-de-funciones-concreta';



@Component({
  selector: 'app-nuevo-automata',
  templateUrl: './nuevo-automata.component.html',
  styleUrls: ['./nuevo-automata.component.styl']
})
export class NuevoAutomataComponent implements OnInit {

  factory2 = new ConcreteShapeFactory()

  automata = this.factory2.createMilitaryCube(100, 100)

  constructor() { }

  ngOnInit(): void {
  }

}
