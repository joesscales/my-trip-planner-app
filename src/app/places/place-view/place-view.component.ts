import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';
import { IPlaceWithId } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss'],
  imports: [IonicModule, CommonModule, HomePage],
    standalone: true,
})
export class PlaceViewComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
  ) { }

  public place: IPlaceWithId;

  public canGoBack = false;

  goBack() {
     this.placesService.goBack();
      
  }

  getPlace(placeId: string) {
    this.placesService.getPlaceById(placeId).subscribe(placeWithId => {
      if(placeWithId && placeWithId.data) {
        this.place = placeWithId;
      } else {
        // No place found please go to home
      }
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const placeId: string | null = params.get('placeId');

      if (placeId) {
        this.getPlace(placeId);
      }
    });

    this.placesService.navStack$.subscribe(stack => {
      if (stack && stack.length) {
        this.canGoBack = true;
      } else {
        this.canGoBack = false;
      }
    })
  }

}
