import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorCanalesComponent } from './controlador-canales.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControladorCanalesComponent', () => {
  let component: ControladorCanalesComponent;
  let fixture: ComponentFixture<ControladorCanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ControladorCanalesComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorCanalesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
