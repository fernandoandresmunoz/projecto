import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-wrapper-minecraft-view',
  templateUrl: './wrapper-minecraft-view.component.html',
  styleUrls: ['./wrapper-minecraft-view.component.styl']
})
export class WrapperMinecraftViewComponent implements OnInit {

  datos_matriz: {state: number; color: string}[][];

  constructor(
    private route: ActivatedRoute,
    private geometry: GeometryService
  ) { 
      this.route.params.subscribe(params => {
        let id = params['id'];


        this.geometry.obtenerDetalleMatriz(id)
        .subscribe( resp => {
          this.datos_matriz = resp.datos_matriz;
        })

      })
    }



  ngOnInit(): void {
  }

}
