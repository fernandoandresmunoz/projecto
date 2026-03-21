import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LienzosService } from './../app/graficos.service';

describe('GraficosService', () => {
  let service: LienzosService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule, RouterTestingModule], schemas: [NO_ERRORS_SCHEMA] });
    service = TestBed.inject(LienzosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
