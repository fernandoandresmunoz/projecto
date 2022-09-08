import { Rule } from "rule";



export class LifeRule implements Rule {
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas  === 3 ) {
            return true;
        } else {
            return false;
        }
    }
    liveCondition(vivas: number): boolean {
        return vivas === 3 ? true : false;
    }

}