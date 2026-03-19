import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.styl']
})
export class TablaComponent implements OnInit {

  @Input() anchoCelda: number = 1;
  // @Input() datos_matriz: any;
  @Input() automata: Automata;
  @Input() showChannels = false;
  @Input() preview = false;
  @Input() datos_matriz: any;

  reglas = [
    {
      id: 1,
      color: 'Green',
      name: '',
      notation: ''
    },
    {
      id: 2,
      color: 'Brown',
      name: '',
      notation: ''
    },
    {
      id: 3,
      color: 'Blue',
      name: '',
      notation: ''
    },
    {
      id: 4,
      color: 'Gray',
      name: '',
      notation: ''
    },
    {
      id: 5,
      color: 'Red',
      name: '',
      notation: ''
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  getColor(colorInput: string): string {

    switch (colorInput) {
      case "Red":
        return this.automata.regla_1_color_2 ? this.automata.regla_1_color_2 : "red";
      case "Blue":
        return this.automata.regla_2_color_2 ? this.automata.regla_2_color_2 : "blue";
      case "Green":
        return this.automata.regla_3_color_2 ? this.automata.regla_3_color_2 : "green";
      case "Brown":
        return this.automata.regla_4_color_2 ? this.automata.regla_4_color_2 : 'brown';
      case "Gray":
        return this.automata.regla_5_color_2 ? this.automata.regla_5_color_2 : 'gray';

      default:
        return "#fff"
    }

  }

}
