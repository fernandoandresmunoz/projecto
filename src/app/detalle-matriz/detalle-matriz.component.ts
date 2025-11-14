import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeometryService } from '../geometry.service';
import { ConcreteShapeFactory } from '../../../concreteShapeFactory';
import { Automata } from '../../../cube';

const COLOR_MAP: { [key: string]: number } = {
    "GREEN": 1,
    "BROWN": 2, // Nota: Si quieres que BROWN sea 2, lo asociamos así.
    "BLUE": 3,
    "GRAY": 4,
    "RED": 5,
};



interface Cell {
  /**
   * El estado de la célula: 0 es muerta, 1 o más es viva.
   * Este es el valor que se extraerá.
   */
  state: number; 
  /**
   * El color de la célula, que será ignorado en la matriz de salida.
   */
  color: string;
  // Puedes añadir más propiedades aquí si tu matriz de entrada las tiene.
}



@Component({
  selector: 'app-detalle-matriz',
  templateUrl: './detalle-matriz.component.html',
  styleUrls: ['./detalle-matriz.component.styl']
})
export class DetalleMatrizComponent implements OnInit, OnDestroy {


  idMatriz: number;
  nombre: string;
  filas: number;
  columnas: number;
  fechaCreacion: string;
  estadoActual: string;
  datosMatriz: any[] = [];
  generacion: number;

factory2 = new ConcreteShapeFactory()
  
  automata: Automata
  puedeAvanzar: boolean = true;





  constructor(
    private route: ActivatedRoute,
    private geometry: GeometryService,
    private router: Router
    
    ) {

      this.route.params.subscribe(params => {
        let id = params['id'];

        this.geometry.obtenerDetalleMatriz(id)
          .subscribe((matriz) => {
            this.idMatriz = matriz.id;
            this.nombre = matriz.nombre;
            this.columnas = matriz.columnas;
            this.filas = matriz.filas;
            this.estadoActual = matriz.estado_actual;
            this.generacion = matriz.generacion;



            if (matriz.datos_matriz.length !== 0) {

              this.automata = this.factory2.createMilitaryCube(this.filas, this.columnas)
              this.automata.changeRule('BLUE', matriz.blue_rule)
              this.automata.changeRule('BROWN', matriz.brown_rule)
              this.automata.changeRule('GRAY', matriz.gray_rule)
              this.automata.changeRule('GREEN', matriz.green_rule)
              this.automata.changeRule('RED', matriz.red_rule)
              this.automata.setMatrizActiva(matriz.datos_matriz)
              this.automata.setGeneration(matriz.generacion)
              this.puedeAvanzar = true;

            }


            else {
              this.automata = this.factory2.crearAutomataNuevo(this.filas, this.columnas);
              this.automata.setGeneration(matriz.generacion)
              this.puedeAvanzar = true;

              //   for (let counter = 0; counter < matriz.filas; counter++) {

              //     let fila: number[] = [];

              //     for (let i = 0; i < matriz.columnas; i++) {
              //       fila.push({"state" : 0, "color": "Blue"})
              //     }
              //     this.datosMatriz.push(fila)
              //   }
            }

            for (let i = 0 ; i < 170; i++) {
              this.automata.izquierda();
            }
            for (let i = 0 ; i < 100; i++) {
              this.automata.subir();
            }




            setInterval(() => {

              // console.log('intentando avanzar ..')
              //
              if (this.puedeAvanzar && this.puedeAvanzar) {
                this.automata.avanzarUnaGeneracion()
                this.generacion += 1;
              }

              if ( (this.generacion % 20 === 0 && this.generacion !== 0) && this.puedeAvanzar ) {
                this.guardarMatriz();
              }

            }, 250)



            // console.log(matriz);
          })
      })


    if (this.automata) {

    }

   }
  ngOnDestroy(): void {
    this.puedeAvanzar = false;
  }

  ngOnInit(): void {
    this.puedeAvanzar = true

  }

  navigateTo3dView(): void {
    this.router.navigate(['matrices/3d', this.idMatriz ])

    // path: 'matrices/3d/:id',
  }

  guardarMatriz(): void {

    this.geometry.actualizarMatriz(
      this.idMatriz,
      this.nombre,
      this.automata.getMatrizActiva(),
      this.generacion,
      this.automata.getBlueRule().name,
      this.automata.getBrownRule().name,
      this.automata.getGrayRule().name,
      this.automata.getGreenRule().name,
      this.automata.getRedRule().name,

    
    ).subscribe( resp => {
      this.geometry.automata(
       this.convertMatrixToNumeric( this.automata.getMatrizActiva())
        )
      .subscribe( x => {
        console.log(x)
      });
      // console.log(resp);
      // this.geometry.automata(


      //   this.convertMatrixToNumeric(

      //   this.automata.getMatrizActiva()
      //   )
      //   )
      // .subscribe( resp => {
      //   console.log(resp);
      // }
      
      // );
    });
  }

    convertMatrixToNumeric(matrix: any): any {
      return matrix.map((row: Cell[]) => {
        
        return row.map((cell: Cell) => {
            
            // 1. Caso base: Si el estado es 0 (célula muerta), devuelve 0.
            if (cell.state === 0) {
                return 0;
            }

            // 2. Caso vivo: Si el estado es > 0, devuelve el valor mapeado del color.
            // Usamos .toUpperCase() para asegurar que coincida con el mapa.
            const colorKey = cell.color.toUpperCase();
            
            // Si el color no está en el mapa, devolvemos 0 o un valor por defecto (ej. 1)
            // Aquí devolvemos 0 como fallback de seguridad.
            return COLOR_MAP[colorKey] || 0; 
        });
    });

}
}
