import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficadora2Component } from './graficadora2.component';

describe('Graficadora2Component', () => {
  let component: Graficadora2Component;
  let fixture: ComponentFixture<Graficadora2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graficadora2Component ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Graficadora2Component);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
