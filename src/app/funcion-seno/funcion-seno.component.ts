import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcion-seno',
  templateUrl: './funcion-seno.component.html',
  styleUrls: ['./funcion-seno.component.styl']
})
export class FuncionSenoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  seno() : (x: number) => number { 
    return x => 3 * Math.sin(x);
  }

}
