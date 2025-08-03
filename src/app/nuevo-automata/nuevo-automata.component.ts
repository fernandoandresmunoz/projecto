import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'ConcreteShapeFactory.1';
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
    this.automata.setShowAuxiliaryLines(false)
  }
  ngOnInit(): void {
  }
}
