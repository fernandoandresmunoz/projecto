import { Component,  OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';
import { Factory } from './ifaces/game';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit  {
  factory = new Factory();


  umbralInferior = JUEGO.UMBRAL_INFERIOR;
  umbralSuperior = JUEGO.UMBRAL_SUPERIOR;
  step = JUEGO.UMBRAL_STEP;
  mostrarGrafica = JUEGO.MOSTRAR_GRAFICO;
  mostrarTabla = JUEGO.MOSTRAR_TABLA;
  backgroundColor = JUEGO.BACKGROUND_COLOR;
  title= JUEGO.TITLE;
  fontColor = JUEGO.FONT_COLOR;
  showTree = JUEGO.SHOW_TREE;
  showTitle = JUEGO.SHOW_TITLE;
  

  raiz: Nodo;
  generacion: number = 0;
  points: [number, number][] = []
  azules: [number, number][] = []
  rojos: [number, number][] = []
  cafes: [number, number][] = []
  grises: [number, number][] = []
  verdes: [number, number][] = []

  constructor() {

    this.raiz = this.factory.crearPlanta();

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
    },JUEGO.INTERVALO_GENERACION)



  }



  ngOnInit(): void {

  }



}

