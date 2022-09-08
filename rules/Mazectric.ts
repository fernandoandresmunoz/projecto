import { Rule } from "rule";


export class Mazectric implements Rule {
    surviveCondition(vivas: number): boolean {
        if ( 1 <= vivas && vivas <=  4) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 ) {
            return true;
        }
        return false;
    }
}