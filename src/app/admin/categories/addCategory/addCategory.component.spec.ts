/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCatgeoryComponent } from './addCategory.component';

describe('AddCatgeoryComponent', () => {
  let component: AddCatgeoryComponent;
  let fixture: ComponentFixture<AddCatgeoryComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AddCatgeoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatgeoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
