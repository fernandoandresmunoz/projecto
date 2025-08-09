import { Rule } from "rule";


export class Coagulations implements Rule {
    name: string = 'coagulation';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas === 3 || vivas === 5 || vivas === 6 || vivas === 7 || 
            vivas === 8 ) {
                return true;
            }
            return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 7 || vivas === 8) {
            return true;
        }
        return false;
    }
}