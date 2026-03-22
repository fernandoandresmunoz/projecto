import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectaComponent } from './recta.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RectaComponent', () => {
  let component: RectaComponent;
  let fixture: ComponentFixture<RectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RectaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
