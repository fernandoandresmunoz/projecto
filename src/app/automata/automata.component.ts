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

  constructor() {
 
   }

  ngOnInit(): void {
  }

}
