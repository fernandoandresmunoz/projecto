import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMatrizComponent } from './detalle-matriz.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DetalleMatrizComponent', () => {
  let component: DetalleMatrizComponent;
  let fixture: ComponentFixture<DetalleMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DetalleMatrizComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMatrizComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
