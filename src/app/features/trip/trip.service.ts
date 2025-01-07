import { Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToTrip, removeFromTrip, updateTripOrder } from './trip-state/trip.actions';
import { Observable } from 'rxjs';
import { selectTripPlaces } from './trip-state/trip.selectors';
import { IPlaceWithId } from '../../shared/models/place.model';
import { AppState } from '../../app.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private _tripSignal = signal<IPlaceWithId[]>([]);

  constructor(private store: Store<AppState>) {
    this.store.select(selectTripPlaces).subscribe(trip => this._tripSignal.set(trip)); // Sync signal with NgRx store

  }

  get tripSignal(): Signal<IPlaceWithId[]> {
    return this._tripSignal;
  }


  addPlace(place: IPlaceWithId) {
    this.store.dispatch(addToTrip({ place }));
  }

  removePlace(place: IPlaceWithId) {
    this.store.dispatch(removeFromTrip({ place }));
  }

  updateOrder(places: IPlaceWithId[]) {
    this.store.dispatch(updateTripOrder (  { places } ));
  }
}
