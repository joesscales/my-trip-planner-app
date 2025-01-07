import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { tripReducer } from './app/features/trip/trip-state/trip.reducer';
import { provideStore } from '@ngrx/store';




bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideStore({ trip: tripReducer }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});


