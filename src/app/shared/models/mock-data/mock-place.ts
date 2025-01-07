import { IPlace, IPlaceWithId, PlaceTag } from '../place.model';

export const mockTags: PlaceTag[] = ['pub', 'restaurant'];


export const mockPlace: IPlace = {
  name: 'place 1',
  description: 'this is place 1',
  dateAdded: Number(Date.now()),
  tags: mockTags,
  locationEmbed: '',
  isInTrip: false,
};


export const mockPlaceWithId: IPlaceWithId = {
  id: 'id',
  data: mockPlace,
};

export const mockPlacesWithIds = [mockPlaceWithId , mockPlaceWithId];
