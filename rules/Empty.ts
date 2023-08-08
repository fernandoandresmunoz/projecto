import { Rule } from "rule";



export class EmptyRule implements Rule {
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
        return false;
    }
}