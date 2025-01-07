import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TripService } from './trip.service';
import { AppState } from '../../app.interface';
import { addToTrip, removeFromTrip, updateTripOrder } from './trip-state/trip.actions';
import { IPlaceWithId } from '../../shared/models/place.model';
import { selectTripPlaces } from './trip-state/trip.selectors';
import { mockPlacesWithIds, mockPlaceWithId } from 'src/app/shared/models/mock-data/mock-place';

describe('TripService', () => {
  let service: TripService;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    trip: {
      places: []  // Provide initial state for the trip slice
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],  // Import StoreModule
      providers: [
        provideMockStore({ initialState }),  // Provide mock store
        TripService
      ]
    });

    store = TestBed.inject(Store) as MockStore<AppState>;
    service = TestBed.inject(TripService);

    // Mock the selector to return an observable
    store.overrideSelector(selectTripPlaces, []);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should sync the signal with the NgRx store', () => {
    

    // Update the selector to return mock data
    store.overrideSelector(selectTripPlaces, mockPlacesWithIds);

    // Trigger the store update
    store.refreshState();

    // Check that the signal value matches the mock data
    expect(service.tripSignal()).toEqual(mockPlacesWithIds);
  });*/



  it('should dispatch removeFromTrip action', () => {
    const place = mockPlaceWithId;
    const spy = spyOn(store, 'dispatch');

    service.removePlace(place);

    expect(spy).toHaveBeenCalledWith(removeFromTrip({ place }));
  });

  it('should dispatch updateTripOrder action', () => {
    const places = mockPlacesWithIds;
    const spy = spyOn(store, 'dispatch');

    service.updateOrder(places);

    expect(spy).toHaveBeenCalledWith(updateTripOrder({ places }));
  });
});
