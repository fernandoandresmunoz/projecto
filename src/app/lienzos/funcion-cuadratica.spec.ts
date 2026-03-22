import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/common/http/testing';
import { FuncionCuadratica } from './funcion-cuadratica';

describe('FuncionCuadratica', () => {
  it('should create an instance', () => {
    expect(new FuncionCuadratica((x: number) => x * x)).toBeTruthy();
  });
});
