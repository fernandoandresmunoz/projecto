import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from 'cube';
import { FabricaDeAutomatas } from '../fabrica-de-automatas';
import { FabricaDeAutomatasConcreta } from '../FabricaDeAutomatasConcreta';
import { ControladorColores } from '../controlador-colores';
import { Rule } from 'rule';

@Component({
  selector: 'app-automata1',
  templateUrl: './automata1.component.html',
  styleUrls: ['./automata1.component.styl']
})
export class Automata1Component implements OnInit, ControladorColores {

  factory2 = new ConcreteShapeFactory()
  // fabricaDeAutomatas: FabricaDeAutomatas = new FabricaDeAutomatasConcreta();
  // automata1: Automata = this.factory2.createGliderStrategy(256, 64)
  automata1: Automata = this.factory2.createMilitaryCube(128, 128);


  coloresRegla1: string[] = [ "#0b4b0b", "#2ab22a", "#0c500c", ]
  coloresRegla2: string[] = [ "#453b07", "#d2a65b", "#453b07" ]
  coloresRegla3: string[] = [ "#04099a", "#5266ff", "#082fa6" ]
  coloresRegla4: string[] = [ "#453b07", "#a47e3d", "#453b07" ]
  coloresRegla5 : string[] = ["#DC143C", "#FF7F50", "f08080" ];
  coloresRegla6 : string[] = ["#DC143C", "#FF7F50", "f08080" ];
  coloresRegla7 : string[] = ["#DC143C", "#FF7F50", "f08080" ];

  constructor() {  }

  cambiarRegla1(cara: number, color: string) {
    this.coloresRegla1[cara] = color;
  }
  cambiarRegla2(cara: number, color: string) {
    this.coloresRegla2[cara] = color;
  }

  cambiarRegla3(cara: number, color: string) {
    this.coloresRegla3[cara] = color;
  }

  cambiarRegla4(cara: number, color: string) {
    this.coloresRegla4[cara] = color;
  }

  cambiarRegla5(cara: number, color: string) {
    this.coloresRegla5[cara] = color;
  }

  cambiarRegla6(cara: number, color: string) {
    this.coloresRegla6[cara] = color;
  }

  cambiarRegla7(cara: number, color: string) {
    this.coloresRegla7[cara] = color;
  }





  cambiarColoresRegla1(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla2(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla3(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla4(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla5(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla6(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  cambiarColoresRegla7(color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }
  getReglas(): Rule[] {
    throw new Error('Method not implemented.');
  }
  cambiarColorRegla(rule: Rule, color1: string, color2: string, color3: string): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }
 
}
