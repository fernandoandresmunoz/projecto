import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recta',
  templateUrl: './recta.component.html',
  styleUrls: ['./recta.component.styl']
})
export class RectaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  recta() : (x: number) => number { 
    return x => x/2;
  }

}
