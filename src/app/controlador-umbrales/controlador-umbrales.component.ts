import { Component, Input, OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';

@Component({
  selector: 'app-controlador-umbrales',
  templateUrl: './controlador-umbrales.component.html',
  styleUrls: ['./controlador-umbrales.component.styl']
})
export class ControladorUmbralesComponent implements OnInit {
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;

  step = JUEGO.UMBRAL_STEP;

  constructor() { }

  ngOnInit(): void {
  }

}
