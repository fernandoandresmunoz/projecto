import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'ConcreteShapeFactory.1';
import { FabricaDeLienzos } from '../lienzos/fabrica-de-lienzos';
import { FabricaDeFunciones } from '../lienzos/fabrica-de-funciones';
import { Lienzo } from '../lienzos/lienzo';
import { FabricaDeLienzosConcreta } from '../lienzos/fabrica-de-lienzos-concreta';
import { FabricaDeFuncionesConcreta } from '../lienzos/fabrica-de-funciones-concreta';
import { JUEGO } from 'src/JUEGO';
import { Juego } from '../ifaces/game';
import { Automata } from 'cube';



@Component({
  selector: 'app-nuevo-automata',
  templateUrl: './nuevo-automata.component.html',
  styleUrls: ['./nuevo-automata.component.styl']
})
export class NuevoAutomataComponent implements OnInit {

  factory2 = new ConcreteShapeFactory()

  automata: Automata = this.factory2.createMilitaryCube(30, 240)

  constructor() { 
    this.automata.setScale(3)
  }

  ngOnInit(): void {
  }

}
