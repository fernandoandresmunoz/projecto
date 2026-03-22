import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizHojaComponent } from './matriz-hoja.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrizHojaComponent', () => {
  let component: MatrizHojaComponent;
  let fixture: ComponentFixture<MatrizHojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MatrizHojaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizHojaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
