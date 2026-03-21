import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParabolaComponent } from './parabola.component';

describe('ParabolaComponent', () => {
  let component: ParabolaComponent;
  let fixture: ComponentFixture<ParabolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParabolaComponent ]
    ,
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParabolaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
