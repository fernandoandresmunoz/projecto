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
  generacion: number = 0;
  points: [number, number][] = []
  azules: [number, number][] = []
  rojos: [number, number][] = []
  cafes: [number, number][] = []
  grises: [number, number][] = []
  verdes: [number, number][] = []

  constructor() {

    // this.raiz = this.factory.megaPlanta();
    this.raiz = this.factory.crearPlanta()
  }
}

