import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficadora2Component } from './graficadora2.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Graficadora2Component', () => {
  let component: Graficadora2Component;
  let fixture: ComponentFixture<Graficadora2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Graficadora2Component],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Graficadora2Component);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
