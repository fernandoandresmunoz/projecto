// export interface RespuestaPytorch {
//     diagnostico: { adn_vector: number[], estado_global: string, sugerencia_regla: string }
//     estadisticas: { [key: string]: number }
//     matrices: { [key: string]: { bordes: number[][], bordes_pool: number[][], densidad: number[][], densidad_macro: number[][], densidad_macro_pool: number[][], densidad_pool: number[][], gauss: number[][], gauss_pool: number[][], relieve: number[][], relieve_pool: number[][], sobel_x: number[][], sobel_x_pool: number[][], sobel_y: number[][], sobel_y_pool: number[][] } }
// }


export interface RespuestaPytorch {
    diagnostico: {
        adn_vector: number[],
        estado_global: string,
        sugerencia_regla: string
    };
    estadisticas: { [key: string]: number };
    // 'matrices' es un diccionario donde cada llave es directamente la matriz (number[][])
    matrices: { [key: string]: number[][] };
}