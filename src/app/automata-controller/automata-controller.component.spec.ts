import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomataControllerComponent } from './automata-controller.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AutomataControllerComponent', () => {
  let component: AutomataControllerComponent;
  let fixture: ComponentFixture<AutomataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AutomataControllerComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomataControllerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
