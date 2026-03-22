import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-canvas-controller',
    templateUrl: './canvas-controller.component.html',
    styleUrls: ['./canvas-controller.component.css'],
    standalone: false
})
export class CanvasControllerComponent implements OnInit {

  @Input() anchoRectangulo: number;
  constructor() { }

  ngOnInit(): void {
  }

  aumentarAnchoRectangulo() {
    this.anchoRectangulo += 0.1;
  }

}
