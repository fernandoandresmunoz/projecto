import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponencialesComponent } from './exponenciales.component';

describe('ExponencialesComponent', () => {
  let component: ExponencialesComponent;
  let fixture: ComponentFixture<ExponencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExponencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExponencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
