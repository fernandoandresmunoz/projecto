import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from 'cube';
import { FabricaDeAutomatas } from '../fabrica-de-automatas';
import { FabricaDeAutomatasConcreta } from '../FabricaDeAutomatasConcreta';

@Component({
  selector: 'app-automata1',
  templateUrl: './automata1.component.html',
  styleUrls: ['./automata1.component.styl']
})
export class Automata1Component implements OnInit {

  factory2 = new ConcreteShapeFactory()
  // fabricaDeAutomatas: FabricaDeAutomatas = new FabricaDeAutomatasConcreta();
  // automata1: Automata = this.factory2.createGliderStrategy(256, 64)
  automata1: Automata = this.factory2.createMilitaryCube(128, 128);

  // automata1: Automata = this.fabricaDeAutomatas.crearAutomata(1);

  constructor() {  }

  ngOnInit(): void {

  }
 
}
