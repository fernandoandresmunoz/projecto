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

  @Input() coloresRegla1: string[] = [ "#0b4b0b",	"#2ab22a", 	"#0c500c"  ]
  @Input() coloresRegla3: string[] = [ "#04099a",	"#5266ff",	"#082fa6" ]


  @Input() coloresRegla2: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]
  // @Input() coloresRegla4: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]
  // @Input() coloresRegla5: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]

  // @Input() coloresRegla2: string[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  @Input() coloresRegla4: string[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  // @Input() coloresReglastring[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  @Input() coloresRegla5: string[] = [ "#DC143C",	"#FF7F50",	"#f08080" ]


  constructor() {
 
   }

  ngOnInit(): void {
  }

}
