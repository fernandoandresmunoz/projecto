import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionCuadraticaComponent } from './funcion-cuadratica.component';

describe('FuncionCuadraticaComponent', () => {
  let component: FuncionCuadraticaComponent;
  let fixture: ComponentFixture<FuncionCuadraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionCuadraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionCuadraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
