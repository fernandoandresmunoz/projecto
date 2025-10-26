import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienzoDetailComponent } from './lienzo-detail.component';

describe('LienzoDetailComponent', () => {
  let component: LienzoDetailComponent;
  let fixture: ComponentFixture<LienzoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LienzoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienzoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
