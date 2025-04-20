import { LifeNextMatrixStrategy } from './life-next-matrix-strategy.ts';
import { Automata } from '../../cube';
import { ConcreteShapeFactory } from '../../concreteShapeFactory';
import { Point } from '../../point';

describe('LifeNextMatrixStrategy', () => {
  let strategy: LifeNextMatrixStrategy;
  let automata: Automata;
  let factory: ConcreteShapeFactory;

  beforeEach(() => {
    factory = new ConcreteShapeFactory();
    const pointA = factory.createPoint(0, 0);
    const pointB = factory.createPoint(10, 0);
    const pointC = factory.createPoint(10, 10);
    const pointD = factory.createPoint(0, 10);
    automata = factory.createCube(pointA, pointB, pointC, pointD, 5, 5);
    strategy = new LifeNextMatrixStrategy(automata);
  });

  it('should create an instance', () => {
    expect(strategy).toBeTruthy();
  });

  it('should calculate next matrix state', () => {
    const matrix = [
      [{state: 1, color: 'red'}, {state: 0, color: 'white'}, {state: 1, color: 'red'}],
      [{state: 0, color: 'white'}, {state: 1, color: 'red'}, {state: 0, color: 'white'}],
      [{state: 1, color: 'red'}, {state: 0, color: 'white'}, {state: 1, color: 'red'}]
    ];
    
    const nextMatrix = strategy.nextMatrix(matrix);
    expect(nextMatrix).toBeDefined();
    expect(nextMatrix.length).toBe(3);
    expect(nextMatrix[0].length).toBe(3);
  });
});
