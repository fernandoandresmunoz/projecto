import { Line } from "line";
import { Drawable, Nameable, Scalable } from "src/modelo";

export interface Point extends Drawable, Nameable, Scalable {
  x: number;
  y: number;
  id: number;
  etiqueta: string;
  lienzo: number;
  getX(): number;
  getScaledX(): number;

  getY(): number;
  getScaledY(): number;

  setY(y: number): void;
  setX(x: number): void;

  aumentarX(): void;
  disminuirX(): void;
  aumentarY(): void;
  disminuirY(): void;
  draw(): void;

  //calcular donde la proyeccion del punto interesecta perpendicularmente a una recta dada.
  calularInterseccionPerpendicular(line: Line): Point;

  // ecuacion dada proyeccion perpendicular del punto a una recta dada.
  ecuacionRectaPerpendicular(line: Line): string;
  rectaPerpendicular(): Line;
  // proyeccion punto perpendicular
  puntoPerpendicular(line: Line): Point;
  getLine(pointB: Point): Line;


}