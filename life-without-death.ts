import { Rule } from "rule";


export class LifeWithoutDeath implements Rule {
    name: string = 'life without death';
    surviveCondition(vivas: number): boolean {
        return true;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 ) {
            return true;
        } return false;
    }

}