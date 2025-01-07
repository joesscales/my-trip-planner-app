import { Action, createReducer, on } from '@ngrx/store';
import { addToTrip, removeFromTrip, updateTripOrder } from './trip.actions';
import {  IPlaceWithId } from '../../../shared/models/place.model';

export interface TripState {
  places: IPlaceWithId[];
}

export const initialState: TripState = {
  places: []
};

const _tripReducer = createReducer(
  initialState,
  on(addToTrip, (state, { place }) => {

    // Check if place is in the trip
    const placeExists = state.places.some(p => p.id === place.id);

    if (placeExists) {
      return state;
    } else {
      // If the place is not in the trip then add it
      return {
        ...state,
        places: [...state.places, place]
      };
    }
  }),
  on(removeFromTrip, (state, { place }) => ({
    ...state,
    places: state.places.filter(p => p.id !== place.id)
  })),
  on(updateTripOrder, (state, { places }) => (
    {
    ...state,
    places,
  }))
);

export function tripReducer(state: TripState | undefined, action: Action) {
  return _tripReducer(state, action);
}
