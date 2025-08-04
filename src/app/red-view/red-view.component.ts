import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { JUEGO } from 'src/JUEGO';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-red-view',
  templateUrl: './red-view.component.html',
  styleUrls: ['./red-view.component.styl']
})
export class RedViewComponent implements OnInit, OnChanges {

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  umbralInferior: number = 0.70;
  umbralSuperior: number = 0.80 ; 

  @Input() root: Nodo;

  
  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
    console.log(this.root.average())
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();

  }

  draw(): void {


    this.context.clearRect(0, 0 , 800, 800)
    let distanciaCapas = 100

    // this.context.beginPath();
    // this.context.arc(750, 400, 40, 0, 2 * Math.PI);
    // this.context.stroke();


    for (let i = 0 ; i <  this.root.getChildren().length ; i ++ )  {
      this.context.beginPath();
      this.context.arc(700, 260 * ( i + 1 ), 40, 0, 2 * Math.PI);
      
      // this.context.fillStyle = 'green'

      let nodo = this.root.getChildren()[i];
      this.context.fillStyle = nodo.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR);
      // if (nodo.average() > 0.7) {

      // this.context.fillStyle = 'green';
      // } else if ( nodo.average() > 0.5 ) {
      //   this.context.fillStyle = 'yellow';
      // } else { 
      //   this.context.fillStyle = 'red';
      // }




      this.context.fill();

      this.context.stroke();


    }



    for (let i = 0; i < this.root.getChildren()[0].getChildren().length; i++) {
      this.context.beginPath();
      this.context.arc(550, 200 * (i + 1), 40, 0, 2 * Math.PI);
      let nodo = this.root.getChildren()[0].getChildren()[i]

      // if (nodo.average() > 0.7) {

      //   this.context.fillStyle = 'green';
      // } else if (nodo.average() > 0.5) {
      //   this.context.fillStyle = 'yellow';
      // } else if ( nodo.average() <= 0.5) {
      //   this.context.fillStyle = 'red';
      // }

      this.context.fillStyle = nodo.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR);
      this.context.fill();


      this.context.stroke();


    }


    // capa 3 
    for (let i = 0; i < this.root.getChildren()[0].getChildren()[0].getChildren().length; i++) {
      this.context.beginPath();
      this.context.arc(400, 200 * (i + 1), 40, 0, 2 * Math.PI);

      let nodo = this.root.getChildren()[0].getChildren()[0].getChildren()[i]
      // if (nodo.average() > 0.7) {
      //   this.context.fillStyle = 'green';
      // } else if (nodo.average() > 0.6) {
      //   this.context.fillStyle = 'yellow';
      // } else {
      //   this.context.fillStyle = 'red';
      // }
      this.context.fillStyle = nodo.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR);
      this.context.fill();
      this.context.stroke();


    }

    // capa 4 

    for (let i = 0; i < this.root.getChildren()[0].getChildren()[0].getChildren()[0].getChildren().length; i++) {
      let nodo = this.root.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[i]
        this.context.beginPath();
      const x =  250 
      const y = 200 * (i + 1)

      this.context.fillStyle = nodo.getState(JUEGO.UMBRAL_INFERIOR, JUEGO.UMBRAL_SUPERIOR);
      this.context.arc(x, y , 40, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();

      this.context.font = "20px Arial";
      this.context.fillStyle = 'blue'
      this.context.fillText((nodo.average()).toString(), x, y);
      this.context.stroke()




      this.context.stroke();


    }






  }


}
