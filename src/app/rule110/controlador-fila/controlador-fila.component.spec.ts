import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorFilaComponent } from './controlador-fila.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControladorFilaComponent', () => {
  let component: ControladorFilaComponent;
  let fixture: ComponentFixture<ControladorFilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ControladorFilaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorFilaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
