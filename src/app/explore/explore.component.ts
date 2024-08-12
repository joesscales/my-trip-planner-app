import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IPlaceWithId } from '../models/place.model';
import { PlacesService } from '../services/places.service';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  imports: [IonicModule, PlacesListComponent, CommonModule],
  standalone: true,
})
export class ExploreComponent  implements OnInit, OnDestroy {


  public placesList: IPlaceWithId[];
  public filteredList: IPlaceWithId[];
  public placesSub: Subscription

  constructor(
    private placesService: PlacesService
  ) { }


  search(event: CustomEvent) {
    const searchTerm = (event.target as HTMLIonSearchbarElement).value?.toLowerCase() || '';

    this.filteredList = this.placesList.filter(place =>
      place.data.name.toLowerCase().includes(searchTerm) ||
      place.data.description?.toLowerCase().includes(searchTerm)
    );

  }


  async getAllData() {
    this.placesSub = this.placesService.getCollectionData().subscribe(data => {
      if (data) {
        this.placesList = data;
        this.filteredList = data;
      }
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }
  ngOnDestroy() {
    this.placesSub.unsubscribe();
  }
}
