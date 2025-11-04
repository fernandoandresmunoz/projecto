import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPreviewComponent } from './matriz-preview.component';

describe('MatrizPreviewComponent', () => {
  let component: MatrizPreviewComponent;
  let fixture: ComponentFixture<MatrizPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
