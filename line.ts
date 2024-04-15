import { Point } from "point";
import { Drawable } from "src/modelo";

export interface Line extends Drawable {
  setPointA(point: Point): void;
  setPointB(point: Point): void;
  getPointA(): Point;
  getPointB(): Point;

  calcularDistancia(): number;
  calcularPendiente(): number;

  getValueY(): number;
  getValueX(): number;

  aumentarX(): void;
  disminuirX(): void;

  // calcular Intereseccion con otra recta.
  calcularInterseccionRecta(line: Line): Point;
  // calcular la intereseccion en el eje y, o sea cuando x = 0;
  intereseccionEnEjeY(): Point;
  // representacion string de la funcion de la recta.
  ecuacionRecta(): string;

  getPoints(min: number, max: number, step: number): Point[];
  getScale(): number;
  setScale(scale: number): void;
  getSplitPoints(quantity: number): Point[];

  puntoPerpendicular(point: Point): Point;
  funcion(x: number): number;
}