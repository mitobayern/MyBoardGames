/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditBoardgameComponent } from './edit-boardgame.component';

describe('EditBoardgameComponent', () => {
  let component: EditBoardgameComponent;
  let fixture: ComponentFixture<EditBoardgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoardgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoardgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
