import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperMinecraftViewComponent } from './wrapper-minecraft-view.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WrapperMinecraftViewComponent', () => {
  let component: WrapperMinecraftViewComponent;
  let fixture: ComponentFixture<WrapperMinecraftViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [WrapperMinecraftViewComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperMinecraftViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
