import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLinesAppComponent } from './two-lines-app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TwoLinesAppComponent', () => {
  let component: TwoLinesAppComponent;
  let fixture: ComponentFixture<TwoLinesAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TwoLinesAppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoLinesAppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
