import { TestBed, inject } from '@angular/core/testing';
import { LobbyService } from './lobby.service';

describe('LobbyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobbyService]
    });
  });

  it('should ...', inject([LobbyService], (service: LobbyService) => {
    expect(service).toBeTruthy();
  }));
});
