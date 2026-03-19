import { Component, OnInit } from '@angular/core';
import { GeometryService } from '../geometry.service';
import { Route, Router } from '@angular/router';
import { Automata } from 'cube';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.styl'],
})
export class MatricesComponent implements OnInit {

  matrices: any;

  nuevoNombreMatriz: string = "Nueva Matriz";
  totalNuevasFilas: number = 32;
  totalNuevasColumnas: number = 32;

  automatas: Automata[] = [];

  factory2 = new ConcreteShapeFactory()

  count: number;
  next: string;
  previous: string;
  loading = false

  constructor(
    private router: Router,
    private geometry: GeometryService) { }

  ngOnInit(): void {
    this.cargarMatrices()

  }

  cargarMatrices(url: string = `http://localhost:8001/graficas/matrices/`): void {
    this.loading = true;
    this.geometry.obtenerMatrices(url)
      .subscribe((matrices: any) => {
        this.loading = false;

        this.matrices = [];
        this.automatas = []

        this.count = matrices.count;
        this.next = matrices.next;
        this.previous = matrices.previous;


        this.matrices = matrices.results;

        this.matrices.map((matriz: any) => {

          let automata: Automata = this.factory2.createMilitaryCube(matriz.filas, matriz.columnas)

          // automata.changeRule('BLUE', matriz.blue_rule)
          // automata.changeRule('BROWN', matriz.brown_rule)
          // automata.changeRule('GRAY', matriz.gray_rule)
          // automata.changeRule('GREEN', matriz.green_rule)
          // automata.changeRule('RED', matriz.red_rule)
          automata.setMatrizActiva(matriz.datos_matriz)
          automata.setGeneration(matriz.generacion)
          // puedeAvanzar = true;
          automata.id = matriz.id;
          automata.nombre = matriz.nombre;
          automata.generacion = matriz.generacion;
          automata.fecha_creacion = matriz.fecha_creacion;

          automata.regla_1_color_1 = matriz.rule_1_color_1;
          automata.regla_1_color_2 = matriz.rule_1_color_2;
          automata.regla_1_color_3 = matriz.rule_1_color_3;

          automata.regla_2_color_1 = matriz.rule_2_color_1;
          automata.regla_2_color_2 = matriz.rule_2_color_2;
          automata.regla_2_color_3 = matriz.rule_2_color_3;


          automata.regla_3_color_1 = matriz.rule_3_color_1;
          automata.regla_3_color_2 = matriz.rule_3_color_2;
          automata.regla_3_color_3 = matriz.rule_3_color_3;

          automata.regla_4_color_1 = matriz.rule_4_color_1;
          automata.regla_4_color_2 = matriz.rule_4_color_2;
          automata.regla_4_color_3 = matriz.rule_4_color_3;

          automata.regla_5_color_1 = matriz.rule_5_color_1;
          automata.regla_5_color_2 = matriz.rule_5_color_2;
          automata.regla_5_color_3 = matriz.rule_5_color_3;
          automata.estado_actual = matriz.estado_actual;

          this.automatas.push(automata);


        })

      })
  }

  guardarNuevaMatriz(): void {
    this.geometry.crearMatriz(this.nuevoNombreMatriz,
      this.totalNuevasFilas,
      this.totalNuevasColumnas
    ).subscribe(resp => {
      this.cargarMatrices();
    })
  }

  detalleMatriz(idMatriz: number): void {
    this.router.navigate(['/matrices', idMatriz])
  }

}
