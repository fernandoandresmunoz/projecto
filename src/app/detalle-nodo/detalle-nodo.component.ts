import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geometry } from '@babylonjs/core';
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


// factory = new Factory();
//   raiz : Nodo;

//   constructor() { 
//     this.raiz = this.factory.crearPlanta()
   


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
        // console.log('id es ', id)


        this.geometry.obtenerDetalleNodo(id)
        .subscribe( resp => {
          this.raiz.id = id;
          this.raiz.nombre = resp.nombre;
        })






        this.geometry.obtenerHijos(id)
        .subscribe( resp => {
          resp.map<any>( x => {
            // console.log('hijo #' , x)
            // console.log(x.nombre)

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
            this.raiz.addChild(celula)

          })

          // console.log(resp)
        })
    });




  }

}
