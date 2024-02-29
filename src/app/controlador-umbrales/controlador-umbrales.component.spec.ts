import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorUmbralesComponent } from './controlador-umbrales.component';

describe('ControladorUmbralesComponent', () => {
  let component: ControladorUmbralesComponent;
  let fixture: ComponentFixture<ControladorUmbralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControladorUmbralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorUmbralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
