import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IPlaceWithId } from 'src/app/shared/models/place.model';
import { SafePipePipe } from 'src/app/shared/pipes/safe-pipe.pipe';
import { PlacesService } from 'src/app/features/places/places.service';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss'],
  imports: [IonicModule, CommonModule, SafePipePipe, HeaderComponent],
    standalone: true,
})
export class PlaceViewComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
  ) { }

  @Input() place: IPlaceWithId;
  @Input() inModal: boolean;
  public location: SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl  |string;
  public title: string;
  public canGoBack = false;





  getPlace(placeId: string) {
    this.placesService.getPlaceById(placeId).subscribe(placeWithId => {
      if(placeWithId && placeWithId.data) {
        this.place = placeWithId;
        this.title = this.place.data.name;
      } else {
        // No place found please go to home
        this.title = 'Place not found'

      }
    })
  }

  ngOnInit() {
    if (!this.inModal) {
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
    } else {
      this.title = this.place.data.name;
    }
   

  }
}
