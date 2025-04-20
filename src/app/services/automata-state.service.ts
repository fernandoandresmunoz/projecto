import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Cell {
  state: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutomataStateService {
  private matrixSubject = new BehaviorSubject<Cell[][]>([]);
  private colorRulesSubject = new BehaviorSubject<{[key: string]: string[]}>({});

  matrix$ = this.matrixSubject.asObservable();
  colorRules$ = this.colorRulesSubject.asObservable();

  updateMatrix(matrix: Cell[][]) {
    this.matrixSubject.next(matrix);
  }

  updateColorRules(colorRules: {[key: string]: string[]}) {
    this.colorRulesSubject.next(colorRules);
  }
} 