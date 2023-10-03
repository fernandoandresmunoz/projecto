
import  { Automata } from 'cube';


export interface NextMatrixStrategy {
    nextMatrix(matriz: {state: number, color: string}[][]): {state: number, color: string}[][]; 
}