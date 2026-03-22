import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParabolaComponent } from './parabola.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ParabolaComponent', () => {
  let component: ParabolaComponent;
  let fixture: ComponentFixture<ParabolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ParabolaComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParabolaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
