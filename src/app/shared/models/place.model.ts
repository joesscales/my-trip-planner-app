export interface IPlace {
    name: string,
    description: string,
    dateAdded: number,
    tags: PlaceTag[],
    locationEmbed: string,
    isInTrip?: boolean,
}

export interface IPlaceWithId {
    id: string,
    data: IPlace
}

export type PlaceTag = 'pub' | 'restaurant' | 'cafe' | 'activity' | 'attraction';

export const tagList: PlaceTag[] = ['pub', 'restaurant', 'cafe', 'activity', 'attraction'];

export interface IFilterTag {
    name: PlaceTag,
    disabled: boolean,
    selected: boolean,
}


