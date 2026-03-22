import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaComponent } from './prueba.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PruebaComponent', () => {
  let component: PruebaComponent;
  let fixture: ComponentFixture<PruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PruebaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
