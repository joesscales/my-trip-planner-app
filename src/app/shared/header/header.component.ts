import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, IonicModule,],
  standalone: true,
})
export class HeaderComponent  implements OnInit {

  constructor(
    private placesService: PlacesService,
    private headerService: HeaderService,
    private modalController: ModalController
  ) { }

  public count$ = this.headerService.placeCount$;

  @Input() canGoBack = false;
  @Input() title: string;
  @Input() inModal = false;


  close() {
    this.modalController.dismiss();
  }


  goBack() {
    this.placesService.goBack();
     
 }

  ngOnInit() {
  
  }

}
