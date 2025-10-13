import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauss',
  templateUrl: './gauss.component.html',
  styleUrls: ['./gauss.component.styl']
})
export class GaussComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gauss() : (x: number) => number { 
    return x => 3 * Math.exp(-1 * x**2) 

  }

}
