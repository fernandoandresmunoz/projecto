import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienzosComponent } from './lienzos.component';

describe('LienzosComponent', () => {
  let component: LienzosComponent;
  let fixture: ComponentFixture<LienzosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LienzosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienzosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
