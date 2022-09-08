import { Rule } from "rule";



export class MazeWithMice implements Rule {
    // B37/S12345	
    surviveCondition(vivas: number): boolean {
        if ( vivas >= 1 && vivas <= 5 ) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 5) {
            return true;
        }
        return false;
    }

}