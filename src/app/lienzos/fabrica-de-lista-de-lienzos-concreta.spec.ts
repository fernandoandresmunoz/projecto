import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FabricaDeListaDeLienzosConcreta } from './fabrica-de-lista-de-lienzos-concreta';

describe('FabricaDeListaDeLienzosConcreta', () => {
  it('should create an instance', () => {
    expect(new FabricaDeListaDeLienzosConcreta()).toBeTruthy();
  });
});
