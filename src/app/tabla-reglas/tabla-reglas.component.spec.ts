import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReglasComponent } from './tabla-reglas.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TablaReglasComponent', () => {
  let component: TablaReglasComponent;
  let fixture: ComponentFixture<TablaReglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TablaReglasComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReglasComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
