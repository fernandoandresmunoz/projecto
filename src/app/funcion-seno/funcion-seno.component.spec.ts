import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionSenoComponent } from './funcion-seno.component';

describe('FuncionSenoComponent', () => {
  let component: FuncionSenoComponent;
  let fixture: ComponentFixture<FuncionSenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionSenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionSenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
