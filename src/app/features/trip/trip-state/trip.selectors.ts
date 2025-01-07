import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TripState } from './trip.reducer';

export const selectTripState = createFeatureSelector<TripState>('trip');

export const selectTripPlaces = createSelector(
  selectTripState,
  (state: TripState) => state.places
);
