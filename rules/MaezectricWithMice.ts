// B37/S1234	

import { Rule } from "rule";


export class MazectricWithMice implements Rule {
    name: string = 'mazectric with mice';
    surviveCondition(vivas: number): boolean {
        if ( 1 <= vivas && 4 >= vivas ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if( vivas ===3 || vivas === 7) {
            return true;
        }
        return false;
    }
}