import { Component, Input, OnInit } from '@angular/core';
import { Automata } from 'cube';

@Component({
    selector: 'app-pause-reset',
    templateUrl: './pause-reset.component.html',
    styleUrls: ['./pause-reset.component.css'],
    standalone: false
})
export class PauseResetComponent implements OnInit {

  @Input() automata: Automata;

  constructor() { }

  ngOnInit(): void {
  }

}
