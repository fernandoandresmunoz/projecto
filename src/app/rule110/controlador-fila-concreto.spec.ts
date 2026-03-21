import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControladorFilaConcreto } from './controlador-fila-concreto';

describe('ControladorFilaConcreto', () => {
  it('should create an instance', () => {
    expect(new ControladorFilaConcreto()).toBeTruthy();
  });
});
