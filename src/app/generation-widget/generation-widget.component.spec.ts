import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationWidgetComponent } from './generation-widget.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GenerationWidgetComponent', () => {
  let component: GenerationWidgetComponent;
  let fixture: ComponentFixture<GenerationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GenerationWidgetComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationWidgetComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
