import { Component, OnInit } from '@angular/core';
import { ConcreteLine } from 'concrete-line';
import { ConcretePoint } from 'concrete-point';
import { HttpClient } from '@angular/common/http';
import { GeometryService } from '../geometry.service';
import { Recta } from './recta';
import { Perpendicular } from './perpendicular';


interface Punto {
  x: number,
  y: number,
  activo: string
}


@Component({
  selector: 'app-funcion-logaritmica',
  templateUrl: './funcion-logaritmica.component.html',
  styleUrls: ['./funcion-logaritmica.component.styl']
})
export class FuncionLogaritmicaComponent implements OnInit {


  constructor(public geometry: GeometryService) { }

  ngOnInit(): void {
    // this.cargarPuntos();
    // this.cargarRectas();
    // this.cargarCircunferencias();
    // this.cargarPerpendiculares();
  }

}
