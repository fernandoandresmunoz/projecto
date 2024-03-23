import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseResetComponent } from './pause-reset.component';

describe('PauseResetComponent', () => {
  let component: PauseResetComponent;
  let fixture: ComponentFixture<PauseResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
