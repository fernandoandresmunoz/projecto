import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LienzosService } from './../app/graficos.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GraficosService', () => {
  let service: LienzosService;

  beforeEach(() => {
    TestBed.configureTestingModule({ schemas: [NO_ERRORS_SCHEMA], imports: [RouterTestingModule], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(LienzosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
