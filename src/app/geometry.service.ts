import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recta } from './funcion-logaritmica/recta';
import { Perpendicular } from './funcion-logaritmica/perpendicular';
import { Point } from 'point';
import { Nodo } from 'src/Nodo';
import { Automata } from 'cube';
import { RespuestaPytorch } from './respuesta-pytorch';
import { AutomataResponse } from './detalle-matriz/detalle-matriz.component';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  defaultPort: number = 8001;
  public MANUAL = "MANUAL";
  public HIBRIDO = "HIBRIDO";
  public AUTONOMO = "AUTONOMO";
  public SIN_INTERVENCION = "SIN INTERVENCION";

  public modo_actual: string = this.SIN_INTERVENCION;



  constructor(private http: HttpClient) { }

  obtenerPuntos(): Observable<Point[]> {
    return this.http.get<Point[]>('http://localhost:5001/puntos/');
  }

  obtenerRectas(lienzoId: number): Observable<Recta[]> {
    return this.http.get<Recta[]>(`http://localhost:8001/graficas/rectas/?lienzo=${lienzoId}`);
  }

  obtenerNodos(): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`http://localhost:8001/graficas/nodos/`);
  }

  obtenerDetalleNodo(nodoId: number): Observable<Nodo> {
    return this.http.get<Nodo>(`http://localhost:8001/graficas/nodos/${nodoId}/`);
  }

  obtenerDetalleMatriz(matrizId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8001/graficas/matrices/${matrizId}/`);
  }

  actualizarMatriz(
    id: number,
    nombre: string,
    generacion: number,
    automata: Automata
    // datosMatriz: any,
    // blue_rule: string,
    // brown_rule: string,
    // gray_rule: string,
    // green_rule: string,
    // red_rule: string

  ): Observable<any> {
    return this.http.put<any>(`http://localhost:8001/graficas/matrices/${id}/`, {
      nombre: nombre,
      datos_matriz: automata.getMatrizActiva(),
      generacion: generacion,
      blue_rule: automata.getBlueRule().name,
      brown_rule: automata.getBrownRule().name,
      gray_rule: automata.getGrayRule().name,
      green_rule: automata.getGreenRule().name,
      red_rule: automata.getRedRule().name,
      rule_1_color_1: automata.regla_1_color_1,
      rule_1_color_2: automata.regla_1_color_2,
      rule_1_color_3: automata.regla_1_color_3,
      rule_2_color_1: automata.regla_2_color_1,
      rule_2_color_2: automata.regla_2_color_2,
      rule_2_color_3: automata.regla_2_color_3,
      rule_3_color_1: automata.regla_3_color_1,
      rule_3_color_2: automata.regla_3_color_2,
      rule_3_color_3: automata.regla_3_color_3,
      rule_4_color_1: automata.regla_4_color_1,
      rule_4_color_2: automata.regla_4_color_2,
      rule_4_color_3: automata.regla_4_color_3,
      rule_5_color_1: automata.regla_5_color_1,
      rule_5_color_2: automata.regla_5_color_2,
      rule_5_color_3: automata.regla_5_color_3,
      altura_regla_1: automata.altura_regla_1,
      altura_regla_2: automata.altura_regla_2,
      altura_regla_3: automata.altura_regla_3,
      altura_regla_4: automata.altura_regla_4,
      altura_regla_5: automata.altura_regla_5,
      escala: automata.scale,
      escala_vista_plana: automata.escalaVistaPlana
    });
  }
  // this.automata.getMatrizActiva(),
  // this.automata.getBlueRule().name,
  // this.automata.getBrownRule().name,
  // this.automata.getGrayRule().name,
  // this.automata.getGreenRule().name,
  // this.automata.getRedRule().name,




  obtenerHijos(padreId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8001/graficas/nodos/?padre_id=${padreId}`);
  }


  obtenerMatrices(url: string = `http://localhost:8001/graficas/matrices/`): Observable<any[]> {
    return this.http.get<any[]>(url);
  }










  obtenerCircunferencias(): Observable<{ id: number, x: number, y: number, radio: number }[]> {
    return this.http.get<{ id: number, x: number, y: number, radio: number }[]>('http://localhost:5001/circunferencias/');
  }

  obtenerPerpendiculares(): Observable<Perpendicular[]> {
    return this.http.get<Perpendicular[]>('http://localhost:5001/perpendiculares/');
  }

  puntoPerpendicular(x1: number, y1: number, x2: number, y2: number, px: number, py: number): [number, number] {
    // Calcular la pendiente de la recta original
    const m = (y2 - y1) / (x2 - x1);

    // Calcular la pendiente de la recta perpendicular
    const mPerpendicular = -1 / m;

    // Ecuación de la recta perpendicular en forma punto-pendiente
    const ecuacionPerpendicular = (x: number) => mPerpendicular * (x - px) + py;

    // Resolver el sistema de ecuaciones (puede ser numéricamente, por ejemplo, usando una biblioteca como mathjs)
    // Aquí se asume una implementación de resolverSistemaEcuaciones que resuelve sistemas de dos ecuaciones lineales
    const [xInterseccion, yInterseccion] = this.resolverSistemaEcuaciones(
      (x) => m * (x - x1) + y1, // Ecuación de la recta original
      ecuacionPerpendicular // Ecuación de la recta perpendicular
    );

    return [xInterseccion, yInterseccion];
  }

  resolverSistemaEcuaciones(ecuacion1: (x: number) => number, ecuacion2: (x: number) => number): [number, number] {
    // Igualamos ambas ecuaciones
    const igualarEcuaciones = (x: number) => ecuacion1(x) - ecuacion2(x);

    // Utilizamos un método numérico para encontrar la raíz de la ecuación igualarEcuaciones
    // Aquí usaremos el método de la bisección como ejemplo
    const xInterseccion = this.biseccion(igualarEcuaciones, -100, 100); // Ajustar el intervalo según sea necesario

    // Calculamos el valor de y sustituyendo x en cualquiera de las ecuaciones
    const yInterseccion = ecuacion1(xInterseccion);

    return [xInterseccion, yInterseccion];
  }

  biseccion(f: (x: number) => number, a: number, b: number, tolerancia = 1e-6): number {
    // Método de la bisección para encontrar la raíz de una función
    if (f(a) * f(b) >= 0) {
      throw new Error('La función debe cambiar de signo en el intervalo');
    }

    let c: number = 0;
    while (Math.abs(b - a) > tolerancia) {
      c = (a + b) / 2;
      if (f(c) === 0.0) {
        break;
      } else if (f(c) * f(a) < 0) {
        b = c;
      } else {
        a = c;
      }
    }
    return c;
  }


  actualizarPunto(id: number, x: number, y: number): Observable<{ status: boolean }[]> {
    return this.http.put<{ status: boolean }[]>(`http://localhost:5001/puntos/${id}/`, {
      x: x,
      y: y
    });
  }

  crearPunto(lienzoId: number, x: number, y: number): Observable<{ status: boolean }[]> {
    return this.http.post<{ status: boolean }[]>(`http://localhost:8001/graficas/puntos/`, {
      lienzo: lienzoId,
      x: x,
      y: y
    });
  }

  crearNodo(padreId: number, nombreNodo: string, is_leaf: boolean): Observable<any> {
    return this.http.post<any>(`http://localhost:8001/graficas/nodos/`, {
      nombre: nombreNodo,
      padreId: padreId,
      is_leaf: is_leaf
    });
  }



  actualizarNodo(id: number, padreId: number, nombreNodo: string, automataId: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8001/graficas/nodos/${id}/`, {
      nombre: nombreNodo,
      padreId: padreId,
      matriz_ac: automataId
    });
  }


  crearMatriz(nombre: string, filas: number, columnas: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8001/graficas/matrices/`, {
      nombre: nombre,
      filas: filas,
      columnas: columnas,
      altura_regla_1: 2,
      altura_regla_2: 1,
      altura_regla_3: 4,
      altura_regla_4: 3,
      altura_regla_5: 3,
      rule_1_color_1: "#b90428",
      rule_1_color_2: "#f10909",
      rule_1_color_3: "#840b0b",
      rule_2_color_1: "#08068e",
      rule_2_color_2: "#0810f7",
      rule_2_color_3: "#0b2e7f",
      rule_3_color_1: "#0c7321",
      rule_3_color_2: "#1cc457",
      rule_3_color_3: "#0c5f11",
      rule_4_color_1: "#5f3a07",
      rule_4_color_2: "#9f4d09",
      rule_4_color_3: "#7f4005",
      rule_5_color_1: "#5c5757",
      rule_5_color_2: "#908484",
      rule_5_color_3: "#5e5555",
    });
  }

  createMatrixWithData(nombre: string, filas: number, columnas: number, data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8001/graficas/matrices/`, {
      nombre: nombre,
      filas: filas,
      columnas: columnas,
      datos_matriz: data,
      blue_rule: "day and night",
      red_rule: "day and night",
      brown_rule: "day and night",
      gray_rule: "day and night",
      green_rule: "day and night",
    });
  }



  resetEpisodio(): Observable<{ ok: boolean, mensaje: string }[]> {
    return this.http.post<{ ok: boolean, mensaje: string }[]>(`http://localhost:5002/reset_episodio`, {

    });
  }
  // return jsonify({
  //     "ok":      True,
  //     "mensaje": "Episodio reseteado. Pesos y aprendizaje conservados.",
  // })



  crearNodoRaiz(nombre: string): Observable<{ status: boolean }[]> {
    return this.http.post<{ status: boolean }[]>(`http://localhost:8001/graficas/nodos/`, {
      nombre: nombre,
    });
  }



  crearRecta(lienzoId: number, p1: number, p2: number): Observable<{ status: boolean }[]> {
    return this.http.post<{ status: boolean }[]>(`http://localhost:8001/graficas/rectas/`, {
      lienzo: Number(lienzoId),
      p1: p1,
      p2: p2
    });
  }




  borrarPunto(id: number): Observable<{ status: boolean }[]> {
    return this.http.delete<{ status: boolean }[]>(`http://localhost:5001/puntos/${id}/`);
  }

  borrarNodo(id: number): Observable<{ status: boolean }[]> {
    return this.http.delete<{ status: boolean }[]>(`http://localhost:8001/graficas/nodos/${id}/`);
  }

  automata(automata: any): Observable<RespuestaPytorch> {
    return this.http.post<RespuestaPytorch>(`http://localhost:5003/automata`,
      {
        matriz: automata

      });
  }

  automataV2(payload: PayloadPytorch): Observable<LightPytorchResponse> {
    return this.http.post<LightPytorchResponse>(`http://localhost:5002/automata_v2/sugerencias`,

      payload

    );
  }

}

/**
 * Representa el diagnóstico detallado de un canal específico.
 */
interface Diagnostico {
  adn_vector: number[];
  estado_global: "ESTABLE" | "SOBREPOBLADO" | "CAÓTICO";
  // Estas propiedades son opcionales porque canal_0 no las incluye en tu JSON
  densidad_real?: number;
  total_celulas?: number;
  generacion?: number;
}

/**
 * Representa la configuración y estado de un canal individual.
 */
interface Canal {
  canal_id?: number;
  diagnostico: Diagnostico;
  bs_decimal?: number[];
  bs_sugerido?: number[];
  distancia?: number;
  explorando?: boolean;
  regla_cercana?: string;
  matriz: number[][];
  total: number;
  regla_codificada: number[];
}



interface CanalPayload {
  canal_id: number;
  matriz: number[][];
  total: number;
  regla_codificada: number[];
}
/**
 * Interfaz principal para el objeto del autómata.
 */
interface LightPytorchResponse {
  adn_global: number[];
  canales: {
    [key: string]: Canal; // Permite canal_0, canal_1, etc.
  };
  generacion_automata: number;
}

// interface Canal {
//   canal_id: number;
//   matriz: number[][];
//   total: number;
//   regla_codificada: number[]; // Siempre presente en la interfaz de la lista
//   recompensa?: number;        // Opcional por ahora
// }

interface PayloadPytorch {
  generacion: number;
  canal_0: number[][]; // El fondo se envía por separado como matriz simple
  canales: CanalPayload[];    // Array de objetos
}