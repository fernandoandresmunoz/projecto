import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatasComponent } from './automatas.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AutomatasComponent', () => {
  let component: AutomatasComponent;
  let fixture: ComponentFixture<AutomatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AutomatasComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatasComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
