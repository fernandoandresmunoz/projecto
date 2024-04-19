import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionPolinomicaComponent } from './funcion-polinomica.component';

describe('FuncionPolinomicaComponent', () => {
  let component: FuncionPolinomicaComponent;
  let fixture: ComponentFixture<FuncionPolinomicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionPolinomicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionPolinomicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
