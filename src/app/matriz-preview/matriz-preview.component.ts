import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matriz-preview',
  templateUrl: './matriz-preview.component.html',
  styleUrls: ['./matriz-preview.component.css']
})
export class MatrizPreviewComponent implements OnInit {

  @Input() matrix: number[][];

  i: number = 0;
  j: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
