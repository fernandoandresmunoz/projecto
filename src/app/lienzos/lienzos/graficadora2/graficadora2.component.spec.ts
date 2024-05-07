import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficadora2Component } from './graficadora2.component';

describe('Graficadora2Component', () => {
  let component: Graficadora2Component;
  let fixture: ComponentFixture<Graficadora2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graficadora2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Graficadora2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
