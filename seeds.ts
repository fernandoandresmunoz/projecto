import { Rule } from "rule";



export class Seeds implements Rule {
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 2 ) {
            return true;
        } 
        return false;
    }

}