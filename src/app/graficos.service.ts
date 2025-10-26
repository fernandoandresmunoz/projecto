import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lienzo } from './lienzo';
import { Point } from 'point';
import { Canvas } from './canvas';

// URL base de tu API de Django. Asegúrate de ajustarla si es necesario.
// Si estás usando Django en localhost:8000 y el path 'api/', la ruta es:
const API_URL = 'http://localhost:8000/graficas/lienzos/'; 

@Injectable({
  providedIn: 'root'
})
export class LienzosService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de Lienzos desde el backend de Django.
   * La respuesta de DRF puede variar (lista directa o un objeto con 'results'). 
   * Asumimos que es una lista directa si no se usa paginación.
   */
  getLienzos(): Observable<Canvas[]> {
    return this.http.get<Canvas[]>(API_URL);
  }


  getPoints(lienzoID: number): Observable<Point[]> {
    return this.http.get<Point[]>(`http://localhost:8000/graficas/puntos/?lienzo=${lienzoID}`);
  }

  createCanvas(canvasData: Canvas) {
    return this.http.post<any[]>(`http://localhost:8000/graficas/lienzos/`,
    
    canvasData
  

    );
  }




  // Aquí se añadirían métodos futuros para:
  // getLienzo(id: number): Observable<Lienzo>
  // crearLienzo(lienzo: Lienzo): Observable<Lienzo>
  // actualizarLienzo(lienzo: Lienzo): Observable<Lienzo>
}