import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ITripWithId } from '../../shared/models/trip.model';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { MyTripsService } from './my-trips.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent]
})
export class MyTripsComponent  implements OnInit {

  constructor(
    private myTripsService: MyTripsService,
    private router: Router
  ) { }

  public myTrips: ITripWithId[];

  toExplore() {
    this.router.navigateByUrl('/explore');
  }

  ngOnInit() {
     this.myTripsService.getCollectionData().subscribe(data => {
        this.myTrips = data;
      });
      
  }

}
