import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata1Component } from './automata1.component';

describe('Automata1Component', () => {
  let component: Automata1Component;
  let fixture: ComponentFixture<Automata1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Automata1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
