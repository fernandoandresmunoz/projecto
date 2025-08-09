import { Rule } from "rule";

// B3/S1237	
export class SnowLife implements Rule {
    name: string = 'snow life';
    surviveCondition(vivas: number): boolean {
        if ((  vivas <= 1 && vivas >= 3  ) || vivas === 7) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if (vivas === 3) {
            return true;
        }
        return false;
    }

}