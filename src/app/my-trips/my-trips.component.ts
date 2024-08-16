import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../shared/header/header.component';
import { Observable } from 'rxjs';
import { ITripWithId } from '../models/trip.model';
import { MyTripsService } from '../services/my-trips.service';
import { Router } from '@angular/router';

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
