import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeometryService } from '../geometry.service';
import { Factory } from '../ifaces/game';
import { Nodo } from '../../../src/Nodo'
import { GrupoCelulas } from '../../GrupoCelula';
import { Celula } from '../../Celula';

@Component({
  selector: 'app-detalle-nodo',
  templateUrl: './detalle-nodo.component.html',
  styleUrls: ['./detalle-nodo.component.styl']
})
export class DetalleNodoComponent implements OnInit {

  factory = new Factory();
  raiz: Nodo;;

  constructor(
    private geometry: GeometryService,
    private route: ActivatedRoute) { 

      this.raiz = new GrupoCelulas()
    }

  ngOnInit(): void {

      this.route.params.subscribe(params => {
        let id = params['id'];

        this.geometry.obtenerDetalleNodo(id)
        .subscribe( resp => {
          this.raiz.id = id;
          this.raiz.nombre = resp.nombre;
        })

        this.geometry.obtenerHijos(id)
        .subscribe( resp => {
          resp.map<any>( x => {

            let celula: Nodo;
            if (!x.is_leaf)
            {
              celula = new GrupoCelulas()
            } else {
              celula = new Celula();
            }
            celula.id = x.id
            celula.nombre = x.nombre;
            celula.matriz_ac = x.matriz_ac;
            celula.filas = x.filas;
            celula.columnas = x.columnas;
            this.raiz.addChild(celula)

          })
        })
    });
  }
}
