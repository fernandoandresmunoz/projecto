import { Component,  OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';
import { Factory } from './ifaces/game';
import { ConcreteShapeFactory } from 'concreteShapeFactory';
import { Celula } from 'src/Celula';
import { Automata } from 'cube';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  factory = new Factory();

  umbralInferior = JUEGO.UMBRAL_INFERIOR;
  umbralSuperior = JUEGO.UMBRAL_SUPERIOR;
  step = JUEGO.UMBRAL_STEP;
  mostrarGrafica = JUEGO.MOSTRAR_GRAFICO;
  mostrarTabla = JUEGO.MOSTRAR_TABLA;
  backgroundColor = JUEGO.BACKGROUND_COLOR;
  title = JUEGO.TITLE;
  fontColor = JUEGO.FONT_COLOR;
  showTree = JUEGO.SHOW_TREE;
  showTitle = JUEGO.SHOW_TITLE;
  showArbol = JUEGO.ELEMENTOS.ARBOL;
  showCurva = JUEGO.ELEMENTOS.CURVA;
  showTabla = JUEGO.ELEMENTOS.TABLA
  showBarras = JUEGO.ELEMENTOS.BARRAS;

  raiz: Nodo;
  raiz2: Nodo;
  raiz3: Nodo;
  raiz4: Nodo;

  rack: Nodo;
  factory2 = new ConcreteShapeFactory()
  automata1 = this.factory2.createMilitaryCube(128, 128)
  automata2 = this.factory2.createMilitaryCube(50, 50)
automata3 = this.factory2.createMilitary2(40, 60)
  generacion: number = 0;
  points: [number, number][] = []
  azules: [number, number][] = []
  rojos: [number, number][] = []
  cafes: [number, number][] = []
  grises: [number, number][] = []
  verdes: [number, number][] = []

  constructor() {

    this.automata1.setAnchoLienzo(1000)
    this.automata1.setAltoLienzo(700)
    this.automata1.setScale(2)

    setInterval(() => {

      // tengo cuatro arboles y 3 automatas 

      // estos son arboles 
      // this.raiz.avanzarUnaGeneracion();
      // this.raiz2.avanzarUnaGeneracion()
      // this.raiz3.avanzarUnaGeneracion()
      // this.rack.avanzarUnaGeneracion()

      // estos son automatas sueltos 
      // this.automata1.avanzarUnaGeneracion()
      // this.automata2.avanzarUnaGeneracion()
      // this.automata3.avanzarUnaGeneracion()

    }, 250)


    this.raiz = this.factory.crearPlanta()
    this.raiz2 = this.factory.crearSingle()
    this.raiz3 = this.factory.megaPlanta()
    this.rack = this.factory.crearRack();

  }
}

