import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAutomataComponent } from './graficas-automata.component';

describe('GraficasAutomataComponent', () => {
  let component: GraficasAutomataComponent;
  let fixture: ComponentFixture<GraficasAutomataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasAutomataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasAutomataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
