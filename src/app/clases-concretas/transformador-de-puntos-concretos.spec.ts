import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransformadorDePuntosConcretos } from './transformador-de-puntos-concretos';

describe('TransformadorDePuntosConcretos', () => {
  it('should create an instance', () => {
    expect(new TransformadorDePuntosConcretos(0, 0, 0, 0)).toBeTruthy();
  });
});
