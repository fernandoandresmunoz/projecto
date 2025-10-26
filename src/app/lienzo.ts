export interface Punto {
    id: number;
    x: number;
    y: number;
    lienzo: number; // El ID del lienzo padre (ForeignKey)
    color: string;
    etiqueta: string;
  }
  
  export interface Lienzo {
    // Campos del modelo Lienzo de Django
    id: number;
    url: string; // Incluido por HyperlinkedModelSerializer si lo usaste
    nombre: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    
    ancho: number;
    alto: number;
    color_fondo: string;
  
    rango_min_x: number;
    rango_max_x: number;
    rango_min_y: number;
    rango_max_y: number;
    zoom: number;
  
    // Los puntos anidados
    puntos: Punto[]; 
  }
  