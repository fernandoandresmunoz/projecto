import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvasComponent } from './curvas.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CurvasComponent', () => {
  let component: CurvasComponent;
  let fixture: ComponentFixture<CurvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CurvasComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvasComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
