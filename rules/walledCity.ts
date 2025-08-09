import { Rule } from "rule";



export class WalledCity implements Rule {
    name: string = 'walled city';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas == 3 || vivas === 4 || vivas === 5 ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 4 || vivas === 5 || vivas === 6 || vivas === 7 || vivas === 8) {
            return true;
        }
        return false;
    }
}