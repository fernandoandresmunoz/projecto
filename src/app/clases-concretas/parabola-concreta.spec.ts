import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/common/http/testing';
import { ParabolaConcreta } from './parabola-concreta';

describe('ParabolaConcreta', () => {
  it('should create an instance', () => {
    expect(new ParabolaConcreta("CUADRATICA", (x: number) => x * x)).toBeTruthy();
  });
});
