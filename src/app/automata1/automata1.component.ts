import { Component, OnInit } from '@angular/core';
import { ConcreteShapeFactory } from "ConcreteShapeFactory.1";
import { Automata } from 'cube';
import { ControladorColores } from '../controlador-colores';
import { Rule } from 'rule';
import { AutomataStateService } from '../services/automata-state.service';

interface Cell {
  state: number;
  color: string;
}

interface SavedMatrix {
  matrix: Cell[][];
  generation: number;
  timestamp: string;
  rules: {
    green: string;
    brown: string;
    blue: string;
    red: string;
    gray: string;
  };
  isStabilized: boolean;  // Añadir flag para saber si ya se estabilizó
}

@Component({
  selector: 'app-automata1',
  template: `
    <div class="automata-view">
      <app-automata [automata]="automata1"></app-automata>
      <a routerLink="/vista-cubos-3d" class="view-3d-link">Ver en 3D</a>
    </div>
  `,
  styles: [`
    .automata-view {
      padding: 20px;
      height: 100vh;
    }
    .view-3d-link {
      display: block;
      margin-top: 20px;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      text-align: center;
      width: 200px;
    }
    .view-3d-link:hover {
      background-color: #45a049;
    }
  `]
})
export class Automata1Component implements OnInit, ControladorColores {
  factory2 = new ConcreteShapeFactory()
  automata1: Automata;
  matrixData: Cell[][] = [];
  matrixRows: number = 0;
  matrixCols: number = 0;
  updateInterval: number = 1000;

  coloresRegla1: string[] = [ "#1B4B1B", "#2D5A27", "#1E3C1E" ] // Bosque - verdes naturales
  coloresRegla2: string[] = [ "#8B6B4F", "#7D5B42", "#6B4423" ] // Tierra - marrones naturales
  coloresRegla3: string[] = [ "#0F4C81", "#1B6CA8", "#064273" ] // Mar - azules profundos
  coloresRegla4: string[] = [ "#6B6B6B", "#4F4F4F", "#595959" ] // Montañas - grises rocosos
  coloresRegla5: string[] = [ "#DEB887", "#D2B48C", "#BC8F8F" ] // Café claro - arena/tierra clara
  coloresRegla6: string[] = [ "#4F7942", "#3B5E30", "#2F4F2F" ] // Vegetación - verdes forestales
  coloresRegla7: string[] = [ "#D2B48C", "#C19A6B", "#B8860B" ] // Desierto - tonos arena

  private lastMatrixState: string = '';
  private stableGenerations: number = 0;
  private readonly STABLE_THRESHOLD = 5; // Número de generaciones sin cambios para considerar estable

  constructor(private automataStateService: AutomataStateService) {
    this.factory2 = new ConcreteShapeFactory();
    this.automata1 = this.factory2.createMilitaryCube(500, 500);
    
    // Configuración inicial de reglas
    this.automata1.setGreenRule(this.factory2.createLifeRule());
    this.automata1.setBrownRule(this.factory2.createCoralRule());
    this.automata1.setBlueRule(this.factory2.createDiamoebaRule());
    this.automata1.setRedRule(this.factory2.createMazeRule());
    this.automata1.setGrayRule(this.factory2.createSeedsRule());

    // Configurar dimensiones más pequeñas y juntas
    this.automata1.setAnchoCelula(0.5);  // Reducido de 1 a 0.5
    this.automata1.setLargoCelula(0.5);  // Reducido de 1 a 0.5
    this.automata1.setAvance(0.5);       // Reducido de 1 a 0.5 para juntar los cubos

    // Configurar alturas según el tipo de terreno
    this.configurarAlturas();

    // Crear matriz inicial con todas las reglas
    this.automata1.crearTableroAleatorio();
  }

  ngOnInit(): void {
    this.loadMatrixFromLocalStorage();
    this.loadColorRulesFromLocalStorage();
    this.updateMatrix();
    
    // Cargar reglas de color guardadas
    this.loadColorRulesFromLocalStorage();
    
    // Configurar comportamiento evolutivo
    let generationCount = 0;
    
    setInterval(() => {
        this.automata1.avanzarUnaGeneracion();
        this.updateMatrix();
        generationCount++;
        
        // Ya no cambiamos las reglas cada cierto número de generaciones
        // para mantener el comportamiento consistente
        
        // Guardar estado cada 10 generaciones
        if (generationCount % 10 === 0) {
            this.saveMatrixToLocalStorage();
            this.saveColorRulesToLocalStorage();
        }
    }, 100);
  }

  loadMatrixFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('automata_matrix');
      if (savedData) {
        console.log('Found saved data in localStorage');
        const parsedData: SavedMatrix = JSON.parse(savedData);
        
        // Restaurar las reglas antes de establecer la matriz
        if (parsedData.rules) {
          // Si ya estaba estabilizado, asegurarnos de usar maze rule para gray
          if (parsedData.isStabilized) {
            this.automata1.setGrayRule(this.factory2.createMazeRule());
            this.stableGenerations = this.STABLE_THRESHOLD;
          } else {
            this.automata1.setGrayRule(this.getRuleByName(parsedData.rules.gray));
            this.stableGenerations = 0;
          }
          
          // Restaurar el resto de las reglas
          this.automata1.setGreenRule(this.getRuleByName(parsedData.rules.green));
          this.automata1.setBrownRule(this.getRuleByName(parsedData.rules.brown));
          this.automata1.setBlueRule(this.getRuleByName(parsedData.rules.blue));
          this.automata1.setRedRule(this.getRuleByName(parsedData.rules.red));
        }

        this.matrixData = parsedData.matrix;
        this.matrixRows = parsedData.matrix.length;
        this.matrixCols = parsedData.matrix[0].length;
        
        this.automata1.setMatrizActiva(parsedData.matrix);
        this.automata1.setGeneration(parsedData.generation);
        
        // Guardar el estado actual de la matriz para la detección de estabilidad
        this.lastMatrixState = JSON.stringify(parsedData.matrix);
        
        console.log(`Loaded matrix from generation ${parsedData.generation}`);
      } else {
        console.log('No saved data found in localStorage');
      }
    } catch (error) {
      console.error('Error loading matrix:', error);
    }
  }

  updateMatrix() {
    try {
      const matrix = this.automata1.getMatrizActiva();
      if (matrix && matrix.length > 0) {
        // Convertir la matriz del autómata al formato Cell[][]
        this.matrixData = matrix.map(row => 
          row.map(cell => ({
            state: cell.state,
            color: cell.color
          }))
        );
        
        // Actualizar el servicio con la nueva matriz y reglas de color
        this.automataStateService.updateMatrix(this.matrixData);
        this.automataStateService.updateColorRules({
          regla1: this.coloresRegla1,
          regla2: this.coloresRegla2,
          regla3: this.coloresRegla3,
          regla4: this.coloresRegla4,
          regla5: this.coloresRegla5
        });
        
        this.matrixRows = matrix.length;
        this.matrixCols = matrix[0].length;
        
        // Verificar estabilización
        const currentState = JSON.stringify(matrix);
        if (currentState === this.lastMatrixState) {
          this.stableGenerations++;
          if (this.stableGenerations >= this.STABLE_THRESHOLD) {
            this.automata1.setGrayRule(this.factory2.createMazeRule());
            console.log('Matriz estabilizada, cambiando a maze rule');
          }
        } else {
          this.stableGenerations = 0;
          this.lastMatrixState = currentState;
        }
        
        // Actualizar alturas
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
            if (this.coloresRegla2.includes(matrix[i][j].color)) {
              const nuevaAltura = this.calcularAlturaCafe(i, j);
              this.automata1.setAltoCelula(nuevaAltura);
            }
          }
        }
        
        this.automata1.dibujarMatriz(matrix);
      }
    } catch (error) {
      console.error('Error updating matrix:', error);
    }
  }

  saveMatrixToLocalStorage() {
    try {
      const currentGen = this.automata1.getGeneration();
      console.log('Saving matrix for generation:', currentGen);
      
      // Obtener los nombres de las reglas actuales
      const rules = this.automata1.getRules();
      const currentRules = {
        green: this.findRuleName(this.automata1.getGreenRule(), rules),
        brown: this.findRuleName(this.automata1.getBrownRule(), rules),
        blue: this.findRuleName(this.automata1.getBlueRule(), rules),
        red: this.findRuleName(this.automata1.getRedRule(), rules),
        gray: this.findRuleName(this.automata1.getGrayRule(), rules)
      };
      
      const matrixData = {
        matrix: this.matrixData,
        generation: currentGen,
        timestamp: new Date().toISOString(),
        rules: currentRules,
        isStabilized: this.stableGenerations >= this.STABLE_THRESHOLD
      };

      localStorage.setItem('automata_matrix', JSON.stringify(matrixData));
      console.log('Successfully saved matrix and rules');
      
    } catch (error) {
      console.error('Error saving matrix:', error);
    }
  }

  // Método auxiliar para encontrar el nombre de una regla
  findRuleName(rule: Rule, rules: {name: string, rule: Rule, notation: string}[]): string {
    const foundRule = rules.find(r => {
        return r.rule.surviveCondition(3) === rule.surviveCondition(3) && 
               r.rule.liveCondition(3) === rule.liveCondition(3);
    });
    return foundRule?.name || 'life';
  }

  // Método auxiliar para obtener una regla por su nombre
  getRuleByName(ruleName: string): Rule {
    const rules = this.automata1.getRules();
    const foundRule = rules.find(r => r.name.toLowerCase() === ruleName.toLowerCase());
    return foundRule?.rule || this.factory2.createLifeRule();
  }

  getCellState(cell: Cell): number {
    return cell.state;
  }

  getCellColor(cell: Cell): string {
    return cell.color;
  }

  saveColorRulesToLocalStorage() {
    try {
      const colorRules = {
        regla1: this.coloresRegla1,
        regla2: this.coloresRegla2,
        regla3: this.coloresRegla3,
        regla4: this.coloresRegla4,
        regla5: this.coloresRegla5,
        regla6: this.coloresRegla6,
        regla7: this.coloresRegla7
      };
      localStorage.setItem('automata_color_rules', JSON.stringify(colorRules));
      console.log('Color rules saved to localStorage');
    } catch (error) {
      console.error('Error saving color rules:', error);
    }
  }

  loadColorRulesFromLocalStorage() {
    try {
      const savedRules = localStorage.getItem('automata_color_rules');
      if (savedRules) {
        const colorRules = JSON.parse(savedRules);
        this.coloresRegla1 = colorRules.regla1 || this.coloresRegla1;
        this.coloresRegla2 = colorRules.regla2 || this.coloresRegla2;
        this.coloresRegla3 = colorRules.regla3 || this.coloresRegla3;
        this.coloresRegla4 = colorRules.regla4 || this.coloresRegla4;
        this.coloresRegla5 = colorRules.regla5 || this.coloresRegla5;
        this.coloresRegla6 = colorRules.regla6 || this.coloresRegla6;
        this.coloresRegla7 = colorRules.regla7 || this.coloresRegla7;
        console.log('Color rules loaded from localStorage');
      }
    } catch (error) {
      console.error('Error loading color rules:', error);
    }
  }

  // Implementación de los métodos de la interfaz ControladorColores
  cambiarColoresRegla1(color1: string, color2: string, color3: string): void {
    this.coloresRegla1 = [color1, color2, color3];
  }

  cambiarColoresRegla2(color1: string, color2: string, color3: string): void {
    this.coloresRegla2 = [color1, color2, color3];
  }

  cambiarColoresRegla3(color1: string, color2: string, color3: string): void {
    this.coloresRegla3 = [color1, color2, color3];
  }

  cambiarColoresRegla4(color1: string, color2: string, color3: string): void {
    this.coloresRegla4 = [color1, color2, color3];
  }

  cambiarColoresRegla5(color1: string, color2: string, color3: string): void {
    this.coloresRegla5 = [color1, color2, color3];
  }

  cambiarColoresRegla6(color1: string, color2: string, color3: string): void {
    this.coloresRegla6 = [color1, color2, color3];
  }

  cambiarColoresRegla7(color1: string, color2: string, color3: string): void {
    this.coloresRegla7 = [color1, color2, color3];
  }

  getReglas(): Rule[] {
    return []; // Implementar según sea necesario
  }

  cambiarColorRegla(rule: Rule, color1: string, color2: string, color3: string): void {
    // Implementar según sea necesario
  }

  resetAutomata() {
    // Reiniciar generación
    this.automata1.setGeneration(0);
    
    // Crear nueva matriz aleatoria con todas las reglas
    this.automata1.crearTableroAleatorio();
    
    // Actualizar la matriz en la vista
    this.updateMatrix();
    
    // Guardar el nuevo estado
    this.saveMatrixToLocalStorage();
    this.saveColorRulesToLocalStorage();
  }

  configurarAlturas() {
    // Configurar alturas diferentes para cada tipo de terreno
    const alturas = {
        verde: 0.8,    // Bosques - altura media-alta
        marron: 0.3,   // Tierra - altura baja
        azul: 0.2,     // Agua - altura muy baja
        rojo: 0.5,     // Montañas bajas - altura media
        gris: 1.0      // Montañas altas - altura máxima
    };
    
    // Aplicar la altura base
    this.automata1.setAltoCelula(alturas.verde);
  }

  // Añadir método para calcular altura basada en vecinos
  calcularAlturaCafe(x: number, y: number): number {
    const matrix = this.automata1.getMatrizActiva();
    let vecinosCafe = 0;
    const alturaBase = 0.3;
    const incrementoPorVecino = 0.1;
    
    // Verificar las 8 celdas vecinas
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Saltar la celda actual
        
        const newX = x + i;
        const newY = y + j;
        
        // Verificar que estamos dentro de los límites
        if (newX >= 0 && newX < matrix.length && 
            newY >= 0 && newY < matrix[0].length) {
          // Verificar si el vecino es café (comparando con los colores de la regla 2)
          const colorVecino = matrix[newX][newY].color;
          if (this.coloresRegla2.includes(colorVecino)) {
            vecinosCafe++;
          }
        }
      }
    }
    
    // Calcular altura final basada en cantidad de vecinos
    // Más vecinos = más altura
    return alturaBase + (vecinosCafe * incrementoPorVecino);
  }
}
