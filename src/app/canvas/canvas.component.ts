import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.styl']
})
export class CanvasComponent implements OnInit {

  @Input() anchoRectangulo: number;

  constructor() { }

  ngOnInit(): void {
  }

}
