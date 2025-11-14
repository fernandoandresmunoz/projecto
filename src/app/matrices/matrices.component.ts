import { Component, OnInit } from '@angular/core';
import { GeometryService } from '../geometry.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.styl'],
})
export class MatricesComponent implements OnInit {

  matrices: any = [];

  nuevoNombreMatriz: string = "Nueva Matriz";
  totalNuevasFilas: number = 80;
  totalNuevasColumnas: number = 80 ;

  constructor(
    private router: Router,
    private geometry: GeometryService) { }

  ngOnInit(): void {
    this.cargarMatrices()

  }

  cargarMatrices(): void {
    this.geometry.obtenerMatrices()
    .subscribe((matrices) => {
      this.matrices = matrices;

    })
  }

  guardarNuevaMatriz(): void {
    this.geometry.crearMatriz(this.nuevoNombreMatriz,
      this.totalNuevasFilas,
      this.totalNuevasColumnas 
      ).subscribe( resp => {
        this.cargarMatrices();
      })
  }

  detalleMatriz(idMatriz: number): void {
    this.router.navigate(['/matrices', idMatriz])
  }

}
