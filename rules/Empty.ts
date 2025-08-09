import { Rule } from "rule";



export class EmptyRule implements Rule {
    name: string = 'empty rule';
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
        return false;
    }
}