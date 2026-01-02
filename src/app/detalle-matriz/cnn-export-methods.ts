// Agregar estos métodos al componente detalle-matriz.component.ts

/**
 * Exporta los datos del autómata en formato adecuado para entrenar una CNN
 */
exportarParaCNN(): void {
  const snapshot = this.capturarSnapshot();
  
  // Crear archivo JSON
  const dataStr = JSON.stringify(snapshot, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // Descargar archivo
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `automata_${this.idMatriz}_gen_${this.generacion}.json`;
  link.click();
  URL.revokeObjectURL(url);
  
  console.log('✅ Datos exportados para CNN');
}

/**
 * Captura un snapshot completo del estado actual
 */
private capturarSnapshot(): any {
  const matrizNumerica = this.convertMatrixToNumeric(this.automata.getMatrizActiva());
  
  return {
    metadata: {
      id: this.idMatriz,
      nombre: this.nombre,
      generacion: this.generacion,
      timestamp: new Date().toISOString(),
      dimensiones: {
        filas: this.filas,
        columnas: this.columnas,
        total_celulas: this.filas * this.columnas
      }
    },
    
    // Estado de la matriz
    matriz: {
      raw: matrizNumerica,
      shape: [this.filas, this.columnas],
      dtype: 'int8'
    },
    
    // Canales separados por color
    canales: {
      red: this.extraerCanal(matrizNumerica, 5),
      blue: this.extraerCanal(matrizNumerica, 3),
      green: this.extraerCanal(matrizNumerica, 1),
      brown: this.extraerCanal(matrizNumerica, 2),
      gray: this.extraerCanal(matrizNumerica, 4)
    },
    
    // Configuración de reglas
    reglas: {
      RED: {
        algoritmo: this.automata.getRuleForColor('RED'),
        colores: [
          this.automata.regla_1_color_1,
          this.automata.regla_1_color_2,
          this.automata.regla_1_color_3
        ],
        altura: this.automata.altura_regla_1
      },
      BLUE: {
        algoritmo: this.automata.getRuleForColor('BLUE'),
        colores: [
          this.automata.regla_2_color_1,
          this.automata.regla_2_color_2,
          this.automata.regla_2_color_3
        ],
        altura: this.automata.altura_regla_2
      },
      GREEN: {
        algoritmo: this.automata.getRuleForColor('GREEN'),
        colores: [
          this.automata.regla_3_color_1,
          this.automata.regla_3_color_2,
          this.automata.regla_3_color_3
        ],
        altura: this.automata.altura_regla_3
      },
      BROWN: {
        algoritmo: this.automata.getRuleForColor('BROWN'),
        colores: [
          this.automata.regla_4_color_1,
          this.automata.regla_4_color_2,
          this.automata.regla_4_color_3
        ],
        altura: this.automata.altura_regla_4
      },
      GRAY: {
        algoritmo: this.automata.getRuleForColor('GRAY'),
        colores: [
          this.automata.regla_5_color_1,
          this.automata.regla_5_color_2,
          this.automata.regla_5_color_3
        ],
        altura: this.automata.altura_regla_5
      }
    },
    
    // Estadísticas
    estadisticas: {
      poblacion: {
        red: this.automata.totalRojos(),
        blue: this.automata.totalAzules(),
        green: this.automata.totalVerdes(),
        brown: this.automata.totalCafes(),
        gray: this.automata.totalGrises(),
        total: this.automata.totalRojos() + this.automata.totalAzules() + 
               this.automata.totalVerdes() + this.automata.totalCafes() + 
               this.automata.totalGrises()
      },
      densidad: {
        red: this.automata.totalRojos() / (this.filas * this.columnas),
        blue: this.automata.totalAzules() / (this.filas * this.columnas),
        green: this.automata.totalVerdes() / (this.filas * this.columnas),
        brown: this.automata.totalCafes() / (this.filas * this.columnas),
        gray: this.automata.totalGrises() / (this.filas * this.columnas),
        total: (this.automata.totalRojos() + this.automata.totalAzules() + 
                this.automata.totalVerdes() + this.automata.totalCafes() + 
                this.automata.totalGrises()) / (this.filas * this.columnas)
      }
    },
    
    // Features adicionales para ML
    features: {
      entropia: this.calcularEntropia(matrizNumerica),
      simetria: this.calcularSimetria(matrizNumerica),
      conectividad: this.calcularConectividad(matrizNumerica),
      complejidad: this.calcularComplejidad(matrizNumerica)
    }
  };
}

/**
 * Extrae un canal específico de la matriz numérica
 */
private extraerCanal(matriz: number[][], valor: number): number[][] {
  return matriz.map(fila => 
    fila.map(celda => celda === valor ? 1 : 0)
  );
}

/**
 * Calcula la entropía de Shannon de la matriz
 */
private calcularEntropia(matriz: number[][]): number {
  const flat = matriz.flat();
  const total = flat.length;
  const frecuencias: { [key: number]: number } = {};
  
  // Contar frecuencias
  flat.forEach(valor => {
    frecuencias[valor] = (frecuencias[valor] || 0) + 1;
  });
  
  // Calcular entropía
  let entropia = 0;
  Object.values(frecuencias).forEach(freq => {
    const p = freq / total;
    if (p > 0) {
      entropia -= p * Math.log2(p);
    }
  });
  
  return entropia;
}

/**
 * Calcula simetría horizontal y vertical
 */
private calcularSimetria(matriz: number[][]): { horizontal: number, vertical: number } {
  const filas = matriz.length;
  const cols = matriz[0].length;
  
  // Simetría horizontal
  let matchesHorizontal = 0;
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < Math.floor(cols / 2); j++) {
      if (matriz[i][j] === matriz[i][cols - 1 - j]) {
        matchesHorizontal++;
      }
    }
  }
  const simetriaHorizontal = matchesHorizontal / (filas * Math.floor(cols / 2));
  
  // Simetría vertical
  let matchesVertical = 0;
  for (let i = 0; i < Math.floor(filas / 2); i++) {
    for (let j = 0; j < cols; j++) {
      if (matriz[i][j] === matriz[filas - 1 - i][j]) {
        matchesVertical++;
      }
    }
  }
  const simetriaVertical = matchesVertical / (Math.floor(filas / 2) * cols);
  
  return {
    horizontal: simetriaHorizontal,
    vertical: simetriaVertical
  };
}

/**
 * Calcula conectividad de células vivas
 */
private calcularConectividad(matriz: number[][]): number {
  const filas = matriz.length;
  const cols = matriz[0].length;
  let conexiones = 0;
  let celulasVivas = 0;
  
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < cols; j++) {
      if (matriz[i][j] > 0) {
        celulasVivas++;
        
        // Contar vecinos vivos
        const vecinos = [
          [i-1, j], [i+1, j], [i, j-1], [i, j+1],
          [i-1, j-1], [i-1, j+1], [i+1, j-1], [i+1, j+1]
        ];
        
        vecinos.forEach(([ni, nj]) => {
          if (ni >= 0 && ni < filas && nj >= 0 && nj < cols && matriz[ni][nj] > 0) {
            conexiones += 0.5; // 0.5 porque contamos cada conexión dos veces
          }
        });
      }
    }
  }
  
  return celulasVivas > 0 ? conexiones / celulasVivas : 0;
}

/**
 * Calcula complejidad de Lempel-Ziv (simplificada)
 */
private calcularComplejidad(matriz: number[][]): number {
  const secuencia = matriz.flat().join('');
  let c = 1;
  let l = 1;
  let i = 0;
  let k = 1;
  let k_max = 1;
  
  const n = secuencia.length;
  
  while (k + k_max < n) {
    const s = secuencia.substring(i, i + k_max);
    const t = secuencia.substring(k + i, k + i + k_max);
    
    if (s === t) {
      k_max++;
    } else {
      c++;
      i = k;
      k = i + 1;
      k_max = 1;
    }
  }
  
  return c * Math.log2(n) / n;
}

/**
 * Captura secuencia temporal para entrenamiento
 */
captureHasta secuenciaTempora l(numGeneraciones: number): void {
  const secuencia: any[] = [];
  
  for (let i = 0; i < numGeneraciones; i++) {
    const snapshot = this.capturarSnapshot();
    secuencia.push(snapshot);
    
    if (i < numGeneraciones - 1) {
      this.automata.avanzarUnaGeneracion();
    }
  }
  
  // Descargar secuencia
  const dataStr = JSON.stringify({
    tipo: 'secuencia_temporal',
    inicio_generacion: this.generacion,
    num_generaciones: numGeneraciones,
    secuencia: secuencia
  }, null, 2);
  
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `secuencia_${this.idMatriz}_${numGeneraciones}gen.json`;
  link.click();
  URL.revokeObjectURL(url);
  
  console.log(`✅ Secuencia de ${numGeneraciones} generaciones exportada`);
}
