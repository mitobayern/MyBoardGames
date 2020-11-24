/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoardGamesService } from './boardGames.service';

describe('Service: BoardGames', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardGamesService]
    });
  });

  it('should ...', inject([BoardGamesService], (service: BoardGamesService) => {
    expect(service).toBeTruthy();
  }));
});
