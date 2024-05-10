import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorFilaComponent } from './controlador-fila.component';

describe('ControladorFilaComponent', () => {
  let component: ControladorFilaComponent;
  let fixture: ComponentFixture<ControladorFilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControladorFilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorFilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
