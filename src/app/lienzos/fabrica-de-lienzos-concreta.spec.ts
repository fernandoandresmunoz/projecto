import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FabricaDeLienzosConcreta } from './fabrica-de-lienzos-concreta';

describe('FabricaDeLienzosConcreta', () => {
  it('should create an instance', () => {
    expect(new FabricaDeLienzosConcreta()).toBeTruthy();
  });
});
