import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoComponent } from './nodo.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NodoComponent', () => {
  let component: NodoComponent;
  let fixture: ComponentFixture<NodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NodoComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
