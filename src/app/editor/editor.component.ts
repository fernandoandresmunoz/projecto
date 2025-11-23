import { Component, OnInit } from '@angular/core';
import { GeometryService } from '../geometry.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.styl']
})
export class EditorComponent implements OnInit {


  filas: number = 20;
  columnas: number = 20;

  matrix: number[][] = []
  selectedColor: string = 'red';

  constructor(private geometry: GeometryService) { }

  ngOnInit(): void {
    this.createMatrix();
  }

  createMatrix(): void { 

    let nuevaMatrix = [];
    for ( let counter = 0 ; counter < this.filas ; counter = counter + 1)
    {
      let fila = [];
      for ( let counter2 = 0 ; counter2 < this.columnas ; counter2 = counter2 + 1) {
        fila.push(0)
      }
      nuevaMatrix.push(fila);
    }

    this.matrix = nuevaMatrix;

  }

  clickCelda(i: number, j: number): void {
    console.log('clicking on celda, ', i, j)

    console.log('SELECTED COLOR ', this.selectedColor)

    switch (this.selectedColor) {
      case 'red':
        this.matrix[i][j] = 1;
        break;
      case 'blue':
        this.matrix[i][j] = 2;
        break;
      case 'green':
        this.matrix[i][j] = 3;
        break;
      case 'brown':
        this.matrix[i][j] = 4;
        break;
      case 'gray':
        this.matrix[i][j] = 5;
        break;

      default:
        break;
    }

    // if ( this.matrix[i][j] === 0 ) {

    //   this.matrix[i][j] = 1;
    // } else if ( this.matrix[i][j] === 1 ) {
    //   this.matrix[i][j] = 2;
    // } else if ( this.matrix[i][j] === 2 ) {

    //   this.matrix[i][j] = 0;
    // }
  }

  saveAsMatrix(): void { 
    console.log('saving as matrix');

    let nuevaMatrix = [];

    for ( let i = 0 ; i < this.matrix.length ; i = i +1 ) {
      let fila = [];
      for ( let j = 0 ; j < this.matrix[0].length ; j = j + 1 ) {
        let celda;
        let color;

        if ( this.matrix[i][j] === 1 )
        {
         color = 'Red' ;
        celda = {
          color: color,
          state: 1
        }
        } else if ( this.matrix[i][j]=== 2)
        {
          color = 'Blue';
        celda = {
          color: color,
          state: 1
        } 
        }
         else if ( this.matrix[i][j]=== 3)
        {
          color = 'Green';
        celda = {
          color: color,
          state: 1
        } 
        }
         else if ( this.matrix[i][j]=== 4)
        {
          color = 'Brown';
        celda = {
          color: color,
          state: 1
        } 

        }
 else if ( this.matrix[i][j]=== 5)
        {
          color = 'Gray';
        celda = {
          color: color,
          state: 1
        } 
        }
        else {
          celda = {
            color: "",
            state: 0
          }
        }

        fila.push(celda)
      } 
      nuevaMatrix.push(fila)
    }

    console.log(nuevaMatrix)

    this.geometry.createMatrixWithData('Nueva matrix custom', this.filas, this.columnas, nuevaMatrix)
    .subscribe( r => {
      console.log(r)
    })





  }





}
