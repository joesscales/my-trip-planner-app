import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    loadComponent: () => 
        import('./features/explore/explore.component')
            .then(m => m.ExploreComponent)
},
{
  path: 'my-trips',
  loadComponent: () => 
      import('./features/my-trips/my-trips.component')
          .then(m => m.MyTripsComponent)
},
{
  path: 'place',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'place/:placeId',
  loadComponent: () => 
    import('./features/places/place-view/place-view.component')
        .then(m => m.PlaceViewComponent)
}
];
