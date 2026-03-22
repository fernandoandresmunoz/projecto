import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionCuadraticaComponent } from './funcion-cuadratica.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FuncionCuadraticaComponent', () => {
  let component: FuncionCuadraticaComponent;
  let fixture: ComponentFixture<FuncionCuadraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FuncionCuadraticaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionCuadraticaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
