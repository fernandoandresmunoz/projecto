import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaDeLienzosConcreta } from './lista-de-lienzos-concreta';

describe('ListaDeLienzosConcreta', () => {
  it('should create an instance', () => {
    expect(new ListaDeLienzosConcreta()).toBeTruthy();
  });
});
