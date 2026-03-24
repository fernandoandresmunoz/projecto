import { ConcreteNextMatrixStrategy } from './ConcreteNextMatrixStrategy';
import { Automata } from 'cube';
import { Rule } from 'rule';

describe('ConcreteNextMatrixStrategy', () => {
  let strategy: ConcreteNextMatrixStrategy;
  let mockAutomata: jasmine.SpyObj<Automata>;
  let mockRule: jasmine.SpyObj<Rule>;

  beforeEach(() => {
    mockRule = jasmine.createSpyObj('Rule', ['surviveCondition', 'liveCondition']);
    mockAutomata = jasmine.createSpyObj('Automata', [
      'calculateAliveNeighbors',
      'getRedRule',
      'getGreenRule',
      'getBlueRule',
      'getBrownRule',
      'getGrayRule'
    ]);

    // Default mock behavior
    mockAutomata.getRedRule.and.returnValue(mockRule);
    mockAutomata.getGreenRule.and.returnValue(mockRule);
    mockAutomata.getBlueRule.and.returnValue(mockRule);
    mockAutomata.getBrownRule.and.returnValue(mockRule);
    mockAutomata.getGrayRule.and.returnValue(mockRule);

    strategy = new ConcreteNextMatrixStrategy(mockAutomata);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  it('should update matrix based on neighbors', () => {
    const matrix = [
      [{ state: 0, color: 'Red' }, { state: 0, color: 'Red' }, { state: 0, color: 'Red' }],
      [{ state: 0, color: 'Red' }, { state: 1, color: 'Green' }, { state: 0, color: 'Red' }],
      [{ state: 0, color: 'Red' }, { state: 0, color: 'Red' }, { state: 0, color: 'Red' }]
    ];

    // Mock 3 Red neighbors for the center cell (1,1)
    mockAutomata.calculateAliveNeighbors.and.callFake((m, f, c) => {
      if (f === 1 && c === 1) {
        return [
          { state: 1, color: 'Red' },
          { state: 1, color: 'Red' },
          { state: 1, color: 'Red' }
        ];
      }
      return [];
    });

    mockRule.surviveCondition.and.returnValue(true);

    const result = strategy.nextMatrix(matrix);

    expect(result[1][1].state).toBe(1);
    expect(mockAutomata.calculateAliveNeighbors).toHaveBeenCalled();
  });

  it('should handle birth (state 0 to 1)', () => {
    const matrix = [
      [{ state: 0, color: 'Red' }, { state: 0, color: 'Red' }, { state: 0, color: 'Red' }],
      [{ state: 0, color: 'Red' }, { state: 0, color: 'Green' }, { state: 0, color: 'Red' }],
      [{ state: 0, color: 'Red' }, { state: 0, color: 'Red' }, { state: 0, color: 'Red' }]
    ];

    // Mock 3 Red neighbors for the center cell (1,1)
    mockAutomata.calculateAliveNeighbors.and.callFake((m, f, c) => {
      if (f === 1 && c === 1) {
        return [
          { state: 1, color: 'Red' },
          { state: 1, color: 'Red' },
          { state: 1, color: 'Red' }
        ];
      }
      return [];
    });

    mockRule.liveCondition.and.returnValue(true);

    const result = strategy.nextMatrix(matrix);

    expect(result[1][1].state).toBe(1);
    expect(result[1][1].color).toBe('Red');
  });

  it('should handle different dominant neighbors (Brown)', () => {
    const matrix = [[{ state: 0, color: 'White' }]];
    mockAutomata.calculateAliveNeighbors.and.returnValue([
      { state: 1, color: 'Brown' },
      { state: 1, color: 'Brown' },
      { state: 1, color: 'Red' }
    ]);
    mockRule.liveCondition.and.returnValue(true);

    const result = strategy.nextMatrix(matrix);
    expect(result[0][0].state).toBe(1);
    expect(result[0][0].color).toBe('Brown');
  });

  it('should handle different dominant neighbors (Blue)', () => {
    const matrix = [[{ state: 0, color: 'White' }]];
    mockAutomata.calculateAliveNeighbors.and.returnValue([
      { state: 1, color: 'Blue' },
      { state: 1, color: 'Blue' },
      { state: 1, color: 'Gray' }
    ]);
    mockRule.liveCondition.and.returnValue(true);

    const result = strategy.nextMatrix(matrix);
    expect(result[0][0].state).toBe(1);
    expect(result[0][0].color).toBe('Blue');
  });

  it('should handle different dominant neighbors (Gray)', () => {
    const matrix = [[{ state: 0, color: 'White' }]];
    mockAutomata.calculateAliveNeighbors.and.returnValue([
      { state: 1, color: 'Gray' },
      { state: 1, color: 'Gray' },
      { state: 1, color: 'Green' }
    ]);
    mockRule.liveCondition.and.returnValue(true);

    const result = strategy.nextMatrix(matrix);
    expect(result[0][0].state).toBe(1);
    expect(result[0][0].color).toBe('Gray');
  });
});
