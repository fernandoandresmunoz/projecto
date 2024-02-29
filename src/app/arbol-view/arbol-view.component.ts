import { Component, Input, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { Automata } from 'cube';
import { Celula } from 'src/Celula';
import { GrupoCelulas } from 'src/GrupoCelula';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-arbol-view',
  templateUrl: './arbol-view.component.html',
  styleUrls: ['./arbol-view.component.styl']
})
export class ArbolViewComponent implements OnInit {

  @Input() root: Nodo;
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;

  ngOnInit(): void {
  }

  agregarGrupoCelula(root: Nodo) {
    console.log('agregando grupo celula', root)
    // let gc = new GrupoCelulas();
    let h = new GrupoCelulas();
    // let h1 = new GrupoCelulas();
    root.addChild(h)
    // root.addChild(h1)
    // gc.setAutomatas()
    // root.addChild(gc);
    
  }

  agregarHijos(root: Nodo) {
    let child1 = new Celula();
    let child2 = new Celula();
    child1.setAutomatas();
    // child2.setAutomatas();
    // root.setAutomatas()
    root.addChild(child1);
    // root.addChild(child2);

  }

}
