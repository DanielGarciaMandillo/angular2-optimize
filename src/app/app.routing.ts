import {Routes, RouterModule} from "@angular/router";
import {HomeRoutes} from "./home/index";
import {NotFound404Component} from "./notfound.component";

export const appRoutes: Routes = [
    {
        path: 'home',
        children: HomeRoutes
    },
    {
        path: 'lazyload',
        loadChildren: './+lazyload/lazyload.module#LazyLoadModule'
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "**",
        component: NotFound404Component
    }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
