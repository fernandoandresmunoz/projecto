import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolViewComponent } from './arbol-view.component';

describe('ArbolViewComponent', () => {
  let component: ArbolViewComponent;
  let fixture: ComponentFixture<ArbolViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
