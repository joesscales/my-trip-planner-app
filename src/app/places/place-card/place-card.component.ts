import { Component, Input, OnInit } from '@angular/core';
import { IPlaceWithId } from 'src/app/models/place.model';
import { IonicModule, NavController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TripService } from 'src/app/services/trip.service';
import { PlacesService } from 'src/app/services/places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class PlaceCardComponent  implements OnInit {

  constructor(
    private tripService: TripService,
    private navCtrl: NavController,
    private placesService: PlacesService, 
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController
  ) { }

  @Input() place: IPlaceWithId;
  @Input() onTripPage: boolean = false;
  @Input() isReorder: boolean = false;


  public actionSheetButtons = [
    {
      text: 'Delete',
      id: 'delete-button-place-card',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.deleteAction();
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];


  goToPlace() {
    this.placesService.goToPlace(this.place.id);
  }


  deleteAction() {
    this.tripService.removePlace(this.place);
  }

  async presentActionSheet(ev: any) {
    ev.stopPropagation();
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode: 'ios',
      buttons: this.actionSheetButtons
    });

    await actionSheet.present();
  }

  
  addToTrip(ev: any) {
    ev.stopPropagation();
    this.tripService.addPlace(this.place);
  }

  ngOnInit() {}

}
