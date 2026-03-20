
export interface Recta {

    id: number;
    lienzo: number;
    p1: { id: number, x: number, y: number };
    p2: { id: number, x: number, y: number };
    p1_data: { id: number, x: number, y: number };
    p2_data: { id: number, x: number, y: number };
    color: string;
    grosor_linea: string;


    x1: number;
    y1: number;
    x2: number;
    y2: number;
    punto1_id: number;
    punto2_id: number;

}