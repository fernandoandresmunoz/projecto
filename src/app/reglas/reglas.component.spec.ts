import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglasComponent } from './reglas.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReglasComponent', () => {
  let component: ReglasComponent;
  let fixture: ComponentFixture<ReglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ReglasComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglasComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
