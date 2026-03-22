import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorUmbralesComponent } from './controlador-umbrales.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControladorUmbralesComponent', () => {
  let component: ControladorUmbralesComponent;
  let fixture: ComponentFixture<ControladorUmbralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ControladorUmbralesComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorUmbralesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
