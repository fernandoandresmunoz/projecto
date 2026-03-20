import { Rule } from "rule";


export class Gnarl implements Rule {
    name: string = 'gnarl';
    notation: string = 'S1/B1';
    surviveCondition(vivas: number): boolean {
        if (vivas === 1) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if (vivas === 1) {
            return true;
        }
        return false;
    }
}