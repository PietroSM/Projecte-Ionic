import { Routes } from '@angular/router';
import { profileResolver } from '../shared/resolvers/profile.resolver';

export const profileRoutes: Routes = [
    {
        path: 'me',
        resolve: {
            user: profileResolver
        },
        loadComponent: () =>
            import('./profile-page/profile-page.page')
            .then((m) => m.ProfilePagePage),
    },
    {
        path: ':id',
        resolve: {
            user: profileResolver
        },
        loadComponent: () =>
            import('./profile-page/profile-page.page')
            .then((m) => m.ProfilePagePage)
    }
];