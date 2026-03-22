import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GeometryService } from './geometry.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GeometryService', () => {
  let service: GeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ schemas: [NO_ERRORS_SCHEMA], imports: [RouterTestingModule], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(GeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
