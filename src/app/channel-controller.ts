import { Automata } from "cube";


export interface Matrix {
    matrix: number[][];
}

export interface Channel {
    channel: number;
    matrix: number[][];
}


export interface Convolution {
    matrix: Matrix;
    step: number;
    width: number;
    height: number;
}


export interface MaxPooling {
    matrix: Matrix;
    step: number;
    width: number;
    height: number;
}


export interface ChannelController {
    selectedRow: number;
    selectedColumn: number;
    automata: Automata;

    getFilter(): number[][];
    setFilter(filter: number[][]): void;

    forwardSelectedCell(): void;
    backwardSelectedCell(): void;
    setMatrix(matrix: number[][]): void;
    getChannel(channelNumber: number): number[][];
    getSubMatrix(): number[][];
    setSelectedRow(row: number): void;
    setSelectedColumn(column: number): void;
    nextMatrix(): number[][];
    getFilterResult(): number[][];
    getCurrentMatrix(): number[][];


}
