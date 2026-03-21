import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAutomataComponent } from './graficas-automata.component';

describe('GraficasAutomataComponent', () => {
  let component: GraficasAutomataComponent;
  let fixture: ComponentFixture<GraficasAutomataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasAutomataComponent ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasAutomataComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
