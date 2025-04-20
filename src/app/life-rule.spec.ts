import { TestBed } from '@angular/core/testing';
import { LifeRule } from '../../life-rule';

describe('LifeRule', () => {
  let rule: LifeRule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LifeRule]
    });
    rule = new LifeRule();
  });

  describe('Survival Conditions', () => {
    it('should survive with 2 or 3 live neighbors', () => {
      expect(rule.surviveCondition(2)).toBe(true);
      expect(rule.surviveCondition(3)).toBe(true);
    });

    it('should not survive with less than 2 or more than 3 live neighbors', () => {
      expect(rule.surviveCondition(0)).toBe(false);
      expect(rule.surviveCondition(1)).toBe(false);
      expect(rule.surviveCondition(4)).toBe(false);
      expect(rule.surviveCondition(5)).toBe(false);
    });
  });

  describe('Birth Conditions', () => {
    it('should be born with exactly 3 live neighbors', () => {
      expect(rule.liveCondition(3)).toBe(true);
    });

    it('should not be born with any other number of live neighbors', () => {
      expect(rule.liveCondition(0)).toBe(false);
      expect(rule.liveCondition(1)).toBe(false);
      expect(rule.liveCondition(2)).toBe(false);
      expect(rule.liveCondition(4)).toBe(false);
      expect(rule.liveCondition(5)).toBe(false);
    });
  });
}); 