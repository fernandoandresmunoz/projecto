import { Automata } from "cube";
import { ChannelController } from "./channel-controller";




const COLOR_MAP: { [key: string]: number } = {
    "GREEN": 1,
    "BROWN": 2, // Nota: Si quieres que BROWN sea 2, lo asociamos así.
    "BLUE": 3,
    "GRAY": 4,
    "RED": 5,
};




export class ConcreteChannelController implements ChannelController {

    automata: Automata;
    selectedRow: number;
    selectedColumn: number;
    filter: number[][]
    matrix: number[][]

    constructor(automata: Automata) {
        this.automata = automata;
    }

    getFilter(): number[][] {
        return this.filter;
    }
    setFilter(filter: number[][]): void {
        this.filter = filter;
    }
    forwardSelectedCell(): void {
        this.selectedRow += 1;
    }
    backwardSelectedCell(): void {
        this.selectedRow -= 1;
    }
    setMatrix(matrix: number[][]): void {
        this.matrix = matrix;
    }
    getSubMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
    setSelectedRow(row: number): void {
        throw new Error("Method not implemented.");
    }
    setSelectedColumn(column: number): void {
        throw new Error("Method not implemented.");
    }
    nextMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }
    getFilterResult(): number[][] {
        throw new Error("Method not implemented.");
    }
    getCurrentMatrix(): number[][] {
        throw new Error("Method not implemented.");
    }


    getChannel(channelNumber: number): number[][] {

        const matrix = this.convertMatrixToNumeric(this.automata.getMatrizActiva());
        const aislarCanal = this.aislarCanal(matrix, channelNumber);
        return aislarCanal;

    }

    aislarCanal(matriz: number[][], id: number): number[][] {
        return matriz.map(fila =>
            fila.map(celda => (celda === id ? 1 : 0))
        );
    }


    convertMatrixToNumeric(matrix: any): any {
        return matrix.map((row: Cell[]) => {

            return row.map((cell: Cell) => {

                // 1. Caso base: Si el estado es 0 (célula muerta), devuelve 0.
                if (cell.state === 0) {
                    return 0;
                }

                // 2. Caso vivo: Si el estado es > 0, devuelve el valor mapeado del color.
                // Usamos .toUpperCase() para asegurar que coincida con el mapa.
                const colorKey = cell.color.toUpperCase();

                // Si el color no está en el mapa, devolvemos 0 o un valor por defecto (ej. 1)
                // Aquí devolvemos 0 como fallback de seguridad.
                return COLOR_MAP[colorKey] || 0;
            });
        });

    }
}
