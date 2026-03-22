import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomataComponent } from './automata.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AutomataComponent', () => {
  let component: AutomataComponent;
  let fixture: ComponentFixture<AutomataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AutomataComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomataComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
