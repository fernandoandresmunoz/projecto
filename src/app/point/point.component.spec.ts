import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointComponent } from './point.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PointComponent', () => {
  let component: PointComponent;
  let fixture: ComponentFixture<PointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PointComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
