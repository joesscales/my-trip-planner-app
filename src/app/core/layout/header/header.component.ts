import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/features/places/places.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderService } from './header.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { count } from 'firebase/firestore';
import { Observable } from 'rxjs';


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

  public count$: Observable<number>; 

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
   this.count$ = this.headerService.placeCount$;
  }

}
