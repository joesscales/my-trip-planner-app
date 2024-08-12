import { Component, OnInit } from '@angular/core';
import {IonicModule } from '@ionic/angular'
import { PlacesService } from '../services/places.service';
import { IPlaceWithId } from '../models/place.model';
import { PlacesListComponent } from '../places/places-list/places-list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, PlacesListComponent, CommonModule],
})
export class HomePage implements OnInit {

  public top3Places$: Observable<IPlaceWithId[]>;

  constructor(
    private placesService: PlacesService
  ) { }


  async getData() {
    this.top3Places$ = this.placesService.getTopThreeMostViewed();
  }

  ngOnInit(): void {
    this.getData();
  }
}
