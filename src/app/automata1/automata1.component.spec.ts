import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata1Component } from './automata1.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Automata1Component', () => {
  let component: Automata1Component;
  let fixture: ComponentFixture<Automata1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Automata1Component],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata1Component);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
