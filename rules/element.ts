import { Rule } from "rule";



export interface Element {

    getName(): string;
    setName(name: string): void;

    getRule(): Rule;
    setRule(rule: Rule): void;

    getPrimaryColor(): string;
    getSecondaryColor(): string;
    getTerciaryColor(): string;

    setPrimaryColor(color: string): void;
    setSecondaryColor(color: string): void;
    setTerciaryColor(color: string): void;
}