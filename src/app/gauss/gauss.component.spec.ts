import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussComponent } from './gauss.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GaussComponent', () => {
  let component: GaussComponent;
  let fixture: ComponentFixture<GaussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GaussComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
