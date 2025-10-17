import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcion-polinomica',
  templateUrl: './funcion-polinomica.component.html',
  styleUrls: ['./funcion-polinomica.component.styl']
})
export class FuncionPolinomicaComponent implements OnInit {
  curvas: {color: string, f: (x: number) => number }[] =  [];
  constructor() { }

  ngOnInit(): void {
    this.curvas =  [
        // { f: x=> x**2, color: 'red' },
        // { f: x=> 2, color: 'green' },
        // { f: x=> Math.exp(x), color: 'green' },
        { f: x =>8 *  1 / (1 + Math.exp(-x)) - 2, color: 'red' } 
    ] 


  }

  funcion(): (x: number) => number { 
    return x => 8 *  1 / (1 + Math.exp(-x)) - 2;
  }

}
