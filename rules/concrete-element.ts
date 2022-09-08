
import { Rule } from 'rule';
import { Element } from './element'


export class ConcreteElement implements Element {

    name: string;

    primaryColor: string;
    secondaryColor: string;
    terciaryColor: string;

    rule: Rule;



    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }

    getRule(): Rule {
        return this.rule;
    }
    setRule(rule: Rule): void {
        this.rule = rule;
    }
    getPrimaryColor(): string {
        return this.primaryColor;
    }
    getSecondaryColor(): string {
        return this.secondaryColor;
    }
    getTerciaryColor(): string {
        return this.terciaryColor;
    }
    setPrimaryColor(color: string): void {
        this.primaryColor = color;
    }
    setSecondaryColor(color: string): void {
        this.secondaryColor = color;
    }
    setTerciaryColor(color: string): void {
        this.terciaryColor = color;
    }

}