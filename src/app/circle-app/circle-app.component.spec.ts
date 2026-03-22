import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAppComponent } from './circle-app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CircleAppComponent', () => {
  let component: CircleAppComponent;
  let fixture: ComponentFixture<CircleAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CircleAppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleAppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
