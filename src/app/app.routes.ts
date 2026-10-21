import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/home/home.component')
                        .then(c => c.HomeComponent)
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./features/about/about.component')
                        .then(c => c.AboutComponent)
            }
        ]
    }
];
