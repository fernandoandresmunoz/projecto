import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLinesAppComponent } from './two-lines-app.component';

describe('TwoLinesAppComponent', () => {
  let component: TwoLinesAppComponent;
  let fixture: ComponentFixture<TwoLinesAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLinesAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoLinesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
