import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedViewComponent } from './red-view.component';

describe('RedViewComponent', () => {
  let component: RedViewComponent;
  let fixture: ComponentFixture<RedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
