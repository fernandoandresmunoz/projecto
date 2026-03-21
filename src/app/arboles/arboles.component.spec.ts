import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesComponent } from './arboles.component';

describe('ArbolesComponent', () => {
  let component: ArbolesComponent;
  let fixture: ComponentFixture<ArbolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolesComponent ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
