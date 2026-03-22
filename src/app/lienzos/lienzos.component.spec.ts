import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienzosComponent } from './lienzos.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LienzosComponent', () => {
  let component: LienzosComponent;
  let fixture: ComponentFixture<LienzosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LienzosComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienzosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
