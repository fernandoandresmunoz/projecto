import { Rule } from "rule";

export class CorrosionOfConformity implements Rule {
    // B3/S124	
    surviveCondition(vivas: number): boolean {
        if ( vivas === 1 || vivas === 2 || vivas === 4) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3) {
            return true
        }
        return false;
    }
// 
}
    