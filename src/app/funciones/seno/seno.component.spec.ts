import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenoComponent } from './seno.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SenoComponent', () => {
  let component: SenoComponent;
  let fixture: ComponentFixture<SenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SenoComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
