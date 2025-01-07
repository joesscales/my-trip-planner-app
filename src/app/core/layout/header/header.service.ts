import { effect, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripService } from '../../../features/trip/trip.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private tripService: TripService,) {
    effect(() => {
      const trip = this.tripService.tripSignal();
      this.placeCountSubject.next(trip.length);
    });
  }

  private placeCountSubject = new BehaviorSubject<number>(0);

  placeCount$ = this.placeCountSubject.asObservable();


  updatePlaceCount(count: number) {
    this.placeCountSubject.next(count);
  }

}
