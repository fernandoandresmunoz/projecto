import { Component, Input, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { Automata } from 'cube';
import { Celula } from 'src/Celula';
import { GrupoCelulas } from 'src/GrupoCelula';
import { Nodo } from 'src/Nodo';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-arbol-view',
  templateUrl: './arbol-view.component.html',
  styleUrls: ['./arbol-view.component.styl']
})
export class ArbolViewComponent implements OnInit {

  @Input() root: Nodo;
  @Input() umbralInferior: number;
  @Input() umbralSuperior: number;
  @Input() INHERITED_PARENT_ID: number;

  constructor( 

    private geometry: GeometryService,
  ) {

  }

  ngOnInit(): void {
    if (this.root)
      this.geometry.obtenerHijos(this.root.id).subscribe(
        hijos=> {
          console.log(hijos)
          hijos.map( hijo => {

            let celula = new GrupoCelulas()
            celula.id = hijo.id
            celula.nombre = hijo.nombre;
            this.root.addChild(celula)




          })

        }
      )
      
    

    // if ( this.INHERITED_PARENT_ID ) {
    //   console.log('llamando a los hijos de ', this.INHERITED_PARENT_ID);
    // }
  }


  borrarNodo(root: Nodo): void {
    // console.log('padre del nodo seleccionado : ', root.padre.id)
    // console.log('borrando nodo', root.id)
    this.geometry.borrarNodo(root.id)
  .subscribe( resp=> {
    root.parent.removeChild(root)
  })
    
  }

  agregarGrupoCelula(root: Nodo) {

    this.geometry.crearNodo(root.id)
    .subscribe( resp => {
      console.log(resp)
    // console.log('agregando grupo celula', root)
    let h = new GrupoCelulas();
    h.id = resp.id
    h.nombre = resp.nombre

    root.addChild(h)




    })


    // console.log('agregando grupo celula', root)
    // let h = new GrupoCelulas();
    // root.addChild(h)


    // let gc = new GrupoCelulas();
    // let h1 = new GrupoCelulas();
    // root.addChild(h1)
    // gc.setAutomatas()
    // root.addChild(gc);
    
  }

  agregarHoja(root: Nodo) {
    let celula = new Celula();
    root.addChild(celula)
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
