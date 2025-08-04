import { Component,  OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';
import { Factory } from './ifaces/game';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Celula } from 'src/Celula';
import { Automata } from 'cube';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
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
  points: [number, number][] = [];
  azules: [number, number][] = [];
  rojos: [number, number][] = [];
  cafes: [number, number][] = [];
  grises: [number, number][] = [];
  verdes: [number, number][] = [];

  private generationCount = 0;
  private colorChangeInterval: any;

  constructor(public router: Router) {

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


    this.raiz = this.factory.crearArbol2()
    this.raiz2 = this.factory.crearSingle()
    this.raiz3 = this.factory.megaPlanta()
    this.rack = this.factory.crearRack();

  }

  ngOnInit(): void {
    // Subscribe to route changes
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   if (event.url === '/') {
    //     this.startBackgroundColorChange();
    //   } else {
    //     this.stopBackgroundColorChange();
    //     this.backgroundColor = '#ffffff'; // Reset to white when leaving home
    //   }
    // });
  }

  private startBackgroundColorChange(): void {
    // Clear any existing interval
    this.stopBackgroundColorChange();
    
    // Start new interval
    this.colorChangeInterval = setInterval(() => {
      this.generationCount++;
      if (this.generationCount % 5 === 0) {
        this.changeBackgroundColor();
      }
    }, 1000); // Adjust timing as needed
  }

  private stopBackgroundColorChange(): void {
    if (this.colorChangeInterval) {
      clearInterval(this.colorChangeInterval);
      this.colorChangeInterval = null;
    }
  }

  private changeBackgroundColor(): void {
    // Generate a random pastel color
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
    const lightness = 85 + Math.floor(Math.random() * 10); // 85-95%
    
    this.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  ngOnDestroy(): void {
    this.stopBackgroundColorChange();
  }
}

