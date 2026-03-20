import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeometryService } from '../geometry.service';
import { Automata } from 'cube';
import { ConcreteShapeFactory } from 'concreteShapeFactory';

@Component({
  selector: 'app-wrapper-minecraft-view',
  templateUrl: './wrapper-minecraft-view.component.html',
  styleUrls: ['./wrapper-minecraft-view.component.styl']
})
export class WrapperMinecraftViewComponent implements OnInit {

  datos_matriz: {state: number; color: string}[][];
  automata: Automata;
  factory2 = new ConcreteShapeFactory()

  constructor(
    private route: ActivatedRoute,
    private geometry: GeometryService
  ) { 
      this.route.params.subscribe(params => {
        let id = params['id'];


        this.geometry.obtenerDetalleMatriz(id)
        .subscribe( matriz => {
          this.datos_matriz = matriz.datos_matriz;
            // this.idMatriz = matriz.id;
            // this.nombre = matriz.nombre;
            // this.columnas = matriz.columnas;
            // this.filas = matriz.filas;
            // this.estadoActual = matriz.estado_actual;
            // this.generacion = matriz.generacion;

              this.automata = this.factory2.createMilitaryCube(matriz.filas, matriz.columnas)
              this.automata.changeRule('BLUE', matriz.blue_rule)
              this.automata.changeRule('BROWN', matriz.brown_rule)
              this.automata.changeRule('GRAY', matriz.gray_rule)
              this.automata.changeRule('GREEN', matriz.green_rule)
              this.automata.changeRule('RED', matriz.red_rule)
              this.automata.setMatrizActiva(matriz.datos_matriz)
              this.automata.setGeneration(matriz.generacion)
              // this.puedeAvanzar = true;

              this.automata.regla_1_color_1 = matriz.rule_1_color_1;
              this.automata.regla_1_color_2 = matriz.rule_1_color_2;
              this.automata.regla_1_color_3 = matriz.rule_1_color_3;

              this.automata.regla_2_color_1 = matriz.rule_2_color_1;
              this.automata.regla_2_color_2 = matriz.rule_2_color_2;
              this.automata.regla_2_color_3 = matriz.rule_2_color_3;


              this.automata.regla_3_color_1 = matriz.rule_3_color_1;
              this.automata.regla_3_color_2 = matriz.rule_3_color_2;
              this.automata.regla_3_color_3 = matriz.rule_3_color_3;

              this.automata.regla_4_color_1 = matriz.rule_4_color_1;
              this.automata.regla_4_color_2 = matriz.rule_4_color_2;
              this.automata.regla_4_color_3 = matriz.rule_4_color_3;

              this.automata.regla_5_color_1 = matriz.rule_5_color_1;
              this.automata.regla_5_color_2 = matriz.rule_5_color_2;
              this.automata.regla_5_color_3 = matriz.rule_5_color_3;

              this.automata.altura_regla_1 = matriz.altura_regla_1;
              this.automata.altura_regla_2 = matriz.altura_regla_2;
              this.automata.altura_regla_3 = matriz.altura_regla_3;
              this.automata.altura_regla_4 = matriz.altura_regla_4;
              this.automata.altura_regla_5 = matriz.altura_regla_5;

        })

      })
    }



  ngOnInit(): void {
  }

}
