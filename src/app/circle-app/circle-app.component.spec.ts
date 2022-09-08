import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAppComponent } from './circle-app.component';

describe('CircleAppComponent', () => {
  let component: CircleAppComponent;
  let fixture: ComponentFixture<CircleAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
