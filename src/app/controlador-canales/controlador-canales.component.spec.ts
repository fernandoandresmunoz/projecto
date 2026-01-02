import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorCanalesComponent } from './controlador-canales.component';

describe('ControladorCanalesComponent', () => {
  let component: ControladorCanalesComponent;
  let fixture: ComponentFixture<ControladorCanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControladorCanalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorCanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
