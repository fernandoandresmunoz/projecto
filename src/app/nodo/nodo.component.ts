import { Component, Input, OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-nodo',
  templateUrl: './nodo.component.html',
  styleUrls: ['./nodo.component.styl']
})
export class NodoComponent implements OnInit {

  @Input() root: Nodo;
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;

  showDrawing = JUEGO.SHOW_DRAWING;

  constructor() { }

  ngOnInit(): void {
  }

}
