import { Component, ElementRef, ViewChild } from '@angular/core';
import { App,  ConcreteLine,  ConcretePoint,  COneLineAndPointApp,  CTwoLinesApp,  Line, OneLineAndPointApp, Point, TwoLinesApp  } from 'src/modelo';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent  implements OneLineAndPointApp{

  app = new COneLineAndPointApp();
  @ViewChild('lienzo')
  lienzo: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  getLine(): Line {
    return this.app.getLine();
  }
  setLine(line: Line): void {
    this.app.setLine(line);
  }
  getPoint(): Point {
    return this.app.getPoint();
  }
  setPoint(point: Point): void {
    this.app.setPoint(point);
  }
  getIntersection(): Point {
    return this.app.getIntersection();
  }
}

