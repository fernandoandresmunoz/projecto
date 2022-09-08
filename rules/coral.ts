import { Rule } from "rule";


export class Coral implements Rule {
    surviveCondition(vivas: number): boolean {
        if ( vivas === 4 || vivas === 5 || vivas === 6 || vivas === 7 || 
            vivas === 8 ) {
                return true;
            }
            return false;
    }
    liveCondition(vivas: number): boolean {
        return vivas === 3 ? true : false;
    }
}