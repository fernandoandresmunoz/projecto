import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizHojaComponent } from './matriz-hoja.component';

describe('MatrizHojaComponent', () => {
  let component: MatrizHojaComponent;
  let fixture: ComponentFixture<MatrizHojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizHojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizHojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
