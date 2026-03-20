import { Rule } from "rule";


export class Life34 implements Rule {
    name: string = '34 life';
    notation: string = 'S34/B34';
    surviveCondition(vivas: number): boolean {
        if (vivas === 3 || vivas === 4) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if (vivas === 3 || vivas === 4) {
            return true;
        }
        return false;
    }

}