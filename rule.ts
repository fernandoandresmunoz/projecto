

export interface Rule {
    name: string;
    notation: string;
    surviveCondition(vivas: number): boolean;
    liveCondition(vivas: number): boolean;
}