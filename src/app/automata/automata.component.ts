import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-automata',
  templateUrl: './automata.component.html',
  styleUrls: ['./automata.component.styl']
})
export class AutomataComponent implements OnInit {

  @Input() automata: Automata;
  @Input() auxiliaryLines: boolean;
  @Input() showStats: boolean;
  @Input() showController: boolean;

  @Input() coloresRegla1: string[];
  @Input() coloresRegla2: string[];
  @Input() coloresRegla3: string[];
  @Input() coloresRegla4: string[];
  @Input() coloresRegla5: string[];

  constructor() {
 
   }

  ngOnInit(): void {
  }

}
