import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-automata1',
  templateUrl: './automata1.component.html',
  styleUrls: ['./automata1.component.styl']
})
export class Automata1Component implements OnInit {

  factory2 = new ConcreteShapeFactory()
  automata1 = this.factory2.createMilitaryCube(256, 64)

  constructor() {  }

  ngOnInit(): void {

  }
 
}
