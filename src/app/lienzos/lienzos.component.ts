import { Component, OnInit } from '@angular/core';
import { LienzosService } from '../graficos.service';
import { Lienzo } from './lienzo';
import { Router } from '@angular/router';
import { Canvas } from '../canvas';

@Component({
  selector: 'app-lienzos',
  templateUrl: './lienzos.component.html',
  styleUrls: ['./lienzos.component.styl']
})
export class LienzosComponent implements OnInit {



  lienzos: Canvas[] = [];
  cargando: boolean = true;
  errorCarga: boolean = false;

  id: number;
  title: string = 'New Canvas';
  nombre: string = 'New Canvas';
  ancho: number = 500;
  alto: number = 500;
  color_fondo: string = '#fff';
  ancho_eje_x: number = 16;
  ancho_eje_y: number = 16;
  zoom: number = 16;



  constructor(
    private lienzoService: LienzosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cargarLienzos();
  }

  crearCanvas() {
    console.log('title ', this.title)
    console.log('ancho', this.ancho)
    console.log('alto', this.alto)
    console.log('color_fondo', this.color_fondo)
    console.log('zoom', this.zoom)

  
    let nuevoCanvas: Canvas = {
      id: this.id,
      nombre: this.nombre,
      ancho: this.ancho,
      alto: this.alto,
      color_fondo: this.color_fondo,
      ancho_eje_x: this.ancho_eje_x,
      ancho_eje_y: this.ancho_eje_y,
      zoom: this.zoom,




    }

    this.lienzoService.createCanvas(
     nuevoCanvas 

    ).subscribe(() => {
      this.cargarLienzos();

    })
  }


  cargarLienzos(): void {
    this.cargando = true;
    this.errorCarga = false;
    this.lienzos = [];

    this.lienzoService.getLienzos().subscribe({
      next: (data) => {
        // La solicitud fue exitosa, guardamos los datos
        this.lienzos = data;
        this.cargando = false;
      },
      error: (error) => {
        // Hubo un error en la solicitud
        this.cargando = false;
        this.errorCarga = true;
        console.error('Error al cargar lienzos:', error);
      }
    });
  }

  lienzoDetail(lienzo: any): void {
    this.router.navigate(['/curvas/lienzos', lienzo.id])
  }


}
