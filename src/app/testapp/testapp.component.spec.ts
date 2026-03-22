import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestappComponent } from './testapp.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TestappComponent', () => {
  let component: TestappComponent;
  let fixture: ComponentFixture<TestappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TestappComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestappComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
