import { Injectable } from '@angular/core';
import { Automata } from 'cube';

@Injectable({
  providedIn: 'root'
})
export class AutomataPersistenceService {
  private readonly STORAGE_KEY = 'automata_states';
  private readonly MAX_STATES = 10; // Maximum number of saved states

  constructor() { }

  /**
   * Save the current automata state
   * @param name Name to identify the saved state
   * @param automata The automata instance to save
   */
  saveState(name: string, automata: Automata): void {
    const states = this.getAllStates();
    
    // Create state object
    const state = {
      name,
      timestamp: new Date().toISOString(),
      data: {
        matrix: automata.getMatrizActiva(),
        generation: automata.getGeneration(),
        rules: {
          active: automata.getActiveRule(),
          red: automata.getRedRule(),
          blue: automata.getBlueRule(),
          green: automata.getGreenRule(),
          brown: automata.getBrownRule(),
          gray: automata.getGrayRule()
        },
        elements: automata.getElements(),
        dimensions: {
          rows: automata.getFilas(),
          columns: automata.getColumnas()
        }
      }
    };

    // Add or update state
    const existingIndex = states.findIndex(s => s.name === name);
    if (existingIndex >= 0) {
      states[existingIndex] = state;
    } else {
      states.push(state);
      // Keep only the last MAX_STATES states
      if (states.length > this.MAX_STATES) {
        states.shift();
      }
    }

    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(states));
  }

  /**
   * Load a saved automata state
   * @param name Name of the state to load
   * @returns The saved state data or null if not found
   */
  loadState(name: string): any {
    const states = this.getAllStates();
    const state = states.find(s => s.name === name);
    return state ? state.data : null;
  }

  /**
   * Get all saved states
   */
  getAllStates(): any[] {
    const statesJson = localStorage.getItem(this.STORAGE_KEY);
    return statesJson ? JSON.parse(statesJson) : [];
  }

  /**
   * Delete a saved state
   * @param name Name of the state to delete
   */
  deleteState(name: string): void {
    const states = this.getAllStates();
    const filteredStates = states.filter(s => s.name !== name);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredStates));
  }

  /**
   * Clear all saved states
   */
  clearAllStates(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
} 