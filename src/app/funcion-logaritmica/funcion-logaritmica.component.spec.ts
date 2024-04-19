import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionLogaritmicaComponent } from './funcion-logaritmica.component';

describe('FuncionLogaritmicaComponent', () => {
  let component: FuncionLogaritmicaComponent;
  let fixture: ComponentFixture<FuncionLogaritmicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionLogaritmicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionLogaritmicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
