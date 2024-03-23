import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
  selector: 'app-generation-widget',
  templateUrl: './generation-widget.component.html',
  styleUrls: ['./generation-widget.component.styl']
})
export class GenerationWidgetComponent implements OnInit {

  @Input() automata: Automata;

  constructor() { }

  ngOnInit(): void {
  }

}
