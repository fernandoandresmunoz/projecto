import { Rule } from "rule";

// B368/S245	
export class Morley implements Rule {
    name: string = 'morley';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas === 4 || vivas === 5 ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 6 || vivas === 8 ) {
            return true;
        }
        return false;
    }
}