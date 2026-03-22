import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/common/http/testing';
import { GliderCreationStrategy } from './glider-creation-strategy';

describe('GliderCreationStrategy', () => {
  it('should create an instance', () => {
    expect(new GliderCreationStrategy()).toBeTruthy();
  });
});
