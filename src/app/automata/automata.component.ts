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

// Regla 1: Pasto
// @Input() coloresRegla1: string[] = [ "#1e5e3a", "#4a8562", "#71b585" ];
@Input() coloresRegla1: string[] = [ "#1e5e3a", "green", "#71b585" ];
@Input() coloresRegla3: string[] = [ "#153366", "#3d649a", "#5a8ac4" ];
@Input() coloresRegla2: string[] = [ "#4d4d4d", "red", "#b0b0b0" ];
@Input() coloresRegla4: string[] = [ "#6a4e32", "brown", "#b08a6b" ];
@Input() coloresRegla5: string[] = [ "#593c28", "gray", "#b08f75" ];


  constructor() {
 
   }

  ngOnInit(): void {
  }

}
