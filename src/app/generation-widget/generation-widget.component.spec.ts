import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationWidgetComponent } from './generation-widget.component';

describe('GenerationWidgetComponent', () => {
  let component: GenerationWidgetComponent;
  let fixture: ComponentFixture<GenerationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
