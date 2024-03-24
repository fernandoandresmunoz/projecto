import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.styl']
})
export class TablaComponent implements OnInit {

  @Input() automata:  Automata;
  constructor() {

    setInterval(() => {

      this.automata.avanzarUnaGeneracion()

    }, 250)



   }

  ngOnInit(): void {
  }

}
