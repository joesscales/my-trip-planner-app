export interface ITrip {
    title: string,
    description: string,
    tripPlaces: string[], 
}

export interface ITripWithId {
    id: string,
    data: ITrip
}