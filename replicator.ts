import { Rule } from "rule";


export class Replicator implements Rule {
    // B1357/S1357	
    surviveCondition(vivas: number): boolean {
        if ( vivas === 1 || vivas === 3 || vivas === 5 || vivas === 7 ) {
            return true;
        } return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 1 || vivas === 3 || vivas === 5 || vivas === 7) {
            return true;
        } return false;
    }

}