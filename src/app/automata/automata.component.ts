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



  // verde 
  // @Input() coloresRegla1: string[] = [ "#0b4b0b",	"#2ab22a", 	"#0c500c"  ]
  // @Input() coloresRegla3: string[] = [ "#04099a",	"#5266ff",	"#082fa6" ]
  // // color cafe claro
  // @Input() coloresRegla2: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]
  // @Input() coloresRegla4: string[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  // @Input() coloresRegla5: string[] = [ "#453b07",	"yellowgreen",	"#453b07" ]

// Regla 1: Pasto
@Input() coloresRegla1: string[] = [ "#1e5e3a", "#4a8562", "#71b585" ];

// Regla 3: Agua
@Input() coloresRegla3: string[] = [ "#153366", "#3d649a", "#5a8ac4" ];

// Tonos de roca
// Regla 2: Piedra
@Input() coloresRegla2: string[] = [ "#4d4d4d", "#7a7a7a", "#b0b0b0" ];

// Regla 4: Tierra
@Input() coloresRegla4: string[] = [ "#6a4e32", "#8e6c4e", "#b08a6b" ];

// Regla 5: Madera
@Input() coloresRegla5: string[] = [ "#593c28", "black", "#b08f75" ];

  // @Input() coloresRegla3: string[] = [ "#04099a",	"#5266ff",	"#082fa6" ]
  // @Input() coloresRegla5: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]
  // @Input() coloresRegla2: string[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  // @Input() coloresRegla4: string[] = [ "#453b07",	"#d2a65b",	"#453b07" ]
  // @Input() coloresRegla5: string[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  // @Input() coloresReglastring[] = [ "#453b07",	"#a47e3d",	"#453b07" ]
  // @Input() coloresRegla5: string[] = [ "#DC143C",	"#FF7F50",	"#f08080" ]


  constructor() {
 
   }

  ngOnInit(): void {
  }

}
