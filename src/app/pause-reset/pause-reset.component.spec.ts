import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseResetComponent } from './pause-reset.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PauseResetComponent', () => {
  let component: PauseResetComponent;
  let fixture: ComponentFixture<PauseResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PauseResetComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseResetComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
