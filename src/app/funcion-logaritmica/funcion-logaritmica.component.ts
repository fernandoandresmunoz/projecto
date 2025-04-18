import { Component, OnInit } from '@angular/core';
import { ConcreteLine } from 'concrete-line';
import { ConcretePoint } from 'concrete-point';
import { HttpClient } from '@angular/common/http';
import { GeometryService } from '../geometry.service';
import { Recta } from './recta';
import { Perpendicular } from './perpendicular';


interface Punto {
  x: number,
  y: number,
  activo: string
}


@Component({
  selector: 'app-funcion-logaritmica',
  templateUrl: './funcion-logaritmica.component.html',
  styleUrls: ['./funcion-logaritmica.component.styl']
})
export class FuncionLogaritmicaComponent implements OnInit {

  puntoA = { x: 36, y: 0 };
  puntoB = { x: 0, y: 0 };
  puntoC = { x: 0, y: 36 };

  nuevoX: number;
  nuevoY: number;


  puntos: {id: number, x: number, y: number}[] = [];
  rectas: Recta[] = [];
  perpendiculares: Perpendicular[] = []
  circunferencias: {x: number, y: number, radio: number}[] = [];

  selectedMenu: string = 'PUNTOS';


  constructor(public geometry: GeometryService) { }

  ngOnInit(): void {
    this.cargarPuntos();
    this.cargarRectas();
    this.cargarCircunferencias();
    this.cargarPerpendiculares();
  }

  actualizarPunto(punto: {id: number, x: number, y: number}) {
    this.geometry.actualizarPunto(punto.id, punto.x, punto.y).subscribe( response => {
      console.log(response);
    })
  }

  crearPunto(): void {
    this.geometry.crearPunto(this.nuevoX, this.nuevoY)
    .subscribe( response => {
      console.log(response)
    } )
  }
  borrarPunto(id: number): void {
    this.geometry.borrarPunto(id)
    .subscribe( response => {
      console.log(response)
    } )
  }


  obtenerPuntos(): {id: number, x: number, y: number}[]  {
    return this.puntos;
  }

  obtenerRectas(): Recta[] {
    return this.rectas;
  }

  obtenerCircunferencias() : {x: number, y: number, radio: number}[] {
    return this.circunferencias;
  }

  obtenerPerpendiculares(): Perpendicular[] {
    return this.perpendiculares;
  }

  cargarPuntos() {
    this.geometry.obtenerPuntos().subscribe(response => {
      this.puntos = response;
    })
  }
cargarRectas() {
    this.geometry.obtenerRectas().subscribe(response => {
      this.rectas = response;
    })
  }

  cargarPerpendiculares() {
    this.geometry.obtenerPerpendiculares().subscribe(response => {
      this.perpendiculares = response;
    })
  }

  calcularDistanciaPuntos(x1: number, y1: number, x2: number, y2: number): number {

        // Fórmula de la distancia euclidiana: √((x2 - x1)² + (y2 - y1)²)
      const distanciaX = x2 - x1;
      const distanciaY = y2 - y1;
      const distanciaCuadrada = distanciaX * distanciaX + distanciaY * distanciaY;
      const distancia = Math.sqrt(distanciaCuadrada);
  
      return distancia;


  }

   calcularPendiente(x1: number, y1: number, x2: number, y2: number): number {
    // Fórmula de la pendiente: (y2 - y1) / (x2 - x1)
    if (x2 === x1) {
        // Si los puntos tienen la misma coordenada x, la pendiente no está definida
        throw new Error("La pendiente no está definida para puntos con la misma coordenada x");
    }

    const pendiente = (y2 - y1) / (x2 - x1);
    return pendiente;
}


cargarCircunferencias() {
    this.geometry.obtenerCircunferencias().subscribe(response => {
      this.circunferencias = response;
    })
  }

  gradosARadianes(grados: number): number {
    return grados * Math.PI / 180;
}

 radianesAGrados(radianes: number): number {
  return radianes * 180 / Math.PI;
}

  anguloAlfa(): number { 

    let diferencia = this.distanciaBC()/this.distanciaAC()
    let angulo = Math.asin(diferencia)

    return  this.radianesAGrados(angulo)
  }

  anguloBeta(): number { 
    return this.radianesAGrados(( Math.acos(this.distanciaBC() / this.distanciaAC() ) ))
  }


  sumaCatetos(): number { 
    return this.distancia(this.puntoA, this.puntoB) ** 2 + this.distancia(this.puntoB, this.puntoC) ** 2;
  }

  cuadradoHipotenusa(): number { 
    return this.distancia(this.puntoA, this.puntoC) ** 2
  }

  funcion(): (x: number) => number {
    return (x: number) => Math.log(x);
  }


  logaritmoEnBase(x: number, base: number): (x: number) => number {
    return (x: number) => Math.log(x) / Math.log(base);
  }


  // puntos(): {x: number, y: number}[] {
  //   return [
  //     this.puntoA,
  //     this.puntoB,
  //     this.puntoC
  //   ]
  // }

  distancia(p1: {x: number, y: number}, p2: {x: number, y: number}): number {
    let point1 = new ConcretePoint(p1.x, p1.y);
    let point2 = new ConcretePoint(p2.x, p2.y);

    let line = new ConcreteLine(point1, point2);
    return line.calcularDistancia();
  }


  distanciaAB() : number {
    return this.distancia(this.puntoA, this.puntoB);
  }

   distanciaBC() : number {
    return this.distancia(this.puntoB, this.puntoC);


  }

   distanciaAC() : number {
    return this.distancia(this.puntoA, this.puntoC);
  }


  hipotenusa(): number {
    return this.distancia(this.puntoC, this.puntoA) 
  }

  // retorna la longitud del cateto 1 
  cateto1() : number {
    return this.distancia(this.puntoA, this.puntoB) 
  }

  cateto2() : number {
    return this.distancia(this.puntoB, this.puntoC)
  }


  curvas2(): {color: string, f: (x: number) => number }[] {
    return [];
    // return [
    //   { f: (x: number) => Math.log(x + 3) + 1, color: 'red', },
    //   { f: (x: number) => Math.cos(x ) , color: 'green', },
    //   // { f: (x: number) => Math.sin(x ) , color: 'red', },
    //   // { f: (x: number) => - Math.pow(x , 2 ) + 3 , color: 'blue', },
    //   { f: (x: number) => Math.pow(Math.E, x) , color: 'blue', },
    //   //  { f: (x: number) => Math.log2(x), color: 'green', },
    //   //  { f: (x: number) => Math.log10(x), color: 'blue', },
    //   //  { f: (x: number) => Math.pow(x, 2) - 2, color: 'brown' },
    //   //  { f: (x: number) => Math.pow(x, 2) - 9*x +14, color: 'brown', },
    //   //  { f: (x: number) => Math.cos(x) , color: 'brown', },

      // ]
  }
}
