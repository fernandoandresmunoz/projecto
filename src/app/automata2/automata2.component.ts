import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-automata2',
  templateUrl: './automata2.component.html',
  styleUrls: ['./automata2.component.styl']
})
export class Automata2Component implements OnInit {

  factory2 = new ConcreteShapeFactory()
  automata2 = this.factory2.createMilitaryCube(100, 100)
  auxiliaryLines = true;

  constructor() { }

  ngOnInit(): void {
  }

}
