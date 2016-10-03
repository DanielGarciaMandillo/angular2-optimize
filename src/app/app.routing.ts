import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/index';

export const appRoutes: Routes = [
    ...HomeRoutes,
    {
        path: 'lazyload',
        loadChildren: './+lazyload/lazyload.module#LazyLoadModule'
    }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
