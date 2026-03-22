import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/common/http/testing';
import { DerivadaConcreta } from './derivada-concreta';

describe('DerivadaConcreta', () => {
  it('should create an instance', () => {
    expect(new DerivadaConcreta(0, 'gray')).toBeTruthy();
  });
});
