import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeLienzosComponent } from './lista-de-lienzos.component';

describe('ListaDeLienzosComponent', () => {
  let component: ListaDeLienzosComponent;
  let fixture: ComponentFixture<ListaDeLienzosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeLienzosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeLienzosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
