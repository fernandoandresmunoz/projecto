import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Cube } from 'cube';
import { Nodo } from 'src/Nodo';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.styl']
})
export class ArbolComponent implements OnInit {

  @Input() raiz: Nodo;

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() { }
  ngOnInit(): void {
    setInterval(() => {
      this.draw();
    }, 500)
  }
ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();


  }

  draw() {
    console.log('drawing')

    this.context.clearRect(0, 0, 400, 400);
    this.context.beginPath();
    this.context.arc(100, 75, 40, 0, 2 * Math.PI);
    this.context.fill()


    let counter = 1;
    this.raiz.getChildren().map(obj => {
      this.context.beginPath();
      this.context.arc(100 * counter, 150, 40, 0, 2 * Math.PI);
      this.context.fill()
      counter += 1



      let counter2 = 1;

      for (let child of obj.getChildren()) {
        this.context.beginPath();
        this.context.arc(50 * counter2 * counter , 300, 20, 0, 2 * Math.PI);
        this.context.fill()
        counter2 += 1



      }
      })



      // let counter2 = 1;
      // obj.getChildren().map( child => {
      // this.context.beginPath();
      // this.context.arc(50 * counter2, 250, 20, 0, 2 * Math.PI);
      // this.context.fillStyle = child.getState();
      // this.context.fill()
      // counter2 += 1


      // })


    // })

    this.context.strokeStyle = 'Black'
    // this.context.fillStyle = '#595447';


    this.context.stroke();
  }
}
