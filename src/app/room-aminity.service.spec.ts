import { TestBed } from '@angular/core/testing';

import { RoomAminityService } from './room-aminity.service';

describe('RoomAminityService', () => {
  let service: RoomAminityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAminityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
