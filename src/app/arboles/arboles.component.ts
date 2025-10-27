import { Component, OnInit } from '@angular/core';
import { GeometryService } from '../geometry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arboles',
  templateUrl: './arboles.component.html',
  styleUrls: ['./arboles.component.styl']
})
export class ArbolesComponent implements OnInit {

  nodos: any = []
  nombreNuevoNodo: string = "";

  constructor(
    private router: Router,
    private geometry: GeometryService) { }

  ngOnInit(): void {
    this.cargarNodos()
  }

  crearNuevoNodo(): void {
    console.log('nombre nuevo nodo ', this.nombreNuevoNodo)
    this.geometry.crearNodoRaiz(this.nombreNuevoNodo)
    .subscribe( resp => {
      this.cargarNodos();
      this.nombreNuevoNodo = "";
    })
  }

  cargarNodos(): void {
    this.geometry.obtenerNodos()
    .subscribe( (resp) => {
      this.nodos = resp;
      console.log(resp);
    })
  }

  borrarNodo(nodo): void {
    this.geometry.borrarNodo(nodo.id)
    .subscribe(resp => {
      console.log('nodo ', nodo.i, ' borrado exitosamente');
      this.cargarNodos();
    })
  }

  detalleNodo(nodo: any): void {
    console.log('a detalle nodo ', nodo.id)
    this.router.navigate(['/nodo/', nodo.id])
  }

}
