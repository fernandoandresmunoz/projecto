import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomataControllerComponent } from './automata-controller.component';

describe('AutomataControllerComponent', () => {
  let component: AutomataControllerComponent;
  let fixture: ComponentFixture<AutomataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomataControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
