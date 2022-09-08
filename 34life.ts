import { Rule } from "rule";


export class Life34 implements Rule {
    surviveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 4 ) {
            return true;
        } 
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 4 ) {
            return true;
        }
        return false;
    }

}