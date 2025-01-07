import { Component } from '@angular/core';
import { TabsComponent } from './core/layout/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { initAnalytics, initApp } from '../environments/firbaseConfig';
import { TripComponent } from './features/trip/trip.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [TabsComponent, IonicModule, TripComponent],
})
export class AppComponent {



// Not necessary below but just to help visualise firebase init
public app = initApp
public analytics = initAnalytics;
  constructor() {}
}  
