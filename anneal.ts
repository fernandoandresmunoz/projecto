
// B4678/S35678	

import { Rule } from "rule";

export class Anneal implements Rule {
    surviveCondition(vivas: number): boolean {
        if (vivas === 3 || vivas === 5 || vivas === 6 || vivas === 7 || vivas === 8) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 4 || vivas === 6 || vivas === 7 || vivas === 8 ) {
            return true;
        }
        return false;
    }
}