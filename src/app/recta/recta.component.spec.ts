import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectaComponent } from './recta.component';

describe('RectaComponent', () => {
  let component: RectaComponent;
  let fixture: ComponentFixture<RectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
