import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLinesAppComponent } from './two-lines-app.component';

describe('TwoLinesAppComponent', () => {
  let component: TwoLinesAppComponent;
  let fixture: ComponentFixture<TwoLinesAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLinesAppComponent ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoLinesAppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
