import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidComponent } from './void.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VoidComponent', () => {
  let component: VoidComponent;
  let fixture: ComponentFixture<VoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [VoidComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
