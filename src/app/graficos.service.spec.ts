import { TestBed } from '@angular/core/testing';

import { LienzosService } from './../app/graficos.service';

describe('GraficosService', () => {
  let service: LienzosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienzosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
