import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcion-exponencial',
  templateUrl: './funcion-exponencial.component.html',
  styleUrls: ['./funcion-exponencial.component.styl']
})
export class FuncionExponencialComponent implements OnInit {

  curvas: {color: string, f: (x: number) => number }[] =  [];
  
  constructor() { 
    this.curvas =  [
        // { f: x=> x**2, color: 'red' },
        // { f: x=> 2, color: 'green' },
        // { f: x=> Math.exp(x), color: 'green' },
        { f: x => Math.exp(x), color: 'red' } 
    ] 


  }

  ngOnInit(): void {
  }

  exponencial() : (x: number) => number { 
    return x => Math.exp(x);
  }

}
