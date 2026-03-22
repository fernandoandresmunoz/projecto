import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedViewComponent } from './red-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RedViewComponent', () => {
  let component: RedViewComponent;
  let fixture: ComponentFixture<RedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RedViewComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
