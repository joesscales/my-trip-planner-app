export interface IPlace {
    name: string,
    description: string,
    isInTrip?: boolean,
}

export interface IPlaceWithId {
    id: string,
    data: IPlace
}