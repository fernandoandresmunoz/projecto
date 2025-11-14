import { Component, Input, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
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
  edicion: boolean = false;


  AGREGAR_TAB = "AGREGAR_TAB";
  EDICION_TAB = "EDICION_TAB";
  AUTOMATA_TAB = "AUTOMATA_TAB";

  nuevoNombreMatriz: string = "Nueva Matriz";
  totalNuevasFilas: number = 40;
  totalNuevasColumnas: number = 40;

  selectedTab: string = this.EDICION_TAB;

  nuevoNodoNombre: string = "";
  
  nuevoNombreEdicion: string ;

  constructor( 
    private geometry: GeometryService,
  ) {

  }

  actualizarNodo(): void {
    this.geometry.actualizarNodo(
      this.root.id,
      this.root.getParent().id,
      this.nuevoNombreEdicion,
      this.root.automataId

    ).subscribe( resp => {
      this.root.nombre = resp.nombre;
      this.loadTree();
    })
  }
    guardarNuevaMatriz(): void {
      this.geometry.crearMatriz(this.nuevoNombreMatriz,
        this.totalNuevasFilas,
        this.totalNuevasColumnas 
        ).subscribe( resp => {
          this.root.automataId = resp.id;
          this.actualizarNodo();
        })
    }


  quitar(): void {


    this.geometry.borrarNodo(this.root.id)
    .subscribe( resp => {


    this.root.getChildren().map( child => {
      this.geometry.actualizarNodo(
        child.id,
        this.root.getParent().id,
        child.nombre,
        child.automataId
      )
      .subscribe( nodo => {

        this.loadTree()

      })

    })

    }) 
  }

  ngOnInit(): void {
    this.loadTree();
    this.nuevoNombreEdicion = this.root.nombre;
  }

  loadTree(): void {
    if (this.root && this.root !== undefined)
      this.root.children = [];
      this.geometry.obtenerHijos(this.root.id).subscribe(
        hijos=> {
          if ( hijos.length > 0) {
            hijos.map( hijo => {

              let celula: Nodo;
              if (hijo.is_leaf) {
                celula = new Celula();
              } else {
                celula = new GrupoCelulas();
              }
              celula.id = hijo.id
              celula.nombre = hijo.nombre;
              celula.automataId = hijo.matriz_ac
              celula.matriz_ac = hijo.matriz_ac
              celula.filas = hijo.filas;
              celula.columnas = hijo.columnas;

              this.root.addChild(celula)

            })
          }
            
        }
      )
  }


  borrarNodo(root: Nodo): void {
    this.geometry.borrarNodo(root.id)
      .subscribe( resp=> {
        root.parent.removeChild(root)
      })
  }

  agregarPadre(root: Nodo) {

    let parent = root.getParent();

    this.geometry.crearNodo(parent.id, this.nuevoNodoNombre, false)
      .subscribe(resp => {
        let nuevoPadre = new GrupoCelulas();
        nuevoPadre.id = resp.id
        nuevoPadre.nombre = resp.nombre
        nuevoPadre.parent = parent;
        parent.addChild(nuevoPadre) // parent pasa a ser "abuelo"

        this.geometry.actualizarNodo(root.id, nuevoPadre.id, root.nombre, root.matriz_ac)
        .subscribe( resp => {

          parent.removeChild(root)
          nuevoPadre.addChild(root)
          this.nuevoNodoNombre = "";
        })

      })

  }

  agregarGrupoCelula(root: Nodo) {

    this.geometry.crearNodo(root.id, this.nuevoNodoNombre, false)
      .subscribe(resp => {
        let h = new GrupoCelulas();
        h.id = resp.id
        h.nombre = resp.nombre
        h.parent = root;
        root.addChild(h)
        this.nuevoNodoNombre = "";
      })
  }

  agregarHoja(root: Nodo) {

    this.geometry.crearNodo(root.id, this.nuevoNodoNombre, true)
      .subscribe(resp => {
        let h = new Celula();
        h.id = resp.id
        h.nombre = resp.nombre
        h.parent = root;
        root.addChild(h)
        this.nuevoNodoNombre = "";
      })
  }

  agregarHijos(root: Nodo) {
    let child1 = new Celula();
    child1.setAutomatas();
    root.addChild(child1);

  }

}
