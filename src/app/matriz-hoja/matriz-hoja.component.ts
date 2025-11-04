import { Component, Input, OnInit } from '@angular/core';
import { GeometryService } from '../geometry.service';
import { Automata } from 'cube';
import { ConcreteShapeFactory } from 'concreteShapeFactory';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-matriz-hoja',
  templateUrl: './matriz-hoja.component.html',
  styleUrls: ['./matriz-hoja.component.styl']
})
export class MatrizHojaComponent implements OnInit {

  @Input() matriz_ac: number;
  @Input() nodo: Nodo;



  idMatriz: number;
  nombre: string;
  filas: number;
  columnas: number;
  fechaCreacion: string;
  estadoActual: string;
  datosMatriz: any[] = [];
  generacion: number;

  
  puedeAvanzar: boolean = true;





  constructor(private geometry: GeometryService) { 

  }

  guardarMatriz(): void {

    this.geometry.actualizarMatriz(
      this.idMatriz,
      this.nombre,
      this.nodo.automata.getMatrizActiva(),
      this.nodo.automata.generation,
      this.nodo.automata.getBlueRule().name,
      this.nodo.automata.getBrownRule().name,
      this.nodo.automata.getGrayRule().name,
      this.nodo.automata.getGreenRule().name,
      this.nodo.automata.getRedRule().name,

    
    ).subscribe( matriz  => {

      console.log(matriz)
    })
  }

  ngOnInit(): void {

    this.geometry.obtenerDetalleMatriz(this.nodo.matriz_ac)
      .subscribe(matriz => {
        this.idMatriz = matriz.id;
        this.nombre = matriz.nombre;
        this.columnas = matriz.columnas;
        this.filas = matriz.filas;
        this.estadoActual = matriz.estado_actual;
        this.generacion = matriz.generacion;


        let factory2 = new ConcreteShapeFactory();


        // la matriz existe y está almacenada en la base de datos
        if (matriz.datos_matriz.length !== 0) {

          this.nodo.automata = factory2.createMilitaryCube(this.filas, this.columnas)
          this.nodo.automata.changeRule('BLUE', matriz.blue_rule)
          this.nodo.automata.changeRule('BROWN', matriz.brown_rule)
          this.nodo.automata.changeRule('GRAY', matriz.gray_rule)
          this.nodo.automata.changeRule('GREEN', matriz.green_rule)
          this.nodo.automata.changeRule('RED', matriz.red_rule)
          this.nodo.automata.setMatrizActiva(matriz.datos_matriz)
          this.nodo.automata.setGeneration(matriz.generacion)
          this.puedeAvanzar = true;

        }


        else {
          this.nodo.automata = factory2.crearAutomataNuevo(this.filas, this.columnas);
          this.nodo.automata.setGeneration(matriz.generacion)
          this.puedeAvanzar = true;

        }

        for (let i = 0; i < 170; i++) {
          this.nodo.automata.izquierda();
        }
        for (let i = 0; i < 100; i++) {
          this.nodo.automata.subir();
        }



        setInterval(() => {

          // console.log('intentando avanzar ..')
          //
          if (this.puedeAvanzar) {
            this.nodo.automata.avanzarUnaGeneracion()
            // this.automata.generation += 1;
            // this.generacion += 1;
          }

          if (this.nodo.automata.generation % 40 === 0 && this.nodo.automata.generation !== 0) {
            this.guardarMatriz();
          }

        }, 250)




        // console.log(matriz);

      })
  }

}
