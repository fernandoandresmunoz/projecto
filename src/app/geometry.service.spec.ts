import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GeometryService } from './geometry.service';

describe('GeometryService', () => {
  let service: GeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule, RouterTestingModule], schemas: [NO_ERRORS_SCHEMA] });
    service = TestBed.inject(GeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
