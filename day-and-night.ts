import { Rule } from "rule";

// B3678/S34678	
export class DayAndNight implements Rule {
    name: string = 'day and night';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 4 || vivas === 6 || vivas === 7 || vivas === 8 || vivas === 9 ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 6 || vivas === 7 || vivas === 8) {
            return true;
        }
        return false;
    }

}