import { Component, Input, OnInit } from '@angular/core';
import { Automata, ControladorAutomata } from 'cube';

@Component({
  selector: 'app-automata-controller',
  templateUrl: './automata-controller.component.html',
  styleUrls: ['./automata-controller.component.styl']
})
export class AutomataControllerComponent implements OnInit, ControladorAutomata {

  @Input() automata: Automata;

  constructor() { }
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  anchoLienzo: number;
  altoLienzo: number;
  getBorderWidth(): number {
    throw new Error('Method not implemented.');
  }
  setBorderWidth(borderWidth: number): void {
    throw new Error('Method not implemented.');
  }
  getBorderColor(): string {
    throw new Error('Method not implemented.');
  }
  setBorderColor(borderColor: string): void {
    throw new Error('Method not implemented.');
  }
  getAutomata(): Automata {
    throw new Error('Method not implemented.');
  }
  setAutomata(automata: Automata): void {
    throw new Error('Method not implemented.');
  }
  setAnchoLienzo(anchoLienzo: number): void {
    throw new Error('Method not implemented.');
  }
  setAltoLienzo(altoLienzo: number): void {
    throw new Error('Method not implemented.');
  }
  getAnchoLienzo(): number {
    throw new Error('Method not implemented.');
  }
  getAltoLienzo(): number {
    throw new Error('Method not implemented.');
  }
  avanzarUnaGeneracion(): void {
    throw new Error('Method not implemented.');
  }
  subir(): void {
    throw new Error('Method not implemented.');
  }
  bajar(): void {
    throw new Error('Method not implemented.');
  }
  moverALaIzquierda(): void {
    throw new Error('Method not implemented.');
  }
  moverALaDerecha(): void {
    throw new Error('Method not implemented.');
  }
  getRules(): void {
    throw new Error('Method not implemented.');
  }
  guardar(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
