import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-tabla-reglas',
  templateUrl: './tabla-reglas.component.html',
  styleUrls: ['./tabla-reglas.component.styl']
})
export class TablaReglasComponent implements OnInit {

  @Input() automata: Automata;

  constructor() { }

  ngOnInit(): void {
  }

}
