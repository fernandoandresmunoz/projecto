import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilaConcreta } from './fila-concreta';

describe('FilaConcreta', () => {
  it('should create an instance', () => {
    expect(new FilaConcreta()).toBeTruthy();
  });
});
