import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasControllerComponent } from './canvas-controller.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CanvasControllerComponent', () => {
  let component: CanvasControllerComponent;
  let fixture: ComponentFixture<CanvasControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CanvasControllerComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasControllerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
