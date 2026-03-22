import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesComponent } from './arboles.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArbolesComponent', () => {
  let component: ArbolesComponent;
  let fixture: ComponentFixture<ArbolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ArbolesComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
