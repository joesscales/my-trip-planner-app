import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';
import { provideMockStore } from '@ngrx/store/testing';
import { TripService } from '../../../features/trip/trip.service';

describe('HeaderService', () => {
  let service: HeaderService;
  const initialState = { trip: { places: [] } };  // Example initial state

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        TripService, // Provide the TripService
        provideMockStore({initialState}) // Provide a mock store to satisfy dependencies
      ]
    });
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
