import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-glider',
  templateUrl: './glider.component.html',
  styleUrls: ['./glider.component.styl']
})
export class GliderComponent implements OnInit {

  factory2 = new ConcreteShapeFactory()
  glider = this.factory2.createGlider(100, 100)
  // auxiliaryLines = true;


  constructor() { }

  ngOnInit(): void {
  }

}
