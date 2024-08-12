import { Component, effect, Input, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { IPlaceWithId } from 'src/app/models/place.model';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss'],
  imports: [IonicModule, PlaceCardComponent, ScrollingModule, CommonModule ],
  standalone: true,

})
export class PlacesListComponent  implements OnInit, OnChanges {

  constructor(
    private tripService: TripService
  ) {
    effect(() => {
      this.trip = this.tripService.tripSignal();
      // Only on other pages as any changes to this will be handled in onChanges on the trip page, due to the places being the trip signal. 
      if (!this.onTripPage) {
        this.updatePlaces();
      }
    });
   }

  public tripSub: Subscription;
  public trip: IPlaceWithId[];
  public isReorder: boolean = false;

  @Input() places: IPlaceWithId[];
  @Input() onTripPage: boolean;

  toggleChange(event: CustomEvent) {
    this.isReorder = event.detail.checked;
  }

  doReorder(event: any) {
  
    // Create a shallow copy of the array to avoid modifying the original array directly
    const placesCopy = [...this.places];
  
    // Remove the item from the original position
    const itemMove = placesCopy.splice(event.detail.from, 1)[0];
  
    // Insert the item at the new position
    placesCopy.splice(event.detail.to, 0, itemMove);
  
    // Update the places array with the reordered copy
    this.places = placesCopy;
  
    // Complete the reorder event
    event.detail.complete();
  
    // Update the order in the service
    this.tripService.updateOrder(this.places);
  }

  


  updatePlaces(){
    if (this.places) {
      this.places = this.places.map(place => {
        let isInTrip = false;
        if (this.trip) {
          isInTrip = this.trip.some(p => p.id === place.id);
        }
        if (place && place.data) {
          // Clone the place object to ensure mutability
          const updatedPlace = {
            ...place,
            data: {
              ...place.data,
              isInTrip,
            }
          };
          return updatedPlace;
        }
        return place;
      });
    }
   }




  ngOnInit() {
      //this.getTrip();
  }
  

   ngOnChanges(changes: SimpleChanges): void {
    // Only needed as when updating the trip in another page, the effect wont work as the this.places won't be in view yet so it will have none to .some in updatePlaces.
    if (changes.places &&  !this.isReorder && this.onTripPage) { 
        this.updatePlaces();
    }
  } 

  /* getTrip() {
    this.tripSub = this.tripService.myTrip$.subscribe((trip: IPlaceWithId[]) => {
      if (trip) {
        this.trip = trip;
        this.updatePlaces();
      }
    });
  } */

}
