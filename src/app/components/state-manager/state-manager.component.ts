import { Component, OnInit } from '@angular/core';
import { AutomataPersistenceService } from '../../services/automata-persistence.service';
import { ConcreteShapeFactory } from 'ConcreteShapeFactory.1';
import { JUEGO } from 'src/JUEGO';

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.component.html',
  styleUrls: ['./state-manager.component.scss']
})
export class StateManagerComponent implements OnInit {
  savedStates: any[] = [];
  newStateName: string = '';
  private automata: any;

  constructor(private persistenceService: AutomataPersistenceService) {
    // Initialize automata with default values
    const factory = new ConcreteShapeFactory();
    this.automata = factory.createMilitaryCube(JUEGO.FILAS, JUEGO.COLUMNAS);
  }

  ngOnInit(): void {
    this.loadSavedStates();
  }

  loadSavedStates(): void {
    this.savedStates = this.persistenceService.getAllStates();
  }

  saveCurrentState(): void {
    if (this.newStateName) {
      this.persistenceService.saveState(this.newStateName, this.automata);
      this.newStateName = '';
      this.loadSavedStates();
    }
  }

  loadState(name: string): void {
    const state = this.persistenceService.loadState(name);
    if (state) {
      // Restore automata state
      this.automata.setMatrizActiva(state.matrix);
      this.automata.setGeneration(state.generation);
      
      // Restore rules
      this.automata.setActiveRule(state.rules.active);
      this.automata.setRedRule(state.rules.red);
      this.automata.setBlueRule(state.rules.blue);
      this.automata.setGreenRule(state.rules.green);
      this.automata.setBrownRule(state.rules.brown);
      this.automata.setGrayRule(state.rules.gray);
      
      // Restore elements
      this.automata.setElements(state.elements);
    }
  }

  deleteState(name: string): void {
    this.persistenceService.deleteState(name);
    this.loadSavedStates();
  }
} 