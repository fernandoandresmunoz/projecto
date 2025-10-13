import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcion-exponencial',
  templateUrl: './funcion-exponencial.component.html',
  styleUrls: ['./funcion-exponencial.component.styl']
})
export class FuncionExponencialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exponencial() : (x: number) => number { 
    return x => Math.exp(x);
  }

}
