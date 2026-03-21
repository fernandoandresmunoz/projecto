import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IntegralConcreta } from "./integral-concreta";

describe('IntegralConcreta', () => {
  it('should create an instance', () => {
    expect(new IntegralConcreta(0, 0)).toBeTruthy();
  });
});
