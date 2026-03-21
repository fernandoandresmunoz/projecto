import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata3Component } from './automata3.component';

describe('Automata3Component', () => {
  let component: Automata3Component;
  let fixture: ComponentFixture<Automata3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Automata3Component ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata3Component);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
