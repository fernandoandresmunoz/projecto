import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matriz-preview',
  templateUrl: './matriz-preview.component.html',
  styleUrls: ['./matriz-preview.component.styl']
})
export class MatrizPreviewComponent implements OnInit {

  @Input() datos_matriz: any;

  constructor() { }

  ngOnInit(): void {
    console.log('soy matriz data', this.datos_matriz);
  }

}
