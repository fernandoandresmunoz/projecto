import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPreviewComponent } from './matriz-preview.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrizPreviewComponent', () => {
  let component: MatrizPreviewComponent;
  let fixture: ComponentFixture<MatrizPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MatrizPreviewComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizPreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
