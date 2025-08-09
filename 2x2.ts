import { Rule } from "rule";


export class TwoXTwo implements Rule {
    name: string = 'twoxtwo';
    // B36/S125	
    surviveCondition(vivas: number): boolean {
        if ( vivas === 1 || vivas === 2 || vivas === 5 ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 6 ) {
            return true;
        } 
        return false;
    }

}