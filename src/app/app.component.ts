import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factory, Nodo } from './ifaces/game';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit  {
  factory = new Factory();


  umbralInferior = 0.5;
  umbralSuperior = 0.73;
  step = 0.01
  

  raiz: Nodo;
  generacion: number = 0;
  points: [number, number][] = []
  azules: [number, number][] = []
  rojos: [number, number][] = []
  cafes: [number, number][] = []
  grises: [number, number][] = []
  verdes: [number, number][] = []

  constructor() {

    this.raiz = this.factory.crearArbol2();

    this.raiz.setAutomatas();



    setInterval(() => {
      this.raiz.avanzarUnaGeneracion()



      this.points.push([this.generacion, this.raiz.average() ])
      this.azules.push([this.generacion, this.raiz.azules() ])
      this.rojos.push([this.generacion, this.raiz.rojos() ])
      this.verdes.push([this.generacion, this.raiz.verdes() ])
      this.cafes.push([this.generacion, this.raiz.cafes() ])
      this.grises.push([this.generacion, this.raiz.grises() ])

      this.generacion += 1;


      if (this.generacion > 100 && this.generacion <= 150 && this.raiz.average() > 0.71) {
        // this.raiz.allDiamoeba()
      } else if (this.generacion > 100 && this.raiz.average() < 0.64) {
        // this.raiz.replicator();
      }
      else if ( this.generacion > 150 && this.raiz.average() > 0.74) {
        // this.raiz.allDiamoeba();
      }
    }, 500)



  }



  ngOnInit(): void {

  }



}

