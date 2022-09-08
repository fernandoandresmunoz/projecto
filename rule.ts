

export interface Rule {
    surviveCondition(vivas: number): boolean;
    liveCondition(vivas: number): boolean;
}