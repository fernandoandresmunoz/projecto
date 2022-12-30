import { Component, Input, OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-tabla-nodo',
  templateUrl: './tabla-nodo.component.html',
  styleUrls: ['./tabla-nodo.component.styl']
})
export class TablaNodoComponent implements OnInit {

  @Input() nodo: Nodo;
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;


  ANCHO_BARRA = JUEGO.ANCHO_BARRA
  ALTO_BARRA = JUEGO.ALTO_BARRA;
  constructor() { }

  ngOnInit(): void {
  }

}
