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

  constructor(
    private router: Router,
    private geometry: GeometryService) { }

  ngOnInit(): void {
    this.geometry.obtenerNodos()
    .subscribe( (resp) => {
      this.nodos = resp;
      console.log(resp);
    })
  }

  detalleNodo(nodo: any): void {
    console.log('a detalle nodo ', nodo.id)
    this.router.navigate(['/nodo/', nodo.id])
  }

}
