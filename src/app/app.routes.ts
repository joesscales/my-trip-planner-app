import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    loadComponent: () => 
        import('./explore/explore.component')
            .then(m => m.ExploreComponent)
},
{
  path: 'trip',
  loadComponent: () => 
      import('./trip/trip.component')
          .then(m => m.TripComponent)
},
{
  path: 'place',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'place/:placeId',
  loadComponent: () => 
    import('./places/place-view/place-view.component')
        .then(m => m.PlaceViewComponent)
}
];
