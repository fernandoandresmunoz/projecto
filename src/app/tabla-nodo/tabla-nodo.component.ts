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


  constructor() { }

  ngOnInit(): void {
  }

}
