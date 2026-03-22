import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GliderComponent } from './glider.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GliderComponent', () => {
  let component: GliderComponent;
  let fixture: ComponentFixture<GliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GliderComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GliderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
