import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home')
            .then(c => c.HomeComponent)
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about')
            .then(c => c.AboutComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile')
            .then(c => c.ProfileComponent)
      },
      {
        path: 'advertsList',
        loadComponent: () =>
          import('./features/advertsList/advertsList')
            .then(c => c.AdvertsListComponent)
      }
    ]
  }
];
