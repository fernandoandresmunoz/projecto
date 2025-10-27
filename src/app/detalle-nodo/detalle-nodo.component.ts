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
          console.log('esta es la respuesta del detalle de nodo, ', id , resp)
          this.raiz.id = id;
          this.raiz.nombre = resp.nombre;
        })






        this.geometry.obtenerHijos(id)
        .subscribe( resp => {
          resp.map<any>( x => {
            // console.log('hijo #' , x)
            // console.log(x.nombre)

            let celula = new GrupoCelulas()
            celula.id = x.id
            celula.nombre = x.nombre;
            this.raiz.addChild(celula)

          })

          // console.log(resp)
        })
    });




  }

}
