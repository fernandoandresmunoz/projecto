

export interface Rule {
    name: string;
    surviveCondition(vivas: number): boolean;
    liveCondition(vivas: number): boolean;
}