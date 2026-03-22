import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionLogaritmicaComponent } from './funcion-logaritmica.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FuncionLogaritmicaComponent', () => {
  let component: FuncionLogaritmicaComponent;
  let fixture: ComponentFixture<FuncionLogaritmicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FuncionLogaritmicaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionLogaritmicaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
