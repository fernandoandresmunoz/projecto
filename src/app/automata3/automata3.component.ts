import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";

@Component({
  selector: 'app-automata3',
  templateUrl: './automata3.component.html',
  styleUrls: ['./automata3.component.styl']
})
export class Automata3Component implements OnInit {

factory2 = new ConcreteShapeFactory()

  automata3 = this.factory2.createMilitaryCube(100, 100)

  auxiliaryLines = true;

  constructor() {



   }

  ngOnInit(): void {
  }
}
