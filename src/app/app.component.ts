import { Component,  OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';
import { Factory } from './ifaces/game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent  {
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
  showArbol= JUEGO.ELEMENTOS.ARBOL;
  showCurva = JUEGO.ELEMENTOS.CURVA;
  showTabla= JUEGO.ELEMENTOS.TABLA
  showBarras = JUEGO.ELEMENTOS.BARRAS;

  raiz: Nodo;
  raiz2: Nodo;
  raiz3: Nodo;
  raiz4: Nodo;
  generacion: number = 0;
  points: [number, number][] = []
  azules: [number, number][] = []
  rojos: [number, number][] = []
  cafes: [number, number][] = []
  grises: [number, number][] = []
  verdes: [number, number][] = []

  constructor() {
        setInterval(() => {
          this.raiz.avanzarUnaGeneracion();
          this.raiz2.avanzarUnaGeneracion()
          this.raiz3.avanzarUnaGeneracion()
          this.raiz4.avanzarUnaGeneracion()

          

    }, 250)


    this.raiz = this.factory.crearPlanta()
    this.raiz2 = this.factory.crearSingle()
    this.raiz3 = this.factory.megaPlanta()
    this.raiz.setAutomatas()
    this.raiz2.setAutomatas()
    this.raiz3.setAutomatas()
    // this.raiz = this.factory.megaPlanta();
    // this.raiz.agregarHojas()
    // this.raiz = this.factory.crearPlanta()
  }
}

