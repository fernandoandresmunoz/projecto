import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricesComponent } from './matrices.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatricesComponent', () => {
  let component: MatricesComponent;
  let fixture: ComponentFixture<MatricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MatricesComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
