import { Component, Input, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'ConcreteShapeFactory.1';
import { Automata } from 'cube';


@Component({
  selector: 'app-nuevo-automata',
  templateUrl: './nuevo-automata.component.html',
  styleUrls: ['./nuevo-automata.component.styl']
})
export class NuevoAutomataComponent implements OnInit {

  factory2 = new ConcreteShapeFactory()
  @Input() automata: Automata;

 

  constructor() { 

  }
  ngOnInit(): void {
    if (this.automata === undefined) {
      this.automata = this.factory2.createMilitaryCube(200, 200)
      
    }
    this.automata.setScale(1)
    this.automata.setShowAuxiliaryLines(false)
    this.automata.setAnchoLienzo(400);
    this.automata.setAltoLienzo(400);
    
    console.log(this.automata.getColorSchema())

    for ( let i = 0; i < 240; i++ ) {
      this.automata.up()

    }

    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    this.automata.bajar()
    }
}