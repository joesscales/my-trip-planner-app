import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IFilterTag, IPlaceWithId, PlaceTag, tagList } from '../models/place.model';
import { PlacesService } from '../services/places.service';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  imports: [IonicModule, PlacesListComponent, CommonModule, HeaderComponent],
  standalone: true,
})
export class ExploreComponent implements OnInit, OnDestroy {
  public placesList: IPlaceWithId[] = [];
  public filteredList: IPlaceWithId[] = [];
  public placesSub: Subscription;
  public displayFilterTags: IFilterTag[] = [];
  public searchTerm: string = '';
  public loadedData = false;

  constructor(private placesService: PlacesService, 
  ) {}

  ngOnInit(): void {

    this.getAllData();
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  search(event?: CustomEvent): void {
    if (event) {
      this.searchTerm = (event.target as HTMLIonSearchbarElement).value?.toLowerCase() || '';
    }
    this.filteredList = this.placesList.filter(place =>
      !this.searchTerm ||
      place.data.name.toLowerCase().includes(this.searchTerm) ||
      place.data.description?.toLowerCase().includes(this.searchTerm)
    );

    this.sortTags();
  }

  selectTag(tag: IFilterTag): void {
    tag.selected = !tag.selected;
    this.search();
  }

  sortTags(): void {
    this.displayFilterTags = tagList.map((tag: PlaceTag, index: number) => ({
      name: tag,
      disabled: !this.filteredList.some(place => place.data.tags?.includes(tag)),
      selected: this.displayFilterTags[index]?.selected || false,
    }));

    const anySelectedTags = this.displayFilterTags.filter(tag => tag.selected);
    if (anySelectedTags.length) {
      this.filteredList = this.filteredList.filter(place =>
        anySelectedTags.some(tag => place.data.tags?.includes(tag.name))
      );
    }
  }

  private getAllData(): void {
    this.placesSub = this.placesService.getCollectionData().subscribe(data => {
      if (data) {
        this.placesList = data;
        this.filteredList = data;
        this.loadedData = true;
        this.sortTags();
      }
    });
  }
}
