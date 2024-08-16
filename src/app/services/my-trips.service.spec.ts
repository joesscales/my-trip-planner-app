import { TestBed } from '@angular/core/testing';

import { MyTripsService } from './my-trips.service';

describe('MyTripsService', () => {
  let service: MyTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
