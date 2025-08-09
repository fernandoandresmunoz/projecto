import { Rule } from "rule";


export class Gnarl implements Rule {
    name: string = 'gnarl';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 1) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 1 ) {
            return true;
        }
        return false;
    }
}