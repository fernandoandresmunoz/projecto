import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNodoComponent } from './detalle-nodo.component';

describe('DetalleNodoComponent', () => {
  let component: DetalleNodoComponent;
  let fixture: ComponentFixture<DetalleNodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
