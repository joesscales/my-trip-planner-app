import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TripService } from './trip.service';
import { AppState } from '../app.interface';
import { addToTrip, removeFromTrip, updateTripOrder } from '../trip-state/trip.actions';
import { IPlaceWithId } from '../models/place.model';
import { selectTripPlaces } from '../trip-state/trip.selectors';

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

  it('should sync the signal with the NgRx store', () => {
    const mockPlaces: IPlaceWithId[] = [
      { id: '1', data: { name: 'Place 1', description: 'Description 1', isInTrip: true } }
    ];

    // Update the selector to return mock data
    store.overrideSelector(selectTripPlaces, mockPlaces);

    // Trigger the store update
    store.refreshState();

    // Check that the signal value matches the mock data
    expect(service.tripSignal()).toEqual(mockPlaces);
  });

  it('should dispatch addToTrip action', () => {
    const place: IPlaceWithId = { id: '1', data: { name: 'Place 1', description: 'Description 1' } };
    const spy = spyOn(store, 'dispatch');

    service.addPlace(place);

    expect(spy).toHaveBeenCalledWith(addToTrip({ place }));
  });

  it('should dispatch removeFromTrip action', () => {
    const place: IPlaceWithId = { id: '1', data: { name: 'Place 1', description: 'Description 1' } };
    const spy = spyOn(store, 'dispatch');

    service.removePlace(place);

    expect(spy).toHaveBeenCalledWith(removeFromTrip({ place }));
  });

  it('should dispatch updateTripOrder action', () => {
    const places: IPlaceWithId[] = [
      { id: '1', data: { name: 'Place 1', description: 'Description 1' } }
    ];
    const spy = spyOn(store, 'dispatch');

    service.updateOrder(places);

    expect(spy).toHaveBeenCalledWith(updateTripOrder({ places }));
  });
});
