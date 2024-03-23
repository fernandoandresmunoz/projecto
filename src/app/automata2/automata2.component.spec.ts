import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata2Component } from './automata2.component';

describe('Automata2Component', () => {
  let component: Automata2Component;
  let fixture: ComponentFixture<Automata2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Automata2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
