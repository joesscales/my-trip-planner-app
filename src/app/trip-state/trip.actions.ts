import { createAction, props } from '@ngrx/store';
import { IPlaceWithId } from '../models/place.model';

export const addToTrip = createAction(
  '[Trip] Add To Trip',
  props<{ place: IPlaceWithId }>()
);

export const removeFromTrip = createAction(
  '[Trip] Remove From Trip',
  props<{ place: IPlaceWithId }>()
);

export const updateTripOrder = createAction(
  '[Trip] Update Trip Order',
  props<{ places: IPlaceWithId[] }>()
) 