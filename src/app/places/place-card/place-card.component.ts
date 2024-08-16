import { Component, Input, OnInit } from '@angular/core';
import { IPlaceWithId } from 'src/app/models/place.model';
import { IonicModule, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TripService } from 'src/app/services/trip.service';
import { PlacesService } from 'src/app/services/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InTripDirective } from 'src/app/directives/in-trip.directive';
import { PlaceViewComponent } from '../place-view/place-view.component';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
  imports: [IonicModule, CommonModule, InTripDirective],
  standalone: true,
})
export class PlaceCardComponent  implements OnInit {

  constructor(
    private tripService: TripService,
    private navCtrl: NavController,
    private placesService: PlacesService, 
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private modalController: ModalController
  ) { }

  @Input() place: IPlaceWithId;
  @Input() parentPage: 'trip' | 'home' | 'explore';
  @Input() isReorder: boolean = false;


  public actionSheetButtons = [
    {
      text: 'View place',
      id: 'view-button-place-card',
      data: {
        action: 'view',
      },
      handler: () => {
        this.openPlace();
      }
    },
    {
      text: 'Remove from trip',
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

  async openPlace() {
    if (this.parentPage === 'trip' ) {
      return;
    } else {
      const modal = await this.modalController.create({
        component: PlaceViewComponent,
        componentProps: {
            place: this.place,
            inModal: true,
        }
      });
      return await modal.present();
    }
    
  }

  toTrip(ev: any){
    ev.stopPropagation();

    this.router.navigateByUrl('/trip');
  }

  deleteAction() {
    this.tripService.removePlace(this.place);
  }

  async presentActionSheet(ev: any) {
    ev.stopPropagation();
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Place Actions',
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
