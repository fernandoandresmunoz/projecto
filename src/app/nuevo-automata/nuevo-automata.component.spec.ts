import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAutomataComponent } from './nuevo-automata.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NuevoAutomataComponent', () => {
  let component: NuevoAutomataComponent;
  let fixture: ComponentFixture<NuevoAutomataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NuevoAutomataComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAutomataComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
