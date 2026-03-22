import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeometryService } from '../geometry.service';
import { ConcreteShapeFactory } from '../../../concreteShapeFactory';
import { Automata } from '../../../cube';
import { RespuestaPytorch } from '../respuesta-pytorch';
import { ShapeFactory } from 'shapeFactory';



// tipos/automata-response.ts

/**
 * Representa un vector de 7 dimensiones con las métricas del ADN del autómata
 * Orden: [densidad, bordes, relieve, sobel_x, sobel_y, gauss, densidad_macro]
 */
type ADNVector = [
  number, // densidad_intensidad
  number, // bordes_intensidad
  number, // relieve_intensidad
  number, // sobel_x_intensidad
  number, // sobel_y_intensidad
  number, // gauss_intensidad
  number  // densidad_macro_intensidad
];

/**
 * Vector de 18 bits que representa la regla del autómata (Wolfram-style)
 * Cada posición es 0 o 1
 */
type BSNormalizado = [
  number, number, number, number, number, number,
  number, number, number, number, number, number,
  number, number, number, number, number, number
];

/**
 * Vector de probabilidades para cada bit de la regla (valores entre 0 y 1)
 */
type BSProbs = [
  number, number, number, number, number, number,
  number, number, number, number, number, number,
  number, number, number, number, number, number
];

/**
 * Representación decimal de los 18 bits, dividido en dos números
 * [primeros_9_bits, segundos_9_bits]
 */
type BSDecimal = [number, number];

/**
 * Estados posibles de un canal
 */
type EstadoGlobal = 'SOBREPOBLADO' | 'AGONIZANTE' | 'ESTABLE' | 'EXTINTO';

/**
 * Métricas de pico (valores máximos observados)
 */
interface EstadisticasPico {
  bordes_pico: number;
  densidad_pico: number;
  densidad_macro_pico: number;
  gauss_pico: number;
  relieve_pico: number;
  sobel_x_pico: number;
  sobel_y_pico: number;
}

/**
 * Métricas de intensidad (valores actuales)
 */
interface EstadisticasIntensidad {
  bordes_intensidad: number;
  densidad_intensidad: number;
  densidad_macro_intensidad: number;
  gauss_intensidad: number;
  relieve_intensidad: number;
  sobel_x_intensidad: number;
  sobel_y_intensidad: number;
}

/**
 * Estadísticas completas de un canal
 */
interface EstadisticasCanal extends EstadisticasIntensidad, EstadisticasPico { }

/**
 * Predicción del modelo para un canal
 */
interface PrediccionBS {
  bs_decimal: BSDecimal;
  bs_probs: BSProbs;
  bs_sugerido: BSNormalizado;
  distancia: number;           // Distancia de Hamming entre la regla actual y la sugerida
  explorando: boolean;         // Indica si el modelo está en modo exploración
  regla_cercana: string;       // Nombre de la regla conocida más cercana
}

/**
 * Datos de entrenamiento del modelo para un canal específico
 */
interface EntrenamientoCanal {
  ejemplos_totales: number;
  entreno: boolean;
  perdida: number;             // Loss del modelo
  recompensa: number;          // Reward actual (0.0 - 1.0)
  replay_size: number;
}

/**
 * Diagnóstico completo de un canal
 */
interface DiagnosticoCanal {
  adn_vector: ADNVector;
  estado_global: EstadoGlobal;
  generacion: number;           // Generación actual del autómata
  bs_decimal?: BSDecimal;       // Opcional, presente si hay regla
  bs_normalizado?: BSNormalizado; // Opcional, presente si hay regla
  densidad_real?: number;       // Opcional, densidad poblacional real
  total_celulas?: number;       // Opcional, número de células vivas
  prediccion_bs?: PrediccionBS; // Opcional, predicción del modelo
}

/**
 * Información completa de un canal
 */
interface Canal {
  canal_id: number;
  bs_normalizado?: BSNormalizado;   // Opcional, puede estar vacío
  regla_codificada?: BSNormalizado; // Opcional, regla actual
  regla_cercana?: string;           // Opcional, nombre de regla similar
  total_celulas: number;             // 0 si está vacío
  recompensa: number;                // 0.0 - 1.0
  nota?: string;                     // Mensaje adicional (ej. "canal vacío — sin regla")

  diagnostico: DiagnosticoCanal;
  estadisticas: EstadisticasCanal;
  entrenamiento: EntrenamientoCanal;
}

/**
 * Colección de todos los canales (0-5)
 */
interface Canales {
  canal_0: Canal;
  canal_1: Canal;
  canal_2: Canal;
  canal_3: Canal;
  canal_4: Canal;
  canal_5: Canal;
}

/**
 * Entrada de la matriz de correlación (crosstalk)
 */
interface CrosstalkEntry {
  correlacion: number;         // Coeficiente de correlación (0-1)
  dim_i: number;               // Índice del primer canal/eje
  dim_j: number;               // Índice del segundo canal/eje
  sugerencia: string;          // Recomendación basada en la correlación
}

/**
 * Sugerencia para un canal específico
 */
export interface SugerenciaCanal {
  canal_id: number;
  bs_probs: BSProbs;
  bs_sugerido: BSNormalizado;
  distancia: number;           // Distancia de Hamming
  explorando: boolean;
  regla_cercana: string;
}

/**
 * Sugerencias para todos los canales (normalmente 1-5)
 */
// interface SugerenciasProximas {
//     [key: `canal_${number}`]: SugerenciaCanal;
// }

export interface SugerenciasProximas {

}

/**
 * Datos de entrenamiento global del sistema
 */
export interface EntrenamientoGlobal {
  ejemplos: number;            // Total de ejemplos en el replay buffer
  entreno: boolean;            // Si el modelo global está en entrenamiento
  perdida: number;             // Loss del modelo global
  replay_size: number;         // Tamaño del buffer de experiencia
}

/**
 * Respuesta principal del backend
 */
export interface AutomataResponse {
  // Vector global de 7 dimensiones (promedio de todos los canales)
  adn_global: ADNVector;

  // Canales individuales (0-5)
  canales: Canales;

  // Matriz de correlación entre canales
  crosstalk: CrosstalkEntry[];

  // Datos de entrenamiento del modelo global
  entrenamiento_global: EntrenamientoGlobal;

  // Generación actual del autómata principal
  generacion_automata: number;

  // Generación normalizada (0-1)
  generacion_norm: number;

  // Generación del modelo PyTorch
  generacion_pytorch: number;

  // Sugerencias del modelo para los próximos pasos
  sugerencias_proximas: SugerenciasProximas;
}



// function convertirReglaAVector(notation: string): number[] {
//   // Creamos un array de 18 posiciones (0 a 17)
//   return Array.from({ length: 18 }, (_, i) => {
//     const esNacimiento = i >= 9;
//     const valorBusqueda = esNacimiento ? i - 9 : i;
//     const prefijo = esNacimiento ? 'B' : 'S';

//     // Buscamos la parte correspondiente (S o B) en el string
//     const partes = notation.split('/');
//     const parteInteres = partes.find(p => p.startsWith(prefijo)) || '';

//     // Si el número está en esa parte del string, devolvemos 1, si no 0
//     return parteInteres.includes(valorBusqueda.toString()) ? 1 : 0;
//   });
// }


function convertirReglaAVector(notation: string): number[] {
  const partes = notation.split('/');
  const parteBs = partes.find(p => p.startsWith('B')) || 'B';
  const parteS = partes.find(p => p.startsWith('S')) || 'S';

  // Extraer números con regex — evita el bug de "1" matcheando "12"
  const numeros = (parte: string) =>
    new Set((parte.slice(1).match(/\d/g) || []).map(Number));

  const bornSet = numeros(parteBs);
  const surviveSet = numeros(parteS);

  // Primeros 9 = Born (B0..B8), últimos 9 = Survive (S0..S8)
  return [
    ...Array.from({ length: 9 }, (_, i) => bornSet.has(i) ? 1 : 0),
    ...Array.from({ length: 9 }, (_, i) => surviveSet.has(i) ? 1 : 0),
  ];
}

// Ejemplo "S12/B3": [0, 1, 1, 0, 0, 0, 0, 0, 0,   0, 0, 0, 1, 0, 0, 0, 0, 0]
// Ejemplo "S/B":    [0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0]

interface Cell {
  state: number;
  color: string;
  height: number;
}




const COLOR_MAP: { [key: string]: number } = {
  "GREEN": 1,
  "BROWN": 2, // Nota: Si quieres que BROWN sea 2, lo asociamos así.
  "BLUE": 3,
  "GRAY": 4,
  "RED": 5,
};


const BLUE = 'BLUE';
const RED = 'RED';
const GREEN = 'GREEN';
const BROWN = 'BROWN';
const GRAY = 'GRAY';





@Component({
    selector: 'app-detalle-matriz',
    templateUrl: './detalle-matriz.component.html',
    styleUrls: ['./detalle-matriz.component.css'],
    standalone: false
})
export class DetalleMatrizComponent implements OnInit, OnDestroy, AfterViewInit {
  // [x: string]: string;


  idMatriz: number;
  nombre: string;
  filas: number;
  columnas: number;
  fechaCreacion: string;
  estadoActual: string;
  generacion: number;

  factory2 = new ConcreteShapeFactory()

  automata: Automata
  puedeAvanzar: boolean = true;
  // Regla 1: Pasto
  intervaloEvolucion: number = 250;
  guardando: boolean = false;

  anchoBarra: number = 400;
  anchoCelda: number = 2;

  lastTimeStamp: number = Date.now();

  matrizIA: RespuestaPytorch;

  canales = [1, 2, 3, 4, 5];

  selectedChannel: number = 0;

  matrices: string[] = [
    "bordes",
    "bordes_pool",
    "densidad",
    "densidad_macro",
    "densidad_macro_pool",
    "densidad_pool",
    "gauss",
    "gauss_pool",
    "relieve",
    "relieve_pool",
    "sobel_x",
    "sobel_x_pool",
    "sobel_y",
    "sobel_y_pool",
  ]

  estadisticas = [
    "bordes_intensidad",
    "bordes_pico",
    "densidad_intensidad",
    "densidad_macro_intensidad",
    "densidad_macro_pico",
    "densidad_pico",
    "gauss_intensidad",
    "gauss_pico",
    "relieve_intensidad",
    "relieve_pico",
    "sobel_x_intensidad",
    "sobel_x_pico",
    "sobel_y_intensidad",
    "sobel_y_pico"
  ]

  intervaloGeneracion: number;

  sugerencia_canal_1: string | undefined = "";
  sugerencia_canal_2: string | undefined = "";
  sugerencia_canal_3: string | undefined = "";
  sugerencia_canal_4: string | undefined = "";
  sugerencia_canal_5: string | undefined = "";

  shapeFactory: ShapeFactory = new ConcreteShapeFactory();
  estado_global_canal_1: string | undefined = undefined;
  estado_global_canal_2: string | undefined = undefined;
  estado_global_canal_3: string | undefined = undefined;
  estado_global_canal_4: string | undefined = undefined;
  estado_global_canal_5: string | undefined = undefined;

  densidad_real_canal_1: number | undefined = undefined;
  densidad_real_canal_2: number | undefined = undefined;
  densidad_real_canal_3: number | undefined = undefined;
  densidad_real_canal_4: number | undefined = undefined;
  densidad_real_canal_5: number | undefined = undefined;

  total_celulas_canal_1: number | undefined = undefined;
  total_celulas_canal_2: number | undefined = undefined;
  total_celulas_canal_3: number | undefined = undefined;
  total_celulas_canal_4: number | undefined = undefined;
  total_celulas_canal_5: number | undefined = undefined;

  implementarSugerencias = false;
  canalesVacios = 0;

  infoText: string = "";


  VISTA_ISOMETRICA = 1;
  VISTA_PLANA = 2;
  VISTA_FILTROS = 3;
  VISTA_ALL = 4;
  VISTA_CANALES = 5;

  vistaActual: number = this.VISTA_ISOMETRICA;

  reglas = [
    {
      id: 1,
      color: 'Green',
      name: '',
      notation: ''
    },
    {
      id: 2,
      color: 'Brown',
      name: '',
      notation: ''
    },
    {
      id: 3,
      color: 'Blue',
      name: '',
      notation: ''
    },
    {
      id: 4,
      color: 'Gray',
      name: '',
      notation: ''
    },
    {
      id: 5,
      color: 'Red',
      name: '',
      notation: ''
    },
  ]

  EVOLUCION = "EVOLUCION";
  CONTROL_REGLAS = "CONTROL_REGLAS";
  STATS = "STATS";
  STYLES = "STYLES";


  menuAbierto: string = "EVOLUCION";
  canalActivoControlRegla: number = 1;


  constructor(
    private route: ActivatedRoute,
    public geometry: GeometryService,
    private router: Router,

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



          // la matriz existe 
          if (matriz.datos_matriz.length !== 0) {

            this.automata = this.factory2.createMilitaryCube(this.filas, this.columnas)
            this.automata.changeRule(BLUE, matriz.blue_rule)
            this.automata.changeRule(BROWN, matriz.brown_rule)
            this.automata.changeRule(GRAY, matriz.gray_rule)
            this.automata.changeRule(GREEN, matriz.green_rule)
            this.automata.changeRule(RED, matriz.red_rule)
            this.automata.setMatrizActiva(matriz.datos_matriz)
            this.automata.setGeneration(matriz.generacion)
            this.puedeAvanzar = true;

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
            this.automata.estado_actual = matriz.estado_actual;
            this.automata.scale = matriz.escala;
            this.automata.escalaVistaPlana = matriz.escala_vista_plana;

            this.puedeAvanzar = true;
            this.automata.estado_actual = 'Activo';
          }


          else {
            this.automata = this.factory2.crearAutomataNuevo(this.filas, this.columnas);
            this.automata.altura_regla_1 = matriz.altura_regla_1;
            this.automata.altura_regla_2 = matriz.altura_regla_2;
            this.automata.altura_regla_3 = matriz.altura_regla_3;
            this.automata.altura_regla_4 = matriz.altura_regla_4;
            this.automata.altura_regla_5 = matriz.altura_regla_5;


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

          for (let i = 0; i < 170; i++) {
            this.automata.izquierda();
          }
          for (let i = 0; i < 100; i++) {
            this.automata.subir();
          }



          // this.dibujarMatriz(this.getMatrizActiva())
          // this.automata.avanzarUnaGeneracion();
          this.automata.dibujarMatriz(this.automata.getMatrizActiva());

          setInterval(() => {
            if (this.automata.totalSumadoElementos() < 5) {
              console.log("la densidad es demasiado baja ")
              // this.geometry.resetEpisodio()
              //   .subscribe(() => {
              //     this.automata.reset();
              //   });
            } else {
              let canales_vacios = 0;
              if (this.automata.totalVerdes() === 0) {
                canales_vacios++;
              }
              if (this.automata.totalAzules() === 0) {
                canales_vacios++;
              }
              if (this.automata.totalCafes() === 0) {
                canales_vacios++;
              }
              if (this.automata.totalGrises() === 0) {
                canales_vacios++;
              }
              if (this.automata.totalRojos() === 0) {
                canales_vacios++;
              }

              if (canales_vacios > 3 && this.automata.getGeneration() > 10) {
                this.infoText = "demasiados canales vacios"
                // this.geometry.resetEpisodio()
                //   .subscribe(() => {
                //     this.automata.reset();
                //   });
              }


            }



            // console.log('intentando avanzar ..')
            //
            if (this.automata.estado_actual !== 'Inicial' && this.puedeAvanzar && this.puedeAvanzar) {

              // this.nextGenStrategy.nextGeneration(this);
              if (this.geometry.modo_actual === this.geometry.MANUAL || this.geometry.modo_actual === this.geometry.HIBRIDO) {
                this.automata.getNexGenStategy().nextGeneration(this.automata);
              }

              this.automata.avanzarUnaGeneracion()


              const now = Date.now()
              // console.log('timestamp ', now - this.lastTimeStamp)
              this.intervaloGeneracion = now - this.lastTimeStamp
              this.lastTimeStamp = now

              // this.generacion += 1;
              if ((this.automata.getGeneration() % 100 === 0 && this.automata.getGeneration() !== 0) && this.puedeAvanzar) {
                this.guardarMatriz();
              }


              // if (this.geometry.modo_actual === this.geometry.AUTONOMO || this.geometry.modo_actual === this.geometry.HIBRIDO) {
              if (this.automata.getGeneration() % 50 === 0 && this.puedeAvanzar) {
                this.solicitarSugerencias();
              }
              // }
              if (this.automata.getGeneration() % 3 && this.vistaActual === this.VISTA_FILTROS) {

                this.processChannel();
              }




            }



          }, this.intervaloEvolucion);



          // console.log(matriz);
        })
    })


  }

  resetEpisodio(): void {
    this.geometry.resetEpisodio()
      .subscribe(() => {
        this.automata.reset();
      });
  }
  ngAfterViewInit(): void {
    // console.log('after view init')
    //throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.puedeAvanzar = false;
  }

  ngOnInit(): void {
    this.puedeAvanzar = true

  }

  navigateTo3dView(): void {
    this.router.navigate(['matrices/3d', this.idMatriz])
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/matrices/3d', this.idMatriz])
    // );
    // window.open(url, '_blank')
    // path: 'matrices/3d/:id',
  }
  getColorCanal(colorInput: string): string {

    switch (colorInput) {
      case "Red":
        return this.automata.regla_1_color_2 ? this.automata.regla_1_color_2 : "red";
      case "Blue":
        return this.automata.regla_2_color_2 ? this.automata.regla_2_color_2 : "blue";
      case "Green":
        return this.automata.regla_3_color_2 ? this.automata.regla_3_color_2 : "green";
      case "Brown":
        return this.automata.regla_4_color_2 ? this.automata.regla_4_color_2 : 'brown';
      case "Gray":
        return this.automata.regla_5_color_2 ? this.automata.regla_5_color_2 : 'gray';

      default:
        return "#fff"
    }

  }
  guardarMatriz(): void {

    this.guardando = true;

    this.geometry.actualizarMatriz(
      this.idMatriz,
      this.nombre,
      this.automata.getGeneration(),
      this.automata

    ).subscribe(resp => {

      this.guardando = false;

      // esta es la llamada a la api de flask

    });
  }


  // reset_all(): void {
  //   this.automata.reset()
  //   this.geometry.automataV2(
  //     {
  //       generacion: this.automata.getGeneration(),
  //       canal_0: this.binarizarCanal(0),
  //       "canales": [
  //         {
  //           "canal_id": 1,
  //           "matriz": this.binarizarCanal(1),
  //           "total": this.automata.totalVerdes(),
  //           "regla_codificada": convertirReglaAVector(this.automata.getGreenRule().notation),
  //         },
  //         {
  //           "canal_id": 2,
  //           "matriz": this.binarizarCanal(2),
  //           "total": this.automata.totalCafes(),
  //           "regla_codificada": convertirReglaAVector(this.automata.getBrownRule().notation),
  //         },
  //         {
  //           "canal_id": 3,
  //           "matriz": this.binarizarCanal(3),
  //           "total": this.automata.totalAzules(),
  //           "regla_codificada": convertirReglaAVector(this.automata.getBlueRule().notation),
  //         },
  //         {
  //           "canal_id": 4,
  //           "matriz": this.binarizarCanal(4),
  //           "total": this.automata.totalGrises(),
  //           "regla_codificada": convertirReglaAVector(this.automata.getGrayRule().notation),
  //         },
  //         {
  //           "canal_id": 5,
  //           "matriz": this.binarizarCanal(5),
  //           "total": this.automata.totalRojos(),
  //           "regla_codificada": convertirReglaAVector(this.automata.getRedRule().notation),
  //         }
  //       ],
  //     }
  //   )
  //     .subscribe(x => {
  //       this.sugerencia_canal_1 = x["canales"]["canal_1"]["regla_cercana"];
  //       this.sugerencia_canal_2 = x["canales"]["canal_2"]["regla_cercana"];
  //       this.sugerencia_canal_3 = x["canales"]["canal_3"]["regla_cercana"];
  //       this.sugerencia_canal_4 = x["canales"]["canal_4"]["regla_cercana"];
  //       this.sugerencia_canal_5 = x["canales"]["canal_5"]["regla_cercana"];

  //       this.estado_global_canal_1 = x["canales"]["canal_1"]["diagnostico"]["estado_global"];
  //       this.estado_global_canal_2 = x["canales"]["canal_2"]["diagnostico"]["estado_global"];
  //       this.estado_global_canal_3 = x["canales"]["canal_3"]["diagnostico"]["estado_global"];
  //       this.estado_global_canal_4 = x["canales"]["canal_4"]["diagnostico"]["estado_global"];
  //       this.estado_global_canal_5 = x["canales"]["canal_5"]["diagnostico"]["estado_global"];



  //       this.densidad_real_canal_1 = x["canales"]["canal_1"]["diagnostico"]["densidad_real"];
  //       this.densidad_real_canal_2 = x["canales"]["canal_2"]["diagnostico"]["densidad_real"];
  //       this.densidad_real_canal_3 = x["canales"]["canal_3"]["diagnostico"]["densidad_real"];
  //       this.densidad_real_canal_4 = x["canales"]["canal_4"]["diagnostico"]["densidad_real"];
  //       this.densidad_real_canal_5 = x["canales"]["canal_5"]["diagnostico"]["densidad_real"];

  //       this.total_celulas_canal_1 = x["canales"]["canal_1"]["diagnostico"]["total_celulas"];
  //       this.total_celulas_canal_2 = x["canales"]["canal_2"]["diagnostico"]["total_celulas"];
  //       this.total_celulas_canal_3 = x["canales"]["canal_3"]["diagnostico"]["total_celulas"];
  //       this.total_celulas_canal_4 = x["canales"]["canal_4"]["diagnostico"]["total_celulas"];
  //       this.total_celulas_canal_5 = x["canales"]["canal_5"]["diagnostico"]["total_celulas"];

  //       this.automata.setGreenRule(this.shapeFactory.createRule(this.sugerencia_canal_1))
  //       this.automata.setBrownRule(this.shapeFactory.createRule(this.sugerencia_canal_2))
  //       this.automata.setBlueRule(this.shapeFactory.createRule(this.sugerencia_canal_3))
  //       this.automata.setGrayRule(this.shapeFactory.createRule(this.sugerencia_canal_4))
  //       this.automata.setRedRule(this.shapeFactory.createRule(this.sugerencia_canal_5))

  //       this.automata.avanzarUnaGeneracion()
  //     });
  // }


  solicitarSugerencias(): void {
    this.geometry.automataV2(
      {
        generacion: this.automata.getGeneration(),
        canal_0: this.binarizarCanal(0),
        "canales": [
          {
            "canal_id": 1,
            "matriz": this.binarizarCanal(1),
            "total": this.automata.totalVerdes(),
            "regla_codificada": convertirReglaAVector(this.automata.getGreenRule().notation),
          },
          {
            "canal_id": 2,
            "matriz": this.binarizarCanal(2),
            "total": this.automata.totalCafes(),
            "regla_codificada": convertirReglaAVector(this.automata.getBrownRule().notation),
          },
          {
            "canal_id": 3,
            "matriz": this.binarizarCanal(3),
            "total": this.automata.totalAzules(),
            "regla_codificada": convertirReglaAVector(this.automata.getBlueRule().notation),
          },
          {
            "canal_id": 4,
            "matriz": this.binarizarCanal(4),
            "total": this.automata.totalGrises(),
            "regla_codificada": convertirReglaAVector(this.automata.getGrayRule().notation),
          },
          {
            "canal_id": 5,
            "matriz": this.binarizarCanal(5),
            "total": this.automata.totalRojos(),
            "regla_codificada": convertirReglaAVector(this.automata.getRedRule().notation),
          }
        ],
      }
    )
      .subscribe(x => {
        // if (this.geometry.modo_actual === this.geometry.AUTONOMO || this.geometry.modo_actual === this.geometry.HIBRIDO) {
        this.sugerencia_canal_1 = x["canales"]["canal_1"]["regla_cercana"];
        this.sugerencia_canal_2 = x["canales"]["canal_2"]["regla_cercana"];
        this.sugerencia_canal_3 = x["canales"]["canal_3"]["regla_cercana"];
        this.sugerencia_canal_4 = x["canales"]["canal_4"]["regla_cercana"];
        this.sugerencia_canal_5 = x["canales"]["canal_5"]["regla_cercana"];

        this.estado_global_canal_1 = x["canales"]["canal_1"]["diagnostico"]["estado_global"];
        this.estado_global_canal_2 = x["canales"]["canal_2"]["diagnostico"]["estado_global"];
        this.estado_global_canal_3 = x["canales"]["canal_3"]["diagnostico"]["estado_global"];
        this.estado_global_canal_4 = x["canales"]["canal_4"]["diagnostico"]["estado_global"];
        this.estado_global_canal_5 = x["canales"]["canal_5"]["diagnostico"]["estado_global"];

        this.densidad_real_canal_1 = x["canales"]["canal_1"]["diagnostico"]["densidad_real"];
        this.densidad_real_canal_2 = x["canales"]["canal_2"]["diagnostico"]["densidad_real"];
        this.densidad_real_canal_3 = x["canales"]["canal_3"]["diagnostico"]["densidad_real"];
        this.densidad_real_canal_4 = x["canales"]["canal_4"]["diagnostico"]["densidad_real"];
        this.densidad_real_canal_5 = x["canales"]["canal_5"]["diagnostico"]["densidad_real"];

        this.total_celulas_canal_1 = x["canales"]["canal_1"]["diagnostico"]["total_celulas"];
        this.total_celulas_canal_2 = x["canales"]["canal_2"]["diagnostico"]["total_celulas"];
        this.total_celulas_canal_3 = x["canales"]["canal_3"]["diagnostico"]["total_celulas"];
        this.total_celulas_canal_4 = x["canales"]["canal_4"]["diagnostico"]["total_celulas"];
        this.total_celulas_canal_5 = x["canales"]["canal_5"]["diagnostico"]["total_celulas"];

        if (this.automata.getGeneration() > 30 && (this.geometry.modo_actual === this.geometry.AUTONOMO || this.geometry.modo_actual === this.geometry.HIBRIDO)) {

          this.automata.setGreenRule(this.shapeFactory.createRule(this.sugerencia_canal_1))
          this.automata.setBrownRule(this.shapeFactory.createRule(this.sugerencia_canal_2))
          this.automata.setBlueRule(this.shapeFactory.createRule(this.sugerencia_canal_3))
          this.automata.setGrayRule(this.shapeFactory.createRule(this.sugerencia_canal_4))
          this.automata.setRedRule(this.shapeFactory.createRule(this.sugerencia_canal_5))
        }
        // }
      });
  }


  processChannel(): void {
    this.geometry.automata(
      this.binarizarCanal(this.selectedChannel),
      // this.convertMatrixToNumeric(this.automata.getMatrizActiva())
    )
      .subscribe(x => {
        this.matrizIA = x;

      });




  }


  getColor(value: number): string {
    // Mapeamos 0-9 a un porcentaje de luminosidad (100% a 10%)
    // 0 -> 100% (Blanco)
    // 9 -> 10% (Gris casi negro)
    const lightness = 100 - (value * 10);
    return `hsl(0, 0%, ${lightness}%)`;
  }
  convertMatrixToNumeric(matrix: any): number[][] {
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

  binarizarCanal(valorObjetivo: number): number[][] {

    if (valorObjetivo === 0) {
      return this.convertMatrixToNumeric(this.automata.getMatrizActiva()).map(fila =>
        fila.map(celda => (celda === 0 ? 1 : 0)))
    }

    return this.convertMatrixToNumeric(this.automata.getMatrizActiva()).map(fila =>
      fila.map(celda => (celda === valorObjetivo ? 1 : 0))
    );
  }



}
