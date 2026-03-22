import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNodoComponent } from './tabla-nodo.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TablaNodoComponent', () => {
  let component: TablaNodoComponent;
  let fixture: ComponentFixture<TablaNodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TablaNodoComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaNodoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
