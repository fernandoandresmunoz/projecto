import { TestBed } from '@angular/core/testing';
import { ConcreteShapeFactory } from '../../concreteShapeFactory';
import { Point } from '../../point';
import { Line } from '../../line';

describe('Point', () => {
  let factory: ConcreteShapeFactory;
  let point: Point;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcreteShapeFactory]
    });
    factory = new ConcreteShapeFactory();
    point = factory.createPoint(10, 20);
  });

  describe('Basic Properties', () => {
    it('should have correct initial coordinates', () => {
      expect(point.getX()).toBe(10);
      expect(point.getY()).toBe(20);
    });

    it('should update coordinates correctly', () => {
      point.setX(30);
      point.setY(40);
      expect(point.getX()).toBe(30);
      expect(point.getY()).toBe(40);
    });
  });

  describe('Movement Operations', () => {
    it('should increase X coordinate', () => {
      point.aumentarX();
      expect(point.getX()).toBeGreaterThan(10);
    });

    it('should decrease X coordinate', () => {
      point.disminuirX();
      expect(point.getX()).toBeLessThan(10);
    });

    it('should increase Y coordinate', () => {
      point.aumentarY();
      expect(point.getY()).toBeGreaterThan(20);
    });

    it('should decrease Y coordinate', () => {
      point.disminuirY();
      expect(point.getY()).toBeLessThan(20);
    });
  });

  describe('Line Operations', () => {
    it('should create a line to another point', () => {
      const otherPoint = factory.createPoint(30, 40);
      const line = point.getLine(otherPoint);
      expect(line).toBeTruthy();
      expect(typeof line).toBe('object');
    });

    it('should calculate perpendicular intersection with a line', () => {
      const pointA = factory.createPoint(0, 0);
      const pointB = factory.createPoint(10, 10);
      const line = factory.createLine(pointA, pointB);
      
      const intersection = point.calularInterseccionPerpendicular(line);
      expect(intersection).toBeTruthy();
      expect(typeof intersection).toBe('object');
    });
  });

  describe('Scaling Operations', () => {
    it('should return scaled coordinates', () => {
      const scaledX = point.getScaledX();
      const scaledY = point.getScaledY();
      expect(scaledX).toBeDefined();
      expect(scaledY).toBeDefined();
    });
  });
}); 