import { Routes } from '@angular/router';

export const postsRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.page')
            .then((m) => m.HomePage),

    },
    {
        path: 'add',
        loadComponent: () =>
            import('./new-event/new-event.page')
            .then((m) => m.NewEventPage),
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./event-detail/event-detail.page')
            .then((m) => m.EventDetailPage),
        loadChildren: () =>
            import('./event-detail/eventDetail.routes')
            .then((m) => m.eventDetailRoutes),
    },
];