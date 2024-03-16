import { Component, OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Factory } from '../ifaces/game';
import { Nodo } from 'src/Nodo';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-automata1',
  templateUrl: './automata1.component.html',
  styleUrls: ['./automata1.component.styl']
})
export class Automata1Component implements OnInit {

  umbralInferior = JUEGO.UMBRAL_INFERIOR;
  umbralSuperior = JUEGO.UMBRAL_SUPERIOR;
  factory = new Factory();

  factory2 = new ConcreteShapeFactory()
  automata1 = this.factory2.createMilitaryCube(300, 50)

  constructor() { 

    setInterval(() => {

      this.automata1.avanzarUnaGeneracion()

    }, 250)



  }

  ngOnInit(): void {

  }
 
}
