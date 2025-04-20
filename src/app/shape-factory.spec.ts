import { TestBed } from '@angular/core/testing';
import { ConcreteShapeFactory } from '../../concreteShapeFactory';
import { Point } from '../../point';
import { Line } from '../../line';
import { Bloque } from '../../bloque';
import { Automata } from '../../cube';
import { Rule } from '../../rule';
import { Element } from '../../rules/element';

describe('ConcreteShapeFactory', () => {
  let factory: ConcreteShapeFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcreteShapeFactory]
    });
    factory = new ConcreteShapeFactory();
  });

  describe('Point Creation', () => {
    it('should create a point with correct coordinates', () => {
      const point = factory.createPoint(10, 20);
      expect(point.getX()).toBe(10);
      expect(point.getY()).toBe(20);
    });
  });

  describe('Line Creation', () => {
    it('should create a line between two points', () => {
      const pointA = factory.createPoint(0, 0);
      const pointB = factory.createPoint(10, 10);
      const line = factory.createLine(pointA, pointB);
      
      expect(line.getPointA()).toEqual(pointA);
      expect(line.getPointB()).toEqual(pointB);
    });
  });

  describe('Rule Creation', () => {
    it('should create Life Rule', () => {
      const rule = factory.createLifeRule();
      expect(rule).toBeTruthy();
      expect(typeof rule).toBe('object');
    });

    it('should create Diamoeba Rule', () => {
      const rule = factory.createDiamoebaRule();
      expect(rule).toBeTruthy();
      expect(typeof rule).toBe('object');
    });

    it('should create HighLife Rule', () => {
      const rule = factory.createHighLifeRule();
      expect(rule).toBeTruthy();
      expect(typeof rule).toBe('object');
    });
  });

  describe('Automata Creation', () => {
    it('should create a basic cube', () => {
      const pointA = factory.createPoint(0, 0);
      const pointB = factory.createPoint(10, 0);
      const pointC = factory.createPoint(10, 10);
      const pointD = factory.createPoint(0, 10);
      
      const cube = factory.createCube(pointA, pointB, pointC, pointD, 5, 5);
      expect(cube).toBeTruthy();
      expect(typeof cube).toBe('object');
    });

    it('should create a military cube', () => {
      const cube = factory.createMilitaryCube(5, 5);
      expect(cube).toBeTruthy();
      expect(typeof cube).toBe('object');
    });
  });

  describe('Element Creation', () => {
    it('should create tierra element', () => {
      const element = factory.crearTierra();
      expect(element).toBeTruthy();
      expect(typeof element).toBe('object');
    });

    it('should create mar element', () => {
      const element = factory.crearMar();
      expect(element).toBeTruthy();
      expect(typeof element).toBe('object');
    });
  });
}); 