import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperMinecraftViewComponent } from './wrapper-minecraft-view.component';

describe('WrapperMinecraftViewComponent', () => {
  let component: WrapperMinecraftViewComponent;
  let fixture: ComponentFixture<WrapperMinecraftViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperMinecraftViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperMinecraftViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
