import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReglasComponent } from './tabla-reglas.component';

describe('TablaReglasComponent', () => {
  let component: TablaReglasComponent;
  let fixture: ComponentFixture<TablaReglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReglasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
