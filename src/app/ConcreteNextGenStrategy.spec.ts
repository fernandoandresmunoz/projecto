import { ConcreteNextGenStrategy } from './ConcreteNextGenStrategy';
import { Automata } from 'cube';
import { ShapeFactory } from 'shapeFactory';
import { Rule } from 'rule';

describe('ConcreteNextGenStrategy', () => {
  let strategy: ConcreteNextGenStrategy;
  let mockAutomata: jasmine.SpyObj<Automata>;
  let mockShapeFactory: jasmine.SpyObj<ShapeFactory>;
  let mockRule: jasmine.SpyObj<Rule>;

  beforeEach(() => {
    mockRule = jasmine.createSpyObj('Rule', ['surviveCondition', 'liveCondition']);
    mockAutomata = jasmine.createSpyObj('Automata', [
      'porcentajeVerdes',
      'porcentajeAzules',
      'porcentajeCafes',
      'porcentajeGrises',
      'porcentajeRojos',
      'setGreenRule',
      'setBlueRule',
      'setBrownRule',
      'setGrayRule',
      'setRedRule',
      'getGeneration'
    ]);
    mockShapeFactory = jasmine.createSpyObj('ShapeFactory', [
      'createLifeWithoutDeathRule',
      'createCoralRule',
      'createDayAndNightRule',
      'createMorleyRule',
      'createReplicatorRule',
      'createAnnealRule',
      'createDiamoebaRule',
      'createCoagulationRule',
      'createWalledCityRule',
      'MazeWithMice'
    ]);

    strategy = new ConcreteNextGenStrategy();
    (strategy as any).shapeFactory = mockShapeFactory;
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  it('should set Green rules based on percentage', () => {
    mockAutomata.porcentajeVerdes.and.returnValue(0.01);
    mockShapeFactory.createLifeWithoutDeathRule.and.returnValue(mockRule);
    
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setGreenRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.porcentajeVerdes.and.returnValue(0.15);
    mockShapeFactory.createCoralRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setGreenRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.porcentajeVerdes.and.returnValue(0.55);
    mockShapeFactory.createDayAndNightRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setGreenRule).toHaveBeenCalledWith(mockRule);
  });

  it('should set Blue rules based on percentage', () => {
    mockAutomata.porcentajeAzules.and.returnValue(0.01);
    mockShapeFactory.createReplicatorRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setBlueRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.porcentajeAzules.and.returnValue(0.25);
    mockShapeFactory.createAnnealRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setBlueRule).toHaveBeenCalledWith(mockRule);
  });

  it('should set Brown rules based on percentage', () => {
    mockAutomata.porcentajeCafes.and.returnValue(0.01);
    mockShapeFactory.createLifeWithoutDeathRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setBrownRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.porcentajeCafes.and.returnValue(0.4);
    mockShapeFactory.createCoagulationRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setBrownRule).toHaveBeenCalledWith(mockRule);
  });

  it('should set Gray rules based on percentage', () => {
    mockAutomata.porcentajeGrises.and.returnValue(0.01);
    mockShapeFactory.createLifeWithoutDeathRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setGrayRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.porcentajeGrises.and.returnValue(0.45);
    mockShapeFactory.createMorleyRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setGrayRule).toHaveBeenCalledWith(mockRule);
  });

  it('should set Red rules based on percentage and generation', () => {
    mockAutomata.porcentajeRojos.and.returnValue(0.04);
    mockAutomata.getGeneration.and.returnValue(50);
    mockShapeFactory.createReplicatorRule.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setRedRule).toHaveBeenCalledWith(mockRule);

    mockAutomata.getGeneration.and.returnValue(150);
    mockShapeFactory.MazeWithMice.and.returnValue(mockRule);
    strategy.nextGeneration(mockAutomata);
    expect(mockAutomata.setRedRule).toHaveBeenCalledWith(mockRule);
  });
});
