import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automata2Component } from './automata2.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Automata2Component', () => {
  let component: Automata2Component;
  let fixture: ComponentFixture<Automata2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Automata2Component],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Automata2Component);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
