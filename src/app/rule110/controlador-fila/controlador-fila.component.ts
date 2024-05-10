import { Component, OnInit } from '@angular/core';
import { ControladorFilaConcreto } from '../controlador-fila-concreto';
import { ControladorFila } from '../controlador-fila';
import { Celda } from '../celda';
import { Fila } from '../fila';

@Component({
  selector: 'app-controlador-fila',
  templateUrl: './controlador-fila.component.html',
  styleUrls: ['./controlador-fila.component.styl']
})
export class ControladorFilaComponent implements OnInit, ControladorFila {

  controlador = new ControladorFilaConcreto()

  constructor() {
    this.init();

   }
  matrixCompleta(): Fila[] {
    return this.controlador.matrixCompleta();
  }
  getEstadoByIndex(index: number): number {
    throw new Error('Method not implemented.');
  }
  getEstadoSiguienteByIndex(index: number): number {
    throw new Error('Method not implemented.');
  }
  filaSiguiente(fila: Fila): Fila {
    return this.controlador.filaSiguiente(fila );
  }
  getEstadoSiguiente(fila: Fila, index: number): string {
    return this.controlador.getEstadoSiguiente(fila, index);
  }
  getNewStateList(): string[][] {
    return this.controlador.getNewStateList();
  }
  getRuleAsList(): number[] {
    return this.controlador.getRuleAsList();
  }
  getEstadoCeldaActiva(fila: Fila, index: number): number {
    return this.controlador.getEstadoCeldaActiva(fila, index);
  }
  getEstadoCeldaAnteriorActiva(fila: Fila, index: number): number {
    return this.controlador.getEstadoCeldaAnteriorActiva(fila, index)
  }
  getEstadoCeldaSiguienteActiva(fila: Fila, index: number): number {
    return this.controlador.getEstadoCeldaSiguienteActiva(fila, index);
  }
  getCeldas(): Celda[] {
    return this.controlador.getCeldas()
  }
  getActiveIndex(): number {
    return this.controlador.getActiveIndex();
  }
  incrementIndex(): void {
    this.controlador.incrementIndex();
  }
  decrementIndex(): void {
    this.controlador.decrementIndex();
  }
  getRuleBinary(): number {
    return this.controlador.getRuleBinary();
  }
  toggleCelda(indice: number): void {
    this.controlador.toggleCelda(indice);
  }
  init(): void {
    this.controlador.init()
  }
  encenderCelda(indice: number): void {
    this.controlador.encenderCelda(indice)
  }
  apagarCelda(indice: number): void {
    this.controlador.apagarCelda(indice)
  }
  encenderTodasLasCeldas(): void {
    this.controlador.encenderTodasLasCeldas()
  }
  apagarTodasLasCeldas(): void {
    this.controlador.apagarTodasLasCeldas()
  }
  obtenerEstadoCelda(indice: number): number {
    return this.controlador.obtenerEstadoCelda(indice)
  }
  setearRegla(regla: number): void {
    this.controlador.setearRegla(regla)
  }
  agregarCelda(celda: Celda): void {
    this.controlador.agregarCelda(celda)
  }
  calcularSiguienteGeneracion(): Fila {
    return this.controlador.calcularSiguienteGeneracion();
  }
  calcularSiguienteCelda(indice: number): Celda {
    return this.controlador.calcularSiguienteCelda(indice);
  }
  armarFilaSiguiente(): Fila {
    return this.controlador.armarFilaSiguiente()
  }
  calcularEstadoSiguiente(celda: Celda, fila: Fila): void;
  calcularEstadoSiguiente(indice: number): number;
  calcularEstadoSiguiente(celda: unknown, fila?: unknown): number | void {
    throw new Error('Method not implemented.');
  }
  calcularSiguienteEstadoCelda(indice: number): number {
    return this.controlador.calcularSiguienteEstadoCelda(indice);
  }
  obtenerTodasLasFilas(): Fila[] {
    return this.controlador.obtenerTodasLasFilas()
  }
  toggleCeldas(): Fila;
  toggleCeldas(): void;
  toggleCeldas(): void | import("../fila").Fila {
    this.controlador.toggleCeldas();
  }
  inicializar(longitud: number): void {
    this.controlador.inicializar(longitud);
  }
  inicializarRandom(longitud: number): void {
    throw new Error('Method not implemented.');
  }
  getModel(): Fila {
    return this.controlador.getModel()
  }
  setModel(fila: Fila): void {
    this.controlador.setModel(fila)
  }
  getRegla(): number {
    return this.controlador.getRegla()
  }

  ngOnInit(): void {
  }

}
