import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geometry } from '@babylonjs/core';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-detalle-nodo',
  templateUrl: './detalle-nodo.component.html',
  styleUrls: ['./detalle-nodo.component.styl']
})
export class DetalleNodoComponent implements OnInit {

  constructor(
    private geometry: GeometryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


    //   this.route.params.subscribe(params => {
    //     let id = params['id'];
    //     console.log('id es ', id)
    //     this.geometry.obtenerHijos(id)
    //     .subscribe( resp => {

    //       console.log(resp)
    //     })
    // });




  }

}
