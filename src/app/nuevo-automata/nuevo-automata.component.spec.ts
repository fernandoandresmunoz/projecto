import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAutomataComponent } from './nuevo-automata.component';

describe('NuevoAutomataComponent', () => {
  let component: NuevoAutomataComponent;
  let fixture: ComponentFixture<NuevoAutomataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAutomataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAutomataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
