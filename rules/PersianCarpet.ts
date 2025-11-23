import { Rule } from "rule";

export class PersianCarpet implements Rule {
    name: string = 'PERSIAN CARPET';
    // B3/S124	
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas === 3 || vivas === 4 ) {
            return true;
        }
        return false;
        // if ( vivas === 2 || vivas === 3 || vivas === 5 || vivas === 7 || vivas === 8) {
        //     return true
        // }
    }
// 
}
    