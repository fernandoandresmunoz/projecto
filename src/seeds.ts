import { Rule } from "rule";



export class Seeds implements Rule {
    name: string = 'seeds';
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 2 ) {
            return true;
        } 
        return false;
    }

}