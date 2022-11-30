
import  { Cube as IAutomata} from 'cube';


export interface NextMatrixStrategy {
    nextMatrix(matriz: {state: number, color: string}[][]): {state: number, color: string}[][]; 
}