import { Component, Input, OnInit } from '@angular/core';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-arbol-view',
  templateUrl: './arbol-view.component.html',
  styleUrls: ['./arbol-view.component.styl']
})
export class ArbolViewComponent implements OnInit {

  @Input() root: Nodo;
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;

  ngOnInit(): void {
  }

}
