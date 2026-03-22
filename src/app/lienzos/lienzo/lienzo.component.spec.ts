import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienzoComponent } from './lienzo.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LienzoComponent', () => {
  let component: LienzoComponent;
  let fixture: ComponentFixture<LienzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LienzoComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienzoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
