import { TestBed } from '@angular/core/testing';
import ConcreteAutomata from '../../concreteAutomata';
import { ConcreteShapeFactory } from '../../concreteShapeFactory';
import { Point } from '../../point';
import { Rule } from '../../rule';
import { Element } from '../../rules/element';

describe('ConcreteAutomata', () => {
  let automata: ConcreteAutomata;
  let factory: ConcreteShapeFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcreteShapeFactory]
    });
    factory = new ConcreteShapeFactory();
    
    // Create points for the automata
    const pointA = factory.createPoint(0, 0);
    const pointB = factory.createPoint(10, 0);
    const pointC = factory.createPoint(10, 10);
    const pointD = factory.createPoint(0, 10);
    
    automata = new ConcreteAutomata(pointA, pointB, pointC, pointD);
    
    // Set dimensions after creation
    automata.setFilas(5);
    automata.setColumnas(5);
  });

  describe('Initialization', () => {
    it('should initialize with correct dimensions', () => {
      expect(automata.getFilas()).toBe(5);
      expect(automata.getColumnas()).toBe(5);
    });

    it('should initialize with empty elements', () => {
      expect(automata.getElements().length).toBe(0);
    });
  });

  describe('Matrix Operations', () => {
    it('should create a random matrix', () => {
      const matrix = automata.createRandomMatriz();
      expect(matrix.length).toBe(5);
      expect(matrix[0].length).toBe(5);
    });

    it('should calculate alive neighbors correctly', () => {
      const matrix = [
        [{state: 1, color: 'red'}, {state: 0, color: 'white'}, {state: 1, color: 'red'}],
        [{state: 0, color: 'white'}, {state: 1, color: 'red'}, {state: 0, color: 'white'}],
        [{state: 1, color: 'red'}, {state: 0, color: 'white'}, {state: 1, color: 'red'}]
      ];
      
      const neighbors = automata.calculateAliveNeighbors(matrix, 1, 1);
      expect(neighbors.length).toBe(4); // Should have 4 alive neighbors
    });
  });

  describe('Rule Management', () => {
    it('should set and get active rule', () => {
      const rule = factory.createLifeRule();
      automata.setActiveRule(rule);
      expect(automata.getActiveRule()).toBeTruthy();
    });

    it('should set and get color rules', () => {
      const rule = factory.createLifeRule();
      automata.setRedRule(rule);
      automata.setBlueRule(rule);
      automata.setGreenRule(rule);
      automata.setBrownRule(rule);
      automata.setGrayRule(rule);

      expect(automata.getRedRule()).toBeTruthy();
      expect(automata.getBlueRule()).toBeTruthy();
      expect(automata.getGreenRule()).toBeTruthy();
      expect(automata.getBrownRule()).toBeTruthy();
      expect(automata.getGrayRule()).toBeTruthy();
    });
  });

  describe('Element Management', () => {
    it('should add and get elements', () => {
      const element = factory.crearTierra();
      automata.addElement(element);
      expect(automata.getElements().length).toBe(1);
    });

    it('should calculate element totals', () => {
      const element = factory.crearTierra();
      automata.addElement(element);
      
      expect(automata.totalAzules()).toBeDefined();
      expect(automata.totalCafes()).toBeDefined();
      expect(automata.totalGrises()).toBeDefined();
      expect(automata.totalRojos()).toBeDefined();
      expect(automata.totalVerdes()).toBeDefined();
    });
  });

  describe('Movement Operations', () => {
    it('should move automata in all directions', () => {
      const initialPoint = automata.getPoint();
      
      automata.up();
      expect(automata.getPoint().getY()).toBeLessThan(initialPoint.getY());
      
      automata.down();
      expect(automata.getPoint().getY()).toBeGreaterThanOrEqual(initialPoint.getY());
      
      automata.left();
      expect(automata.getPoint().getX()).toBeLessThan(initialPoint.getX());
      
      automata.right();
      expect(automata.getPoint().getX()).toBeGreaterThanOrEqual(initialPoint.getX());
    });
  });
}); 