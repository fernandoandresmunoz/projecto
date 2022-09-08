import { Rule } from "rule";


export class Move implements Rule {
    surviveCondition(vivas: number): boolean {
        if (vivas === 2 || vivas === 4 || vivas === 5) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas == 3 || vivas == 6 || vivas === 8 ) {
            return true;
        }
        return false;
    }

}