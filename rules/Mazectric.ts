import { Rule } from "rule";


export class Mazectric implements Rule {
    name: string = 'mazetric1';
    notation: string = 'S1234/B3';
    surviveCondition(vivas: number): boolean {
        if (1 <= vivas && vivas <= 4) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if (vivas === 3) {
            return true;
        }
        return false;
    }
}