import { Rule } from "rule";


export class PedestrianLife implements Rule {
    name: string = 'pedestrian life';
    // B38/S23	
    surviveCondition(vivas: number): boolean {
        if ( vivas === 2 || vivas === 3) {
            return true;
        }
        return false;
    }
    liveCondition(vivas: number): boolean {
        if ( vivas === 3 || vivas === 8) {
            return true;
        }
        return false;
    }

}