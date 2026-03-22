import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolViewComponent } from './arbol-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArbolViewComponent', () => {
  let component: ArbolViewComponent;
  let fixture: ComponentFixture<ArbolViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ArbolViewComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
