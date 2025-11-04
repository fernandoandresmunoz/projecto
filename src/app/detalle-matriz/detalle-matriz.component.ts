import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeometryService } from '../geometry.service';
import { ConcreteShapeFactory } from '../../../concreteShapeFactory';
import { Automata } from '../../../cube';

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
  puedeAvanzar: boolean = false;





  constructor(private route: ActivatedRoute,
    private geometry: GeometryService
    
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
              if (this.puedeAvanzar) {
                this.automata.avanzarUnaGeneracion()
                this.generacion += 1;
              }

              if (this.generacion % 20 === 0 && this.generacion !== 0) {
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
      console.log(resp)
    })
  }

}
