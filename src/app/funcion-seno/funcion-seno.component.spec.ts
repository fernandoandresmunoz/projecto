import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionSenoComponent } from './funcion-seno.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FuncionSenoComponent', () => {
  let component: FuncionSenoComponent;
  let fixture: ComponentFixture<FuncionSenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FuncionSenoComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionSenoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
