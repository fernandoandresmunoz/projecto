import { Rule } from "rule";



export class HighLife implements Rule {
    name: string = 'high life';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas === 3) {
            return true;
        }

        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 6) {
            return true;
        }
        return false;
    }

}