import { Component, OnInit } from '@angular/core';
import {IonicModule } from '@ionic/angular'
import { PlacesService } from '../places/places.service';
import { IPlaceWithId } from '../../shared/models/place.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
// import { PlacesListComponent } from '../places/places-list/places-list.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonicModule,CommonModule, HeaderComponent,  ], // PlacesListComponent,
  standalone: true,
})
export class HomePage implements OnInit {

  public top3Places$: Observable<IPlaceWithId[]>;

  constructor(
    private placesService: PlacesService,
  ) { }


  async getData() {
    this.top3Places$ = this.placesService.getTopThreeMostViewed();
  }

  ngOnInit(): void {
    this.getData();
  }
}
