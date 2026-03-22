import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-funcion-cuadratica',
    templateUrl: './funcion-cuadratica.component.html',
    styleUrls: ['./funcion-cuadratica.component.css'],
    standalone: false
})
export class FuncionCuadraticaComponent {

  cuadratica() : (x: number) => number { 
    return x => x**2;
  }


}
