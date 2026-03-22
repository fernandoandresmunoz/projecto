import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponencialesComponent } from './exponenciales.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ExponencialesComponent', () => {
  let component: ExponencialesComponent;
  let fixture: ComponentFixture<ExponencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ExponencialesComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExponencialesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
