import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvolutionComponent } from './convolution.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ConvolutionComponent', () => {
  let component: ConvolutionComponent;
  let fixture: ComponentFixture<ConvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ConvolutionComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvolutionComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
