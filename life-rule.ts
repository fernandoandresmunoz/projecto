import { Rule } from "rule";



export class LifeRule implements Rule {
    name: string = 'life rule';
    surviveCondition(vivas: number): boolean {
        if ( vivas == 2 || vivas  == 3){
            return true;
        } else {
            return false;
        }
    }
    // esta es la condicion de nacimiento
    liveCondition(vivas: number): boolean {
        return vivas === 3  ? true : false;
    }

}