import { Rule } from "rule";



export class Geology implements Rule {
    name: string = 'geology';
    notation: string = 'S2467/B3578';
    surviveCondition(vivas: number): boolean {
        if (vivas === 2 || vivas == 4 || vivas === 6 || vivas === 7
            || vivas === 7) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if (vivas === 3 || vivas === 5 || vivas === 7 || vivas === 8) {
            return true;
        }
        return false;
    }
}