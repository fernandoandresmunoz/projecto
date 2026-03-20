import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcion-polinomica',
  templateUrl: './funcion-polinomica.component.html',
  styleUrls: ['./funcion-polinomica.component.styl']
})
export class FuncionPolinomicaComponent implements OnInit {
  curvas: {color: string, f: (x: number) => number }[] =  [];
  CONSTANTE: number = 8;
  constructor() { }

  ngOnInit(): void {
    this.curvas =  [
        // { f: x=> x**2, color: 'red' },
        // { f: x=> 2, color: 'green' },
        // { f: x=> Math.exp(x), color: 'green' },
        { f: x =>  this.CONSTANTE * 1 / (1 + Math.exp(-x)) , color: 'red' } 
    ] 


  }

  aumentarCONSTANTE() {
    this.CONSTANTE += 1 ;
  }

  disminuirCONSTANTE() {
    this.CONSTANTE -= 1;
  }

  funcion(): (x: number) => number { 
    return x =>  this.CONSTANTE *  1 / (1 + Math.exp(-x));
  }

}
