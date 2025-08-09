import { Rule } from "rule";


export class Maze implements Rule {
    name: string = 'maze';
    surviveCondition(vivas: number): boolean {
        if ( vivas === 1 || vivas === 2 || vivas === 3 || vivas === 4
            || vivas === 5) {
                return true;
            }
            return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 ) {
            return true;
        }
        return false;
    }

}