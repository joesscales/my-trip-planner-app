import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular'; // Import IonicModule if using Ionic components
import { TripComponent } from './trip.component';
import { AppState } from '../app.interface';
import { tripReducer } from '../trip-state/trip.reducer';
import { selectTripPlaces } from '../trip-state/trip.selectors';
import { IPlaceWithId } from '../models/place.model';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock data for the selector
const mockPlaces: IPlaceWithId[] = [
  { id: '1', data: { name: 'Place 1', description: 'Description 1', isInTrip: true } }
];

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    trip: {
      places: [] // Provide initial state for the trip slice
    }
  };

  const activatedRouteStub = {
    paramMap: of({
      get: (param: string) => 'mockValue' // provide mock values for route parameters
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), // Import IonicModule
        StoreModule.forRoot({ trip: tripReducer }), // Ensure the reducer is registered,
        TripComponent
      ],
      providers: [
        provideMockStore({ initialState }), // Provide a mock store with initial state,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
     // declarations: [TripComponent]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    store.overrideSelector(selectTripPlaces, mockPlaces); // Mock the selector

    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display places in the app-places-list component', () => {
    // Trigger change detection to ensure ngIf updates
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const placesList = compiled.querySelector('app-places-list');

    expect(placesList).toBeTruthy();
   
  });
});
