import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recta } from './funcion-logaritmica/recta';
import { Perpendicular } from './funcion-logaritmica/perpendicular';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  constructor(private http: HttpClient) { }

  obtenerPuntos(): Observable<{id: number, x: number, y: number}[]> {
    return this.http.get<{id: number, x: number, y: number}[]>('http://localhost:5001/puntos/');
  }

  obtenerRectas(): Observable<Recta[]> {
    return this.http.get<Recta[]>('http://localhost:5001/rectas/');
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

  crearPunto( x: number, y: number): Observable<{status: boolean}[]> {
    return this.http.post<{status: boolean}[]>(`http://localhost:5001/puntos/`, {
      x: x,
      y: y
    });
  }

  borrarPunto(id: number): Observable<{status: boolean}[]> {
    return this.http.delete<{status: boolean}[]>(`http://localhost:5001/puntos/${id}/` );
  }



}
