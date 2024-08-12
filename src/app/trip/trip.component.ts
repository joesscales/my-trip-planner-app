import { Component, OnInit, Signal } from '@angular/core';
import { IPlaceWithId } from '../models/place.model';
import { Observable } from 'rxjs';
import { TripService } from '../services/trip.service';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  imports: [PlacesListComponent, IonicModule, CommonModule],
  standalone: true,
})
export class TripComponent  implements OnInit {


  myTripSignal: Signal<IPlaceWithId[]>;

  constructor(private tripService: TripService) {
  }

  getTrip() {
    this.myTripSignal = this.tripService.tripSignal;
  }

  ngOnInit() {
    this.getTrip();
  }

}

