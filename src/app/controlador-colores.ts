import { Rule } from "rule";

export interface ControladorColores {

    cambiarColoresRegla1(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla2(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla3(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla4(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla5(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla6(color1: string, color2: string, color3: string): void;
    cambiarColoresRegla7(color1: string, color2: string, color3: string): void;

    getReglas(): Rule[];
    cambiarColorRegla(rule: Rule, color1: string, color2: string, color3: string ): void;



}
