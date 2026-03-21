import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorFilaComponent } from './controlador-fila.component';

describe('ControladorFilaComponent', () => {
  let component: ControladorFilaComponent;
  let fixture: ComponentFixture<ControladorFilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControladorFilaComponent ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorFilaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
