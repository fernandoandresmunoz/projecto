import { Component, OnInit } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Factory } from '../ifaces/game';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.styl']
})
export class TreeComponent implements OnInit {

  umbralInferior = JUEGO.UMBRAL_INFERIOR;
  umbralSuperior = JUEGO.UMBRAL_SUPERIOR;
  factory = new Factory();
  raiz : Nodo;


  constructor() { 
    this.raiz = this.factory.crearPlanta()

    setInterval(() => {

      this.raiz.avanzarUnaGeneracion()

    }, 250)



  }

  ngOnInit(): void {

  }


}
