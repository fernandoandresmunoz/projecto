import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";

@Component({
  selector: 'app-glider',
  templateUrl: './glider.component.html',
  styleUrls: ['./glider.component.styl']
})
export class GliderComponent implements OnInit {

  factory2 = new ConcreteShapeFactory()
  glider = this.factory2.createGliderStrategy(400, 400)
  // auxiliaryLines = true;


  constructor() { }

  ngOnInit(): void {
  }

}
