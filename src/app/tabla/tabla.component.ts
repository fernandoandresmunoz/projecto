import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.styl']
})
export class TablaComponent implements OnInit {

  @Input() anchoCelda: number = 2;
  @Input() datos_matriz: any;

  constructor() {

   }

  ngOnInit(): void {
  }

}
