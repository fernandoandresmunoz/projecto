import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMatrizComponent } from './detalle-matriz.component';

describe('DetalleMatrizComponent', () => {
  let component: DetalleMatrizComponent;
  let fixture: ComponentFixture<DetalleMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMatrizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
