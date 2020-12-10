/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardgameVideoTutorialComponent } from './boardgame-video-tutorial.component';

describe('BoardgameVideoTutorialComponent', () => {
  let component: BoardgameVideoTutorialComponent;
  let fixture: ComponentFixture<BoardgameVideoTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameVideoTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameVideoTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
