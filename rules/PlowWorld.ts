import { Rule } from "rule";


export class PlowWorld implements Rule {
    name: string = 'plow world';
    surviveCondition(vivas: number): boolean {
        // B378/S012345678	
        if ( vivas >= 0 && vivas <= 8) {
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