import { Rule } from "rule";


export class Diamoeba implements Rule {
    name: string = 'diamoeba';
    surviveCondition(vivas: number): boolean {
        // B35678/S5678	
        if ( vivas === 5 || vivas === 6 || vivas === 7 || vivas === 8) {
            return true
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        return ( vivas === 3 || vivas === 5 || vivas === 6 || vivas === 7 || vivas === 8) ? true : false;
    }

}