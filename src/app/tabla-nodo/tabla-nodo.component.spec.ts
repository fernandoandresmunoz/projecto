import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNodoComponent } from './tabla-nodo.component';

describe('TablaNodoComponent', () => {
  let component: TablaNodoComponent;
  let fixture: ComponentFixture<TablaNodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaNodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaNodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
