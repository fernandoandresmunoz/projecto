import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionExponencialComponent } from './funcion-exponencial.component';

describe('FuncionExponencialComponent', () => {
  let component: FuncionExponencialComponent;
  let fixture: ComponentFixture<FuncionExponencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionExponencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionExponencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
