import { Rule } from "rule";


export class LifeWithoutDeath implements Rule {
    surviveCondition(vivas: number): boolean {
        return true;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 ) {
            return true;
        } return false;
    }

}