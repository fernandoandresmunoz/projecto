import { Rule } from "rule";



export class Serviettes implements Rule {
    surviveCondition(vivas: number): boolean {
        return false;
    }
    liveCondition(vivas: number): boolean {
         if ( vivas === 2 || vivas == 3 || vivas === 4  ) {
            return true;
        }
        return false;       
    }
}