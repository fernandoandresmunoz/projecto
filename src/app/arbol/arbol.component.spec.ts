import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolComponent } from './arbol.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArbolComponent', () => {
  let component: ArbolComponent;
  let fixture: ComponentFixture<ArbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ArbolComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
