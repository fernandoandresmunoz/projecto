import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata3Component } from './automata3.component';

describe('Automata3Component', () => {
  let component: Automata3Component;
  let fixture: ComponentFixture<Automata3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Automata3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
