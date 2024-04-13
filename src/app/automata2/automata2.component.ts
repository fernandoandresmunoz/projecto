import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";

@Component({
  selector: 'app-automata2',
  templateUrl: './automata2.component.html',
  styleUrls: ['./automata2.component.styl']
})
export class Automata2Component implements OnInit {

  factory2 = new ConcreteShapeFactory()
  automata2 = this.factory2.createMilitaryCube(256, 128)
  auxiliaryLines = true;

  constructor() {

    this.automata2.setScale(2)
   }

  ngOnInit(): void {
  }

}
