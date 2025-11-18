import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recta } from './funcion-logaritmica/recta';
import { Perpendicular } from './funcion-logaritmica/perpendicular';
import { Point } from 'point';
import { Nodo } from 'src/Nodo';
import { Automata } from 'cube';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  constructor(private http: HttpClient) { }

  obtenerPuntos(): Observable<Point[]> {
    return this.http.get<Point[]>('http://localhost:5001/puntos/');
  }

  obtenerRectas(lienzoId: number): Observable<Recta[]> {
    return this.http.get<Recta[]>(`http://localhost:8000/graficas/rectas/?lienzo=${lienzoId}`);
  }

  obtenerNodos(): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`http://localhost:8000/graficas/nodos/`);
  }

  obtenerDetalleNodo(nodoId: number): Observable<Nodo> {
    return this.http.get<Nodo>(`http://localhost:8000/graficas/nodos/${nodoId}/`);
  }

  obtenerDetalleMatriz(matrizId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/graficas/matrices/${matrizId}/`);
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
    return this.http.put<any>(`http://localhost:8000/graficas/matrices/${id}/`, {
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
    });
  }
      // this.automata.getMatrizActiva(),
      // this.automata.getBlueRule().name,
      // this.automata.getBrownRule().name,
      // this.automata.getGrayRule().name,
      // this.automata.getGreenRule().name,
      // this.automata.getRedRule().name,




  obtenerHijos(padreId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/graficas/nodos/?padre_id=${padreId}`);
  }


  obtenerMatrices(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/graficas/matrices/`);
  }










  obtenerCircunferencias(): Observable<{id: number, x: number, y: number, radio: number}[]> {
    return this.http.get<{id: number, x: number, y: number, radio: number}[]>('http://localhost:5001/circunferencias/');
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


  actualizarPunto(id: number, x: number, y: number): Observable<{status: boolean}[]> {
    return this.http.put<{status: boolean}[]>(`http://localhost:5001/puntos/${id}/`, {
      x: x,
      y: y
    });
  }

  crearPunto(lienzoId: number, x: number, y: number): Observable<{status: boolean}[]> {
    return this.http.post<{status: boolean}[]>(`http://localhost:8000/graficas/puntos/`, {
      lienzo: lienzoId,
      x: x,
      y: y
    });
  }

  crearNodo(padreId: number, nombreNodo: string, is_leaf: boolean): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/graficas/nodos/`, {
      nombre: nombreNodo,
      padreId: padreId,
      is_leaf: is_leaf
    });
  }



  actualizarNodo(id: number, padreId: number, nombreNodo: string, automataId: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/graficas/nodos/${id}/`, {
      nombre: nombreNodo,
      padreId: padreId,
      matriz_ac: automataId
    });
  }


  crearMatriz(nombre: string, filas: number, columnas: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/graficas/matrices/`, {
      nombre: nombre,
      filas: filas,
      columnas: columnas
    });
  }




  crearNodoRaiz(nombre: string): Observable<{status: boolean}[]> {
    return this.http.post<{status: boolean}[]>(`http://localhost:8000/graficas/nodos/`, {
      nombre: nombre,
    });
  }



  crearRecta(lienzoId: number, p1: number, p2: number): Observable<{status: boolean}[]> {
    return this.http.post<{status: boolean}[]>(`http://localhost:8000/graficas/rectas/`, {
      lienzo: Number( lienzoId ),
      p1: p1,
      p2:p2 
    });
  }




  borrarPunto(id: number): Observable<{status: boolean}[]> {
    return this.http.delete<{status: boolean}[]>(`http://localhost:5001/puntos/${id}/` );
  }

  borrarNodo(id: number): Observable<{status: boolean}[]> {
    return this.http.delete<{status: boolean}[]>(`http://localhost:8000/graficas/nodos/${id}/` );
  }

  automata(automata: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5001/automata`,
    {
      matriz: automata

    } );
  }





}
